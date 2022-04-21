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

  const res = [];

  if (!isObjectPrevValue && prevValue === nextValue) {
    res.push(`${' '.repeat((depth + 1) * 4)}${key}: ${prevValue}`);
  }

  if (isObjectPrevValue && isObjectNextValue) {
    res.push(`${' '.repeat((depth + 1) * 4)}${key}: {`);
    res.push(...children.flatMap((child) => getStr(child, depth + 1)));
    res.push(`${' '.repeat((depth + 1) * 4)}}`);
  }

  if (hasPrevValue && !isObjectPrevValue && !isEqual) {
    res.push(`${' '.repeat(depth * 4)}  - ${key}: ${prevValue}`);
  }

  if (isObjectPrevValue && !isObjectNextValue) {
    res.push(`${' '.repeat(depth * 4)}  - ${key}: {`);
    res.push(...children.flatMap((child) => getStr(child, depth + 1)));
    res.push(`${' '.repeat((depth + 1) * 4)}}`);
  }

  if (hasNextValue && !isObjectNextValue && !isEqual) {
    res.push(`${' '.repeat(depth * 4)}  + ${key}: ${nextValue}`);
  }

  if (!isObjectPrevValue && isObjectNextValue) {
    res.push(`${' '.repeat(depth * 4)}  + ${key}: {`);
    res.push(...children.flatMap((child) => getStr(child, depth + 1)));
    res.push(`${' '.repeat((depth + 1) * 4)}}`);
  }

  return res;
};

const stylish = (diff) => ['{', ...diff.flatMap((item) => getStr(item, 0)), '}'].join('\n');

export default stylish;
