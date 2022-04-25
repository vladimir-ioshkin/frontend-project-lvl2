import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const hasKeyObj1 = _.has(obj1, key);
    const hasKeyObj2 = _.has(obj2, key);

    if (hasKeyObj1 && !hasKeyObj2) {
      return _.isPlainObject(obj1[key]) ? ({
        key,
        prevValue: obj1[key],
        children: getDiff(obj1[key], obj1[key]),
        type: 'deleted',
      }) : ({
        key,
        prevValue: obj1[key],
        type: 'deleted',
      });
    }

    if (!hasKeyObj1 && hasKeyObj2) {
      return _.isPlainObject(obj2[key]) ? ({
        key,
        nextValue: obj2[key],
        children: getDiff(obj2[key], obj2[key]),
        type: 'added',
      }) : ({
        key,
        nextValue: obj2[key],
        type: 'added',
      });
    }

    const value1 = hasKeyObj1 && obj1[key];
    const value2 = hasKeyObj2 && obj2[key];
    const isObjectValueObj1 = _.isPlainObject(value1);
    const isObjectValueObj2 = _.isPlainObject(value2);

    if (!isObjectValueObj1 && !isObjectValueObj2 && value1 === value2) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        type: 'no-changes',
      };
    }

    if (!isObjectValueObj1 && !isObjectValueObj2) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        type: 'updated',
      };
    }

    if (isObjectValueObj1 && !isObjectValueObj2) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value1, value1),
        type: 'updated',
      };
    }

    if (isObjectValueObj2 && !isObjectValueObj1) {
      return {
        key,
        prevValue: value1,
        nextValue: value2,
        children: getDiff(value2, value2),
        type: 'updated',
      };
    }

    return {
      key,
      prevValue: value1,
      nextValue: value2,
      children: getDiff(value1, value2),
      type: 'has-children',
    };
  });

  return result;
};

export default getDiff;
