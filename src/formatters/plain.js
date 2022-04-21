import _ from 'lodash';
import isObject from '../is-object.js';

const getValueText = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getStr = (item, path) => {
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
    return '';
  }

  if (isObjectPrevValue && isObjectNextValue && children) {
    return children.flatMap((child) => getStr(child, nextPath));
  }

  const getText = () => (!hasPrevValue ? `was added with value: ${getValueText(nextValue)}` : 'was removed');

  if (!hasPrevValue || !hasNextValue) {
    return `Property '${nextPath}' ${getText()}`;
  }

  return `Property '${nextPath}' was updated. From ${getValueText(prevValue)} to ${getValueText(nextValue)}`;
};

const plain = (diff) => {
  const result = diff.flatMap((item) => getStr(item));

  return result.filter((item) => item).join('\n');
};

export default plain;
