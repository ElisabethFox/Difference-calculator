import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parser from './parsers.js';

const findDifferences = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();

  const cb = (acc, key) => {
    const minusKey = `- ${key}`;
    const plusKey = `+ ${key}`;
    const commonKey = `  ${key}`;

    if (!Object.hasOwn(obj2, key)) {
      acc.push(`  ${minusKey}: ${obj1[key]}`);
    } else if (!Object.hasOwn(obj1, key)) {
      acc.push(`  ${plusKey}: ${obj2[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`  ${minusKey}: ${obj1[key]}`);
      acc.push(`  ${plusKey}: ${obj2[key]}`);
    } else {
      acc.push(`  ${commonKey}: ${obj1[key]}`);
    }

    return acc;
  };

  const result = keys.reduce(cb, []).join('\n');
  return `{\n${result}\n}`;
};

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

  return findDifferences(obj1, obj2);
};
