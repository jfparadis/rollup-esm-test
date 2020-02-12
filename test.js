// test.js

import test from 'tape';
import { rollup } from 'rollup';
// Workaround: vomment the line above and uncomment the lines below
// import cjsRollup from 'rollup';
// const { rollup } = cjsRollup;

test('rollup', t => {
  t.plan(1);
  t.equal(typeof rollup, 'function');
});