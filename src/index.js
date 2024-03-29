import { readFileSync } from 'fs';
import path from 'path';
import parser from './parsers.js';
import buildTree from './builder.js';
import formatDiff from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getFormat = (filepath) => path.extname(filepath).slice(1);

export default (file1, file2, formatName = 'stylish') => {
  const path1 = getPath(file1);
  const data1 = readFileSync(path1, 'utf8');
  const obj1 = parser(data1, getFormat(path1));

  const path2 = getPath(file2);
  const data2 = readFileSync(path2, 'utf8');
  const obj2 = parser(data2, getFormat(path2));

  return formatDiff(buildTree(obj1, obj2), formatName);
};
