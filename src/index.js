import { readFileSync } from 'fs';
import path from 'path';
import parser from './parsers.js';
import style from './stylish.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getFormat = (filepath) => path.extname(filepath).slice(1);

export default (file1, file2) => {
  const path1 = getPath(file1);
  const data1 = readFileSync(path1, 'utf8');
  const format1 = getFormat(path1);
  const obj1 = parser(data1, format1);

  const path2 = getPath(file2);
  const data2 = readFileSync(path2, 'utf8');
  const format2 = getFormat(path2);
  const obj2 = parser(data2, format2);

  return style(obj1, obj2);
};
