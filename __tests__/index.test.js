import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename)).toString();

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const emptyFile = getFixturePath('empty.json');
const resultFile1File2 = readFile('file1-file2-result.txt');
const resultFile1File1 = readFile('file1-file1-result.txt');
const resultFile1Empty = readFile('file1-empty-result.txt');

test('genDiff', () => {
  expect(genDiff(file1, file2)).toBe(resultFile1File2);
  expect(genDiff(file1, file1)).toBe(resultFile1File1);
  expect(genDiff(file1, emptyFile)).toBe(resultFile1Empty);
});
