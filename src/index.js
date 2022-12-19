import { readFileSync } from 'node:fs';
import _ from 'lodash';

const findDifferences = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.union(keys1, keys2);
  
    const cb = (acc, key) => {
    const minusKey = `- ${key}`;
    const plusKey = `+ ${key}`;
    const commonKey = `  ${key}`;

    if (!Object.hasOwn(obj2, key)) {
        acc[minusKey] = obj1[key];
      } else if (!Object.hasOwn(obj1, key)) {
        acc[plusKey] = obj2[key];
      } else if (obj1[key] !== obj2[key]) {
        acc[minusKey] = obj1[key];
        acc[plusKey] = obj2[key];
      } else {
        acc[commonKey] = obj1[key];
      };

    return acc;
    };

    return JSON.stringify(keys.reduce(cb, {}), null, '\n');
  };

export default (path1, path2) => {
    const data1 = readFileSync(path1, 'utf8');
    const obj1 = JSON.parse(data1);

    const data2 = readFileSync(path2, 'utf8');
    const obj2 = JSON.parse(data2);

    return findDifferences(obj1, obj2);
};