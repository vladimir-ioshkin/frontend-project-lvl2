const getValueText = (value) => (typeof value === 'string' ? `'${value}'` : value);

const getStr = (item, path) => {
  const {
    key, children, prevValue, nextValue, type,
  } = item;
  const nextPath = path ? `${path}.${key}` : key;

  switch (type) {
    case 'from-primitive-to-nothing':
      return `Property '${nextPath}' was removed`;
    case 'from-nothing-to-primitive':
      return `Property '${nextPath}' was added with value: ${getValueText(nextValue)}`;
    case 'from-primitive-to-primitive':
      return `Property '${nextPath}' was updated. From ${getValueText(prevValue)} to ${getValueText(nextValue)}`;
    case 'from-object-to-nothing':
      return `Property '${nextPath}' was removed`;
    case 'from-nothing-to-object':
      return `Property '${nextPath}' was added with value: [complex value]`;
    case 'from-object-to-object':
      return children.flatMap((child) => getStr(child, nextPath));
    case 'from-object-to-primitive':
      return `Property '${nextPath}' was updated. From [complex value] to ${getValueText(nextValue)}`;
    case 'from-primitive-to-object':
      return `Property '${nextPath}' was updated. From ${getValueText(prevValue)} to [complex value]`;
    default:
      return '';
  }
};

const plain = (diff) => {
  const result = diff.flatMap((item) => getStr(item));

  return result.filter((item) => item).join('\n');
};

export default plain;
