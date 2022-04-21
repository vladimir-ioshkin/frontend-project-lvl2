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

  let res = [];

  if (!isObjectPrevValue && prevValue === nextValue) {
    res = [...res, `${' '.repeat((depth + 1) * 4)}${key}: ${prevValue}`];
  }

  if (isObjectPrevValue && isObjectNextValue) {
    res = [
      ...res,
      `${' '.repeat((depth + 1) * 4)}${key}: {`,
      ...children.flatMap((child) => getStr(child, depth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
    ];
  }

  if (hasPrevValue && !isObjectPrevValue && !isEqual) {
    res = [...res, `${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`];
  }

  if (isObjectPrevValue && !isObjectNextValue) {
    res = [
      ...res,
      `${' '.repeat(depth * 4)}  - ${key}: {`,
      ...children.flatMap((child) => getStr(child, depth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
    ];
  }

  if (hasNextValue && !isObjectNextValue && !isEqual) {
    res = [...res, `${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`];
  }

  if (!isObjectPrevValue && isObjectNextValue) {
    res = [
      ...res,
      `${' '.repeat(depth * 4)}  + ${key}: {`,
      ...children.flatMap((child) => getStr(child, depth + 1)),
      `${' '.repeat((depth + 1) * 4)}}`,
    ];
  }

  return res;
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStr(item, 0)), '}'].join('\n');

export default stylish;
