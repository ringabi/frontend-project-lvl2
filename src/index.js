import fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const jsonBefore = fs.readFileSync(filepath1);
  const objBefore = JSON.parse(jsonBefore);
  const jsonAfter = fs.readFileSync(filepath2);
  const objAfter = JSON.parse(jsonAfter);
  const keysOfObjBefore = Object.keys(objBefore);
  const keysOfObjAfter = Object.keys(objAfter);
  
  const cb = (acc, key) => {
    if (_.has(objAfter, key)) {
      if (objBefore[key] === objAfter[key]) {
        acc.push(`    ${key}: ${objBefore[key]}`);
      } else { acc.push(`  - ${key}: ${objBefore[key]}`);
	acc.push(`  + ${key}: ${objAfter[key]}`);}
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
  const result = [...diff, ...diff1];
  console.log('{');
  console.log(result.join('\n'));
  console.log('}');
};

export default genDiff;
