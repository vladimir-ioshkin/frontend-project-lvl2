import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const hasKeyObj1 = _.has(obj1, key);
    const hasKeyObj2 = _.has(obj2, key);

    if (hasKeyObj1 && !hasKeyObj2) {
      return ({
        key,
        value: obj1[key],
        type: 'deleted',
      });
    }

    if (!hasKeyObj1 && hasKeyObj2) {
      return ({
        key,
        value: obj2[key],
        type: 'added',
      });
    }

    const value1 = obj1[key];
    const value2 = obj2[key];
    const isObjectValueObj1 = _.isPlainObject(value1);
    const isObjectValueObj2 = _.isPlainObject(value2);

    if (!isObjectValueObj1 && !isObjectValueObj2 && value1 === value2) {
      return {
        key,
        value: value1,
        type: 'no-changes',
      };
    }

    if (!isObjectValueObj1 && !isObjectValueObj2) {
      return {
        key,
        value1,
        value2,
        type: 'updated',
      };
    }

    if (isObjectValueObj1 && !isObjectValueObj2) {
      return {
        key,
        value1,
        value2,
        type: 'updated',
      };
    }

    if (isObjectValueObj2 && !isObjectValueObj1) {
      return {
        key,
        value1,
        value2,
        type: 'updated',
      };
    }

    return {
      key,
      value1,
      value2,
      children: getDiff(value1, value2),
      type: 'has-children',
    };
  });

  return result;
};

export default getDiff;
