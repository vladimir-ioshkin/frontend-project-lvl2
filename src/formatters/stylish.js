import _ from 'lodash';

const getStr = (item, depth) => {
  const {
    key, children, value, value1, value2, type,
  } = item;
  const hasChildren = _.isArray(children);

  if (!hasChildren) {
    switch (type) {
      case 'deleted':
        return `${' '.repeat(depth * 4)}  - ${key}: ${value}`;
      case 'added':
        return `${' '.repeat(depth * 4)}  + ${key}: ${value}`;
      case 'updated':
        return [
          `${' '.repeat(depth * 4)}  - ${key}: ${value1}`,
          `${' '.repeat(depth * 4)}  + ${key}: ${value2}`,
        ];
      default:
        return `${' '.repeat((depth + 1) * 4)}${key}: ${value}`;
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
      return _.isPlainObject(value1) ? [
        `${' '.repeat(depth * 4)}  - ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
        `${' '.repeat(depth * 4)}  + ${key}: ${value2}`,
      ] : [
        `${' '.repeat(depth * 4)}  - ${key}: ${value1}`,
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
