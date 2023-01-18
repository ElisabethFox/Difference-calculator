import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFileName1 = getFixturePath('file1.json');
const jsonFileName2 = getFixturePath('file2.json');

const ymlFileName1 = getFixturePath('file1.yml');
const ymlFileName2 = getFixturePath('file2.yml');

const expectedResultName = getFixturePath('expectedResult.txt');
const result = readFileSync(expectedResultName, 'utf8');

test('json tests', () => {
  expect(genDiff(jsonFileName1, jsonFileName2)).toBe(result);
});

test('yml tests', () => {
  expect(genDiff(ymlFileName1, ymlFileName2)).toBe(result);
});

// test('different extensions', () => {
//   expect(genDiff(jsonFileName1, yamlFileName2)).toBe();
//   expect(genDiff(jsonFileName1, ymlFileName2)).toBe();
//   expect(genDiff(yamlFileName1, jsonFileName2)).toBe();
//   expect(genDiff(yamlFileName1, ymlFileName2)).toBe(result);
//   expect(genDiff(ymlFileName1, jsonFileName2)).toBe();
//   expect(genDiff(ymlFileName1, yamlFileName2)).toBe(result);
// });
