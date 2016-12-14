import test from 'ava';
import { generateAST } from './';
import { astToCode as toCode } from './generate-code';

const generateRuntime = x => x;

test('string', t => {
  const r = generateRuntime('string');
  t.truthy(toCode(generateAST(r)) === 'PropTypes.string.isRequired');
});

test('number', t => {
  const r0 = generateRuntime(0);
  t.truthy(toCode(generateAST(r0)) === 'PropTypes.number.isRequired');

  const r1 = generateRuntime(0.5);
  t.truthy(toCode(generateAST(r1)) === 'PropTypes.number.isRequired');
});

test('array', t => {
  const r0 = generateRuntime([]);
  t.truthy(toCode(generateAST(r0)) === 'PropTypes.array.isRequired');

  const r1 = generateRuntime([{}]);
  t.truthy(toCode(generateAST(r1)) === 'PropTypes.arrayOf(PropTypes.object).isRequired');

  const r2 = generateRuntime([{}, 0.5, '']);
  t.truthy(toCode(generateAST(r2)) === 'PropTypes.arrayOf(PropTypes.object).isRequired');
});

test('object', t => {
  const r0 = generateRuntime({});
  t.truthy(toCode(generateAST(r0)) === 'PropTypes.object');

  const r1 = generateRuntime({ x: 1 });
  t.truthy(toCode(generateAST(r1)) === 'PropTypes.shape({\n    x: PropTypes.number.isRequired\n}).isRequired');

  const r2 = generateRuntime({ x: 1, y: { z: ['string'] } });
  t.truthy(toCode(generateAST(r2)) === 'PropTypes.shape({\n    x: PropTypes.number.isRequired,\n\n    y: PropTypes.shape({\n        z: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired\n    }).isRequired\n}).isRequired');
});

test('function', t => {
  const r0 = generateRuntime(x => x);
  t.truthy(toCode(generateAST(r0)) === 'PropTypes.func.isRequired');
});
