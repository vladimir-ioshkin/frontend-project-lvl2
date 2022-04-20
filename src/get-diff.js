import _ from 'lodash';

const isObject = (value) => _.isObject(value) && !_.isArray(value);

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const obj1HasKey = Object.prototype.hasOwnProperty.call(obj1, key);
    const obj2HasKey = Object.prototype.hasOwnProperty.call(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];
    const isEqual = _.isEqual(value1, value2);

    const res = [];

    if (obj1HasKey && !isObject(value1) && isEqual) {
      res.push({
        key,
        value: value1,
        symbol: ' ',
      });
    }

    if (isObject(value1) && isObject(value2)) {
      res.push({
        key,
        symbol: ' ',
        children: getDiff(value1, value2),
      });
    }

    if (obj1HasKey && !isObject(value1) && !isEqual) {
      res.push({
        key,
        value: value1,
        symbol: '-',
      });
    }

    if (isObject(value1) && !isObject(value2)) {
      res.push({
        key,
        symbol: '-',
        children: getDiff(value1, value1),
      });
    }

    if (obj2HasKey && !isObject(value2) && !isEqual) {
      res.push({
        key,
        value: value2,
        symbol: '+',
      });
    }

    if (isObject(value2) && !isObject(value1)) {
      res.push({
        key,
        symbol: '+',
        children: getDiff(value2, value2),
      });
    }

    return res;
  });

  return result;
};

export default getDiff;
