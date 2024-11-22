import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const generateDirname = (metaUrl) => dirname(fileURLToPath(metaUrl));
