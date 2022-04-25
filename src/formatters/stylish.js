import _ from 'lodash';

const getStr = (item, depth) => {
  const {
    key, children, prevValue, nextValue, type,
  } = item;

  const hasChildren = _.isArray(children);

  if (!hasChildren) {
    switch (type) {
      case 'deleted':
        return `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`;
      case 'added':
        return `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`;
      case 'updated':
        return [
          `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`,
          `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`,
        ];
      default:
        return `${' '.repeat((depth + 1) * 4)}${key}: ${prevValue}`;
    }
  }

  switch (type) {
    case 'deleted':
      return [
        `${' '.repeat(depth * 4)}  - ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    case 'added':
      return [
        `${' '.repeat(depth * 4)}  + ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    case 'updated':
      return _.isPlainObject(prevValue) ? [
        `${' '.repeat(depth * 4)}  - ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
        `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`,
      ] : [
        `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`,
        `${' '.repeat(depth * 4)}  + ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    default:
      return [
        `${' '.repeat((depth + 1) * 4)}${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
  }
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStr(item, 0)), '}'].join('\n');

export default stylish;
