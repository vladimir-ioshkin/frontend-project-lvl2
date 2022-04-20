const getValueText = (value, children) => {
  if (children && typeof value === 'undefined') {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getText = (symbol, value, children) => (symbol === '+' ? `was added with value: ${getValueText(value, children)}` : 'was removed');

const getStr = (result, {
  value, key, children, symbol,
}, path) => {
  const nextPath = path ? `${path}.${key}` : key;

  if (symbol !== ' ') {
    result.push(`Property '${nextPath}' ${getText(symbol, value, children)}`);
  }

  if (children) {
    children.forEach((items) => {
      if (items.length === 1) {
        getStr(result, items[0], nextPath);
        return;
      }

      result.push(`Property '${nextPath}.${items[0].key}' was updated. From ${getValueText(items[0].value, items[0].children)} to ${getValueText(items[1].value, items[1].children)}`);
    });
  }
};

const plain = (diff) => {
  const result = [];
  diff.flat().forEach((item) => getStr(result, item));

  return result.join('\n');
};

export default plain;
