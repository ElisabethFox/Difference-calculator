import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (diff) => {
  const iter = (tree, key = '') => {
    const result = tree
      .filter((node) => node.type !== 'unchanged')
      .flatMap((node) => {
        const keys = [...key, node.key];
        const path = keys.join('.');
        switch (node.type) {
          case 'nested': {
            return iter(node.value, keys);
          }
          case 'deleted': {
            return `Property '${path}' was removed`;
          }
          case 'added': {
            return `Property '${path}' was added with value: ${stringify(node.value)}`;
          }
          case 'changed': {
            return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
          }
          default:
            throw new Error(`Error: ${node.key} - unknown node type`);
        }
      });
    return result.join('\n');
  };
  return iter(diff);
};
