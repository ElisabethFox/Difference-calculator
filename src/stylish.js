import _ from 'lodash';

export default (obj1, obj2) => {
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