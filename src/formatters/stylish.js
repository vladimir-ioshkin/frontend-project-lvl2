const getStr = ({
  key, value, symbol, children,
}, depth) => {
  if (!children) {
    return `${' '.repeat(depth * 4)}  ${symbol} ${key}: ${value}`;
  }

  return [
    `${' '.repeat(depth * 4)}  ${symbol} ${key}: {`,
    ...children.flat().flatMap((item) => getStr(item, depth + 1)),
    `${' '.repeat((depth + 1) * 4)}}`,
  ];
};

const stylish = (diff) => ['{', ...diff.flat().flatMap((item) => getStr(item, 0)), '}'].join('\n');

export default stylish;
