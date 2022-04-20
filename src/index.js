import { cwd } from 'process';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import getDiff from './get-diff.js';
import parse from './parsers.js';
import stylish from './stylish.js';

const getObj = (filepath) => {
  const currentPath = cwd();
  const path = resolve(currentPath, filepath);

  try {
    const fileString = readFileSync(path);

    return parse(fileString, path) || {};
  } catch (error) {
    throw new Error(`File «${filepath}» not found`);
  }
};

const genDiff = (filepath1, filepath2, formatter) => {
  const obj1 = getObj(filepath1);
  const obj2 = getObj(filepath2);
  const diff = getDiff(obj1, obj2);

  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    default:
      return diff;
  }
};

export default genDiff;
