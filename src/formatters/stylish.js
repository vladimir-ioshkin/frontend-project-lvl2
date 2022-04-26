import _ from 'lodash';

const getStr = (item, depth) => {
  const getPropsStr = (name, props, symbol, currentDepth) => {
    if (!_.isPlainObject(props)) {
      return [`${' '.repeat(depth * 4)}  ${symbol} ${name}: ${props}`];
    }

    return [
      `${' '.repeat(depth * 4)}  ${symbol} ${name}: {`,
      ..._.sortBy(Object.entries(props)).flatMap(([key, value]) => getStr({ key, value, type: 'no-changes' }, currentDepth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
    ];
  };

  const {
    key, value, value1, value2, type, children,
  } = item;

  switch (type) {
    case 'deleted':
      return getPropsStr(key, value, '-', depth);
    case 'added':
      return getPropsStr(key, value, '+', depth);
    case 'no-changes':
      return getPropsStr(key, value, ' ', depth);
    case 'has-children':
      return [
        `${' '.repeat((depth + 1) * 4)}${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    default:
      return [
        ...getPropsStr(key, value1, '-', depth),
        ...getPropsStr(key, value2, '+', depth),
      ];
  }
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStr(item, 0)), '}'].join('\n');

export default stylish;
