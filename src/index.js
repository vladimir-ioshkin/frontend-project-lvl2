import { cwd } from 'process';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const extension = '.json';

const getObj = (filepath) => {
  const currentPath = cwd();
  const path = resolve(currentPath, filepath);
  const isJSON = path.includes(extension);
  if (!isJSON) {
    throw new Error(`File «${filepath}» has incorrect extension`);
  }

  const fileString = readFileSync(path);
  if (!fileString) {
    throw new Error(`File «${filepath}» not found`);
  }

  return JSON.parse(fileString);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = getObj(filepath1);
  const obj2 = getObj(filepath2);

  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const sortedKeys = _.sortBy(keys);

  let resultStr = '{\n';
  const addStr = (symbol, key, value) => {
    resultStr = `${resultStr}  ${symbol} ${key}: ${value}\n`;
  };

  sortedKeys.forEach((key) => {
    const obj1HasKey = Object.prototype.hasOwnProperty.call(obj1, key);
    const obj2HasKey = Object.prototype.hasOwnProperty.call(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (obj1HasKey && obj2HasKey && value1 === value2) {
      addStr(' ', key, value1);
      return;
    }
    if (obj1HasKey) {
      addStr('-', key, value1);
    }
    if (obj2HasKey) {
      addStr('+', key, value2);
    }
  });
  resultStr = `${resultStr}}`;

  return resultStr;
};

export default genDiff;
