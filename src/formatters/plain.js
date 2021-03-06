import _ from 'lodash';

const getValueText = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return (typeof value === 'string' ? `'${value}'` : value);
};

const getStr = (item, path) => {
  const {
    key, children, value, type,
  } = item;
  const nextPath = path ? `${path}.${key}` : key;

  switch (type) {
    case 'deleted':
      return `Property '${nextPath}' was removed`;
    case 'added':
      return `Property '${nextPath}' was added with value: ${getValueText(value)}`;
    case 'has-children':
      return children.flatMap((child) => getStr(child, nextPath));
    case 'updated':
      return `Property '${nextPath}' was updated. From ${getValueText(value)} to ${getValueText(item.newValue)}`;
    case 'no-changes':
      return null;
    default:
      throw new Error(`Unknown type «${type}»`);
  }
};

const plain = (diff) => {
  const result = diff.flatMap((item) => getStr(item));

  return result.filter((item) => item).join('\n');
};

export default plain;
