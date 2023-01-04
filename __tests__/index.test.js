import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileName1 = getFixturePath('file1.json');
const fileName2 = getFixturePath('file2.json');
const expectedResultName = getFixturePath('expectedResultJSON.txt');
const result = readFileSync(expectedResultName, 'utf8');

test("genDiff jests", () => {
    expect(genDiff(fileName1, fileName2)).toBe(result);
});