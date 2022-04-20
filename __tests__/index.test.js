import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename)).toString();

const jsonFile1 = getFixturePath('json-file1.json');
const jsonFile2 = getFixturePath('json-file2.json');
const yamlFile1 = getFixturePath('yaml-file1.yaml');
const yamlFile2 = getFixturePath('yaml-file2.yaml');
const jsonEmptyFile = getFixturePath('json-empty.json');
const yamlEmptyFile = getFixturePath('yaml-empty.yaml');
const resultFile1File2 = readFile('file1-file2-result.txt');
const resultFile1File1 = readFile('file1-file1-result.txt');
const resultFile1Empty = readFile('file1-empty-result.txt');

test('genDiff json', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'stylish')).toBe(resultFile1File2);
  expect(genDiff(jsonFile1, jsonFile1, 'stylish')).toBe(resultFile1File1);
  expect(genDiff(jsonFile1, jsonEmptyFile, 'stylish')).toBe(resultFile1Empty);
});

test('genDiff yaml', () => {
  expect(genDiff(yamlFile1, yamlFile2, 'stylish')).toBe(resultFile1File2);
  expect(genDiff(yamlFile1, yamlFile1, 'stylish')).toBe(resultFile1File1);
  expect(genDiff(yamlFile1, yamlEmptyFile, 'stylish')).toBe(resultFile1Empty);
});

test('genDiff json and yaml', () => {
  expect(genDiff(jsonFile1, yamlFile2, 'stylish')).toBe(resultFile1File2);
  expect(genDiff(yamlFile1, jsonFile1, 'stylish')).toBe(resultFile1File1);
  expect(genDiff(jsonEmptyFile, yamlEmptyFile, 'stylish')).toBe('{\n}');
});
