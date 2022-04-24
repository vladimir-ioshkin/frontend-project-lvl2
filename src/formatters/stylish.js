const getStr = (item, depth) => {
  const {
    key, children, prevValue, nextValue, type,
  } = item;

  switch (type) {
    case 'from-primitive-to-nothing':
      return `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`;
    case 'from-nothing-to-primitive':
      return `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`;
    case 'from-primitive-to-primitive':
      return [
        `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`,
        `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`,
      ];
    case 'from-object-to-nothing':
      return [
        `${' '.repeat(depth * 4)}  - ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    case 'from-nothing-to-object':
      return [
        `${' '.repeat(depth * 4)}  + ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    case 'from-object-to-object':
      return [
        `${' '.repeat((depth + 1) * 4)}${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    case 'from-object-to-primitive':
      return [
        `${' '.repeat(depth * 4)}  - ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
        `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`,
      ];
    case 'from-primitive-to-object':
      return [
        `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`,
        `${' '.repeat(depth * 4)}  + ${key}: {`,
        ...children.flatMap((child) => getStr(child, depth + 1)),
        `${' '.repeat((depth + 1) * 4)}}`,
      ];
    default:
      return `${' '.repeat((depth + 1) * 4)}${key}: ${prevValue}`;
  }
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStr(item, 0)), '}'].join('\n');

export default stylish;
