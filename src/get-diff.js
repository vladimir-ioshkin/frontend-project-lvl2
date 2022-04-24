import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const hasKeyObj1 = Object.prototype.hasOwnProperty.call(obj1, key);
    const hasKeyObj2 = Object.prototype.hasOwnProperty.call(obj2, key);
    const value1 = hasKeyObj1 && obj1[key];
    const value2 = hasKeyObj2 && obj2[key];
    const isObjectValueObj1 = _.isPlainObject(value1);
    const isObjectValueObj2 = _.isPlainObject(value2);
    const isEqual = _.isEqual(value1, value2);

    if (hasKeyObj1 && !isObjectValueObj1 && !hasKeyObj2) {
      return {
        key,
        prevValue: value1,
        type: 'from-primitive-to-nothing',
      };
    }

    if (hasKeyObj2 && !isObjectValueObj2 && !hasKeyObj1) {
      return {
        key,
        nextValue: value2,
        type: 'from-nothing-to-primitive',
      };
    }

    if (hasKeyObj1 && hasKeyObj2 && !isObjectValueObj1 && !isObjectValueObj2 && !isEqual) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        type: 'from-primitive-to-primitive',
      };
    }

    if (isObjectValueObj1 && !hasKeyObj2) {
      return {
        key,
        prevValue: value1,
        children: getDiff(value1, value1),
        type: 'from-object-to-nothing',
      };
    }

    if (isObjectValueObj2 && !hasKeyObj1) {
      return {
        key,
        nextValue: value2,
        children: getDiff(value2, value2),
        type: 'from-nothing-to-object',
      };
    }

    if (isObjectValueObj1 && isObjectValueObj2) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value1, value2),
        type: 'from-object-to-object',
      };
    }

    if (isObjectValueObj1 && hasKeyObj2 && !isObjectValueObj2) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value1, value1),
        type: 'from-object-to-primitive',
      };
    }

    if (isObjectValueObj2 && hasKeyObj1 && !isObjectValueObj1) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value2, value2),
        type: 'from-primitive-to-object',
      };
    }

    return {
      key,
      prevValue: value1,
      nextValue: value2,
      type: 'primitive-is-equal',
    };
  });

  return result;
};

export default getDiff;
