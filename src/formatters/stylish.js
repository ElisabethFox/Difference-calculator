import _ from 'lodash';

// const replacer = ' ';
// const spaceCount = 4;
// const signSpace = 2;

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);

// const indent = (depth, node) => {
//   const size = depth * spaceCount;

//   if (!_.isObject(node)) {
//     return replacer.repeat(size - signSpace);
//   }
//   return replacer.repeat(size);
// };

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
            return `${indent(depth)}  ${node.key}: {\n${iter(node.value, depth + 1).join('')}${indent(depth)}}\n`;
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
            return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}\n`;
          }
          default:
            throw new Error(`Error: ${node.type} doesn't ...`);
        }
      });
    return result;
  };

  return `{\n${iter(diff).join('\n')}\n}`;
};
