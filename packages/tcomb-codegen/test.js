import test from 'ava';
import { generateAST, generateRuntime } from './';
import { astToCode as toCode } from './generate-code';

test('undefined', t => {
  const r = generateRuntime(undefined);

  t.truthy(getType(r) === 'Nil');
  t.truthy(toCode(generateAST(r)) === 't.Nil');
});

test('null', t => {
  const r = generateRuntime(null);

  t.truthy(getType(r) === 'Nil');
  t.truthy(toCode(generateAST(r)) === 't.Nil');
});

test('string', t => {
  const r = generateRuntime('string');

  t.truthy(getType(r) === 'String');
  t.truthy(toCode(generateAST(r)) === 't.String');
});

test('number', t => {
  const r0 = generateRuntime(0);
  t.truthy(getType(r0) === 'Number');
  t.truthy(toCode(generateAST(r0)) === 't.Number');

  const r1 = generateRuntime(0.5);
  t.truthy(getType(r1) === 'Number');
  t.truthy(toCode(generateAST(r1)) === 't.Number');
});

test('array', t => {
  const r0 = generateRuntime([]);
  t.truthy(getType(r0) === 'Array<Any>');
  t.truthy(toCode(generateAST(r0)) === 't.list(t.Any)');

  const r1 = generateRuntime([{}]);
  t.truthy(getType(r1) === 'Array<Struct{}>');
  t.truthy(toCode(generateAST(r1)) === 't.list(t.struct({}))');

  const r2 = generateRuntime([{}, 0.5, '']);
  t.truthy(getType(r2) === 'Array<Struct{} | Number | String>');
  t.truthy(toCode(generateAST(r2)) === 't.list(t.union([t.struct({}), t.Number, t.String]))');
});

test('object', t => {
  const r0 = generateRuntime({});

  t.truthy(getType(r0) === 'Struct{}');
  t.truthy(toCode(generateAST(r0)) === 't.struct({})');

  const r1 = generateRuntime({ x: 1 });
  t.truthy(getType(r1) === 'Struct{x: Number}');
  t.truthy(toCode(generateAST(r1)) === 't.struct({\n    x: t.Number\n})');

  const r2 = generateRuntime({ x: 1, y: { z: ['string'] } });
  t.truthy(getType(r2) === 'Struct{x: Number, y: Struct{z: Array<String>}}');
  t.truthy(toCode(generateAST(r2)) === 't.struct({\n    x: t.Number,\n\n    y: t.struct({\n        z: t.list(t.String)\n    })\n})');
});

function getType(type) {
  return type.displayName;
}
