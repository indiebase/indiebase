import type { FastifyRequest } from 'fastify';

import type { StorageFile } from '../../storage';
import { removeStorageFiles } from '../file';
import { filterUpload } from '../filter';
import type { UploadOptions } from '../options';
import { getParts } from '../request';

export const handleMultipartAnyFiles = async (
  req: FastifyRequest,
  options: UploadOptions,
) => {
  const parts = getParts(req, options);
  const body: Record<string, any> = {};

  const files: StorageFile[] = [];

  const removeFiles = async (error?: boolean) => {
    return await removeStorageFiles(options.storage!, files, error);
  };

  try {
    for await (const part of parts) {
      if (part.file) {
        const file = await options.storage!.handleFile(part, req);

        if (await filterUpload(options, req, file)) {
          files.push(file);
        }
      } else {
        body[part.fieldname] = part;
      }
    }
  } catch (error) {
    await removeFiles(true);
    throw error;
  }

  return { body, files, remove: () => removeFiles() };
};
