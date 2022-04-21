import _ from 'lodash';
import isObject from '../is-object.js';

const getValueText = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getStr = (result, item, path) => {
  const {
    key, children, prevValue, nextValue,
  } = item;
  const isEqual = _.isEqual(prevValue, nextValue);
  const hasPrevValue = Object.prototype.hasOwnProperty.call(item, 'prevValue');
  const hasNextValue = Object.prototype.hasOwnProperty.call(item, 'nextValue');
  const isObjectPrevValue = isObject(prevValue);
  const isObjectNextValue = isObject(nextValue);
  const nextPath = path ? `${path}.${key}` : key;

  if (isEqual) {
    return;
  }

  if (isObjectPrevValue && isObjectNextValue && children) {
    children.forEach((child) => getStr(result, child, nextPath));

    return;
  }

  const getText = () => (!hasPrevValue ? `was added with value: ${getValueText(nextValue)}` : 'was removed');

  if (!hasPrevValue || !hasNextValue) {
    result.push(`Property '${nextPath}' ${getText()}`);
  }

  if (hasPrevValue && hasNextValue) {
    result.push(`Property '${nextPath}' was updated. From ${getValueText(prevValue)} to ${getValueText(nextValue)}`);
  }
};

const plain = (diff) => {
  const result = [];
  diff.forEach((item) => getStr(result, item));

  return result.join('\n');
};

export default plain;
