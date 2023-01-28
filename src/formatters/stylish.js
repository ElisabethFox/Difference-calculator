import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent(depth)} ${key}: ${stringify(val, (depth + 1))}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

export default (diff) => {
  const iter = (tree, depth = 1) => {
    const result = tree
      .flatMap((node) => {
        switch (node.type) {
          case 'nested': {
            return `${indent(depth)}  ${node.key}: {\n${iter(node.value, depth + 1).join('')}}\n`;
          }
          case 'deleted': {
            return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}\n`;
          }
          case 'added': {
            return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}\n`;
          }
          case 'changed': {
            return `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}\n`;
          }
          case 'unchanged': {
            return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}\n`;
          }
          default:
            throw new Error(`Error: ${node.type} - this type doesn't exist in this file`);
        }
      });
    return result;
  };

  return `{\n${iter(diff).join('\n')}\n}`;
};
