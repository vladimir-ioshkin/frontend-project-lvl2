import { cwd } from 'process';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import buildTree from './build-tree.js';
import parse from './parsers.js';
import getFormattedDiff from './formatters/index.js';

const getObj = (filepath) => {
  const currentPath = cwd();
  const path = resolve(currentPath, filepath);

  try {
    const fileString = readFileSync(path);
    const splittedPath = path.split('.');
    const format = splittedPath[splittedPath.length - 1];

    return parse(fileString, format) || {};
  } catch (error) {
    throw new Error(`File «${filepath}» not found`);
  }
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = getObj(filepath1);
  const obj2 = getObj(filepath2);
  const diff = buildTree(obj1, obj2);

  return getFormattedDiff(diff, formatName);
};

export default genDiff;
