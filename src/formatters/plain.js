import _ from 'lodash';

const getValueText = (value) => (typeof value === 'string' ? `'${value}'` : value);

const getStr = (item, path) => {
  const {
    key, children, prevValue, nextValue, type,
  } = item;

  const hasChildren = _.isArray(children);
  const nextPath = path ? `${path}.${key}` : key;

  if (!hasChildren) {
    switch (type) {
      case 'deleted':
        return `Property '${nextPath}' was removed`;
      case 'added':
        return `Property '${nextPath}' was added with value: ${getValueText(nextValue)}`;
      case 'updated':
        return `Property '${nextPath}' was updated. From ${getValueText(prevValue)} to ${getValueText(nextValue)}`;
      default:
        return '';
    }
  }

  switch (type) {
    case 'deleted':
      return `Property '${nextPath}' was removed`;
    case 'added':
      return `Property '${nextPath}' was added with value: [complex value]`;
    case 'has-children':
      return children.flatMap((child) => getStr(child, nextPath));
    case 'updated':
      return _.isPlainObject(prevValue)
        ? `Property '${nextPath}' was updated. From [complex value] to ${getValueText(nextValue)}`
        : `Property '${nextPath}' was updated. From ${getValueText(prevValue)} to [complex value]`;
    default:
      return '';
  }
};

const plain = (diff) => {
  const result = diff.flatMap((item) => getStr(item));

  return result.filter((item) => item).join('\n');
};

export default plain;
