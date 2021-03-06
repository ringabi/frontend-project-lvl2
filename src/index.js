import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const jsonBefore = fs.readFileSync(filepath1);
  const objBefore = parse(jsonBefore, filepath1);
  const jsonAfter = fs.readFileSync(filepath2);
  const objAfter = parse(jsonAfter, filepath2);
  const keysOfObjBefore = Object.keys(objBefore);
  const keysOfObjAfter = Object.keys(objAfter);

  const cb = (acc, key) => {
    if (_.has(objAfter, key)) {
      if (objBefore[key] === objAfter[key]) {
        acc.push(`    ${key}: ${objBefore[key]}`);
      } else {
        acc.push(`  - ${key}: ${objBefore[key]}`);
        acc.push(`  + ${key}: ${objAfter[key]}`);
      }
    } else { acc.push(`  - ${key}: ${objBefore[key]}`); }
    return acc;
  };

  const cb1 = (acc, key) => {
    if (!_.has(objBefore, key)) {
      acc.push(`  + ${key}: ${objAfter[key]}`);
    } return acc;
  };

  const diff = keysOfObjBefore.reduce(cb, []);
  const diff1 = keysOfObjAfter.reduce(cb1, []);
  return ['{', ...diff, ...diff1, '}\n'].join('\n');
};

export default genDiff;
