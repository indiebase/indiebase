import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Starting with Node.js 20.11, NodeJS adds the import.meta.dirname,
 * import.meta.filename
 */
export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const __cwd = process.cwd();
