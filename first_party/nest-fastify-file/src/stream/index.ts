import { pipeline } from 'stream';
import { promisify } from 'util';

export const pump = promisify(pipeline);
