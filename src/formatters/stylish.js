import isObject from '../is-object.js';

const getStr = (item, depth) => {
  const {
    key, children, prevValue, nextValue,
  } = item;
  const hasPrevValue = Object.prototype.hasOwnProperty.call(item, 'prevValue');
  const hasNextValue = Object.prototype.hasOwnProperty.call(item, 'nextValue');
  const isObjectPrevValue = isObject(prevValue);
  const isObjectNextValue = isObject(nextValue);
  const isEqual = prevValue === nextValue;

  if (!isObjectPrevValue && isEqual) {
    return `${' '.repeat((depth + 1) * 4)}${key}: ${prevValue}`;
  }

  if (hasPrevValue && hasNextValue && !isObjectPrevValue && !isEqual) {
    return [
      `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`,
      `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`,
    ];
  }

  if (isObjectPrevValue && isObjectNextValue) {
    return [
      `${' '.repeat((depth + 1) * 4)}${key}: {`,
      ...children.flatMap((child) => getStr(child, depth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
    ];
  }

  if (hasPrevValue && !isObjectPrevValue && isObjectNextValue) {
    return [
      `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`,
      `${' '.repeat(depth * 4)}  + ${key}: {`,
      ...children.flatMap((child) => getStr(child, depth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
    ];
  }

  if (hasNextValue && isObjectPrevValue && !isObjectNextValue) {
    return [
      `${' '.repeat(depth * 4)}  - ${key}: {`,
      ...children.flatMap((child) => getStr(child, depth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
      `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`,
    ];
  }

  if (hasPrevValue && !isObjectPrevValue && !isObjectNextValue) {
    return `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`;
  }

  if (hasNextValue && !isObjectNextValue && !isObjectPrevValue) {
    return `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`;
  }

  if (!hasPrevValue && isObjectNextValue) {
    return [
      `${' '.repeat(depth * 4)}  + ${key}: {`,
      ...children.flatMap((child) => getStr(child, depth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
    ];
  }

  return [
    `${' '.repeat(depth * 4)}  - ${key}: {`,
    ...children.flatMap((child) => getStr(child, depth + 1)),
    `${' '.repeat((depth + 1) * 4)}}`,
  ];
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStr(item, 0)), '}'].join('\n');

export default stylish;
