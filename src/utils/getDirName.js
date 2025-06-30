import { dirname } from 'node:path';

import { fileURLToPath } from 'node:url';

export function getDirName (metaUrl) {
  return dirname(fileURLToPath(metaUrl));
}
