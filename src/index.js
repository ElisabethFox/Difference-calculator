import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

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
    };

    return acc;
  };

  const result = keys.reduce(cb, []).join('\n');
  return `{\n${result}\n}`;
};

const getPath = (filename) => path.resolve(process.cwd(), filename);

export default (file1, file2) => {
  const path1 = getPath(file1);
  const data1 = readFileSync(path1, 'utf8');
  const obj1 = JSON.parse(data1);

  const path2 = getPath(file2);
  const data2 = readFileSync(path2, 'utf8');
  const obj2 = JSON.parse(data2);

  return findDifferences(obj1, obj2);
};
