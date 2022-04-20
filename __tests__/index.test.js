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
const stylishFile1File2 = readFile('file1-file2-stylish.txt');
const stylishFile1File1 = readFile('file1-file1-stylish.txt');
const stylishFile1Empty = readFile('file1-empty-stylish.txt');
const plainFile1File2 = readFile('file1-file2-plain.txt');
const plainFile1Empty = readFile('file1-empty-plain.txt');

test('stylish genDiff json', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'stylish')).toBe(stylishFile1File2);
  expect(genDiff(jsonFile1, jsonFile1, 'stylish')).toBe(stylishFile1File1);
  expect(genDiff(jsonFile1, jsonEmptyFile, 'stylish')).toBe(stylishFile1Empty);
});

test('stylish genDiff yaml', () => {
  expect(genDiff(yamlFile1, yamlFile2, 'stylish')).toBe(stylishFile1File2);
  expect(genDiff(yamlFile1, yamlFile1, 'stylish')).toBe(stylishFile1File1);
  expect(genDiff(yamlFile1, yamlEmptyFile, 'stylish')).toBe(stylishFile1Empty);
});

test('stylish genDiff json and yaml', () => {
  expect(genDiff(jsonFile1, yamlFile2, 'stylish')).toBe(stylishFile1File2);
  expect(genDiff(yamlFile1, jsonFile1, 'stylish')).toBe(stylishFile1File1);
  expect(genDiff(jsonEmptyFile, yamlEmptyFile, 'stylish')).toBe('{\n}');
});

test('plain genDiff json', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'plain')).toBe(plainFile1File2);
  expect(genDiff(jsonFile1, jsonFile1, 'plain')).toBe('');
  expect(genDiff(jsonFile1, jsonEmptyFile, 'plain')).toBe(plainFile1Empty);
});

test('plain genDiff yaml', () => {
  expect(genDiff(yamlFile1, yamlFile2, 'plain')).toBe(plainFile1File2);
  expect(genDiff(yamlFile1, yamlFile1, 'plain')).toBe('');
  expect(genDiff(yamlFile1, yamlEmptyFile, 'plain')).toBe(plainFile1Empty);
});

test('plain genDiff json and yaml', () => {
  expect(genDiff(jsonFile1, yamlFile2, 'plain')).toBe(plainFile1File2);
  expect(genDiff(yamlFile1, jsonFile1, 'plain')).toBe('');
  expect(genDiff(jsonEmptyFile, yamlEmptyFile, 'plain')).toBe('');
});
