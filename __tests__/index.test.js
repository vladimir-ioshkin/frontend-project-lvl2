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
const jsonFile1File2 = readFile('file1-file2-json.txt');
const jsonFile1File1 = readFile('file1-file1-json.txt');
const jsonFile1Empty = readFile('file1-empty-json.txt');

test.each([
  ['JSON', 'stylish', jsonFile1, jsonFile2, stylishFile1File2],
  ['JSON', 'stylish', jsonFile1, jsonFile1, stylishFile1File1],
  ['JSON', 'stylish', jsonFile1, jsonEmptyFile, stylishFile1Empty],
  ['YAML', 'stylish', yamlFile1, yamlFile2, stylishFile1File2],
  ['YAML', 'stylish', yamlFile1, yamlFile1, stylishFile1File1],
  ['YAML', 'stylish', yamlFile1, yamlEmptyFile, stylishFile1Empty],
  ['JSON and YAML', 'stylish', jsonFile1, yamlFile2, stylishFile1File2],
  ['JSON and YAML', 'stylish', yamlFile1, jsonFile1, stylishFile1File1],
  ['JSON and YAML', 'stylish', jsonEmptyFile, yamlEmptyFile, '{\n}'],

  ['JSON', 'plain', jsonFile1, jsonFile2, plainFile1File2],
  ['JSON', 'plain', jsonFile1, jsonFile1, ''],
  ['JSON', 'plain', jsonFile1, jsonEmptyFile, plainFile1Empty],
  ['YAML', 'plain', yamlFile1, yamlFile2, plainFile1File2],
  ['YAML', 'plain', yamlFile1, yamlFile1, ''],
  ['YAML', 'plain', yamlFile1, yamlEmptyFile, plainFile1Empty],
  ['JSON and YAML', 'plain', jsonFile1, yamlFile2, plainFile1File2],
  ['JSON and YAML', 'plain', yamlFile1, jsonFile1, ''],
  ['JSON and YAML', 'plain', jsonEmptyFile, yamlEmptyFile, ''],

  ['JSON', 'json', jsonFile1, jsonFile2, jsonFile1File2],
  ['JSON', 'json', jsonFile1, jsonFile1, jsonFile1File1],
  ['JSON', 'json', jsonFile1, jsonEmptyFile, jsonFile1Empty],
  ['YAML', 'json', yamlFile1, yamlFile2, jsonFile1File2],
  ['YAML', 'json', yamlFile1, yamlFile1, jsonFile1File1],
  ['YAML', 'json', yamlFile1, yamlEmptyFile, jsonFile1Empty],
  ['JSON and YAML', 'json', jsonFile1, yamlFile2, jsonFile1File2],
  ['JSON and YAML', 'json', yamlFile1, jsonFile1, jsonFile1File1],
  ['JSON and YAML', 'json', jsonEmptyFile, yamlEmptyFile, '[]'],
])('Testing of %s files "%s" format', (type, format, file1, file2, expected) => {
  expect(genDiff(file1, file2, format)).toBe(expected);
});
