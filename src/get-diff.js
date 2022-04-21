import _ from 'lodash';
import isObject from './is-object.js';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    const hasKeyObj1 = Object.prototype.hasOwnProperty.call(obj1, key);
    const hasKeyObj2 = Object.prototype.hasOwnProperty.call(obj2, key);
    const isObjectValueObj1 = isObject(value1);
    const isObjectValueObj2 = isObject(value2);

    if (hasKeyObj1 && !hasKeyObj2 && !isObjectValueObj1) {
      return {
        key,
        prevValue: value1,
      };
    }

    if (!hasKeyObj1 && hasKeyObj2 && !isObjectValueObj2) {
      return {
        key,
        nextValue: value2,
      };
    }

    if (hasKeyObj1 && hasKeyObj2 && isObjectValueObj1 && isObjectValueObj2) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value1, value2),
      };
    }

    if (hasKeyObj1 && !hasKeyObj2 && isObjectValueObj1) {
      return {
        key,
        prevValue: value1,
        children: getDiff(value1, value1),
      };
    }

    if (hasKeyObj1 && hasKeyObj2 && isObjectValueObj1 && !isObjectValueObj2) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value1, value1),
      };
    }

    if (!hasKeyObj1 && hasKeyObj2 && isObjectValueObj2) {
      return {
        key,
        nextValue: value2,
        children: getDiff(value2, value2),
      };
    }

    if (hasKeyObj1 && hasKeyObj2 && isObjectValueObj2 && !isObjectValueObj1) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value2, value2),
      };
    }

    return {
      key,
      prevValue: value1,
      nextValue: value2,
    };
  });

  return result;
};

export default getDiff;
