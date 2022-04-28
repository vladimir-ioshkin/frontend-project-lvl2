import _ from 'lodash';

const buildTree = (obj1, obj2) => {
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

    const value = obj1[key];
    const newValue = obj2[key];
    const isObjectValueObj1 = _.isPlainObject(value);
    const isObjectValueObj2 = _.isPlainObject(newValue);

    if (!isObjectValueObj1 && !isObjectValueObj2 && value === newValue) {
      return {
        key,
        value,
        type: 'no-changes',
      };
    }

    if (isObjectValueObj1 && isObjectValueObj2) {
      return {
        key,
        value,
        newValue,
        children: buildTree(value, newValue),
        type: 'has-children',
      };
    }

    return {
      key,
      value,
      newValue,
      type: 'updated',
    };
  });

  return result;
};

export default buildTree;
