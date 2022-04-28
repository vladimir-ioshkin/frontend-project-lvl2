import _ from 'lodash';

const getIndent = (depth) => {
  const step = 4;
  return ' '.repeat(depth * step);
};

const getPropsStr = (name, props, symbol, depth) => {
  const nextDepth = depth + 1;
  const indent = getIndent(depth);
  const nextIndent = getIndent(nextDepth);

  if (!_.isPlainObject(props)) {
    return [`${indent}  ${symbol} ${name}: ${props}`];
  }

  const sortedEntries = _.sortBy(Object.entries(props));

  return [
    `${indent}  ${symbol} ${name}: {`,
    ...sortedEntries.flatMap(([key, value]) => getPropsStr(key, value, ' ', nextDepth)),
    `${nextIndent}}`,
  ];
};

const getStr = (item, depth = 0) => {
  const {
    key, value, type, children,
  } = item;
  const nextDepth = depth + 1;
  const nextIndent = getIndent(nextDepth);

  switch (type) {
    case 'deleted':
      return getPropsStr(key, value, '-', depth);
    case 'added':
      return getPropsStr(key, value, '+', depth);
    case 'no-changes':
      return getPropsStr(key, value, ' ', depth);
    case 'has-children':
      return [
        `${nextIndent}${key}: {`,
        ...children.flatMap((child) => getStr(child, nextDepth)),
        `${nextIndent}}`,
      ];
    case 'updated':
      return [
        ...getPropsStr(key, value, '-', depth),
        ...getPropsStr(key, item.newValue, '+', depth),
      ];
    default:
      throw new Error(`Unknown type «${type}»`);
  }
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStr(item)), '}'].join('\n');

export default stylish;
