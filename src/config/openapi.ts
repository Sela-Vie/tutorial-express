import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const specPath: string = path.join(process.cwd(), 'docs', 'openapi.yaml');
const specFile: string = fs.readFileSync(specPath, 'utf8');

export const openApiSpec = yaml.load(specFile) as Record<string, unknown>;