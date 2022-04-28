import _ from 'lodash';

const step = 4;
const getIndent = (depth) => ' '.repeat(depth * step);

const getStringifyProps = (name, props, symbol, depth) => {
  const nextDepth = depth + 1;
  const indent = getIndent(depth);
  const nextIndent = getIndent(nextDepth);

  if (!_.isPlainObject(props)) {
    return [`${indent}  ${symbol} ${name}: ${props}`];
  }

  const sortedEntries = _.sortBy(Object.entries(props));

  return [
    `${indent}  ${symbol} ${name}: {`,
    ...sortedEntries.flatMap(([key, value]) => getStringifyProps(key, value, ' ', nextDepth)),
    `${nextIndent}}`,
  ];
};

const getStringifyItem = (item, depth = 0) => {
  const {
    key, value, type, children,
  } = item;
  const nextDepth = depth + 1;
  const nextIndent = getIndent(nextDepth);

  switch (type) {
    case 'deleted':
      return getStringifyProps(key, value, '-', depth);
    case 'added':
      return getStringifyProps(key, value, '+', depth);
    case 'no-changes':
      return getStringifyProps(key, value, ' ', depth);
    case 'has-children':
      return [
        `${nextIndent}${key}: {`,
        ...children.flatMap((child) => getStringifyItem(child, nextDepth)),
        `${nextIndent}}`,
      ];
    case 'updated':
      return [
        ...getStringifyProps(key, value, '-', depth),
        ...getStringifyProps(key, item.newValue, '+', depth),
      ];
    default:
      throw new Error(`Unknown type «${type}»`);
  }
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStringifyItem(item)), '}'].join('\n');

export default stylish;
