import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const iter = (tree, previousKey = '') => {
  const result = tree
    .filter(({ type }) => type !== 'unchanged')
    .flatMap(({
      type, key, value, value1, value2,
    }) => {
      const keys = [...previousKey, key];
      const path = keys.join('.');
      switch (type) {
        case 'nested': {
          return iter(value, keys);
        }
        case 'deleted': {
          return `Property '${path}' was removed`;
        }
        case 'added': {
          return `Property '${path}' was added with value: ${stringify(value)}`;
        }
        case 'changed': {
          return `Property '${path}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        }
        default:
          throw new Error(`Error: ${key} - unknown node type`);
      }
    });
  return result;
};

export default (diff) => iter(diff).join('\n');
