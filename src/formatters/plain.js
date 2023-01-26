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

// const buildPath = (node, currentPath) => (currentPath !== '' ? `${currentPath}.${node.key}` : String(node.key));

export default (diff) => {
  const iter = (tree) => {
    const result = tree
      .filter((node) => node.type !== 'unchanged')
      .flatMap((node) => {
        // const currentPath = buildPath(node, path);
        switch (node.type) {
          case 'nested': {
            return iter(node.value);
          }
          case 'deleted': {
            return `Property '${node.key}' was removed`;
          }
          case 'added': {
            return `Property '${node.key}' was added with value: ${stringify(node.value)}`;
          }
          case 'changed': {
            return `Property '${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
          }
          default:
            return '';
        }
      });
    return result.join('\n');
  };
  return iter(diff);
};
