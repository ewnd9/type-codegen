import test from 'ava';
import match from './';

import uniq from 'lodash.uniq';

test('undefined', t => {
  const matcher = {
    undefined: () => 'm'
  };

  t.truthy(match(undefined, matcher) === 'm');
});

test('null', t => {
  const matcher = {
    null: () => 'm'
  };

  t.truthy(match(null, matcher) === 'm');
});

test('string', t => {
  const matcher = {
    string: () => 'm'
  };

  t.truthy(match('', matcher) === 'm');
});

test('number', t => {
  const matcher = {
    number: () => 'm'
  };

  t.truthy(match(0, matcher) === 'm');
  t.truthy(match(0.5, matcher) === 'm');
});

test('array', t => {
  const matcher = {
    array: () => 'm'
  };

  t.truthy(match([], matcher) === 'm');
});

test('object', t => {
  const matcher = {
    object: () => 'm'
  };

  t.truthy(match({}, matcher) === 'm');
});

test('hard core array', t => {
  const matcher = {
    array: xs => {
      return `arrayOf(${getArraySubType(xs)})`;
    },
    object: () => 'object',
    number: () => 'number',
    string: () => 'string'
  };

  t.truthy(match([], matcher) === 'arrayOf(any)');
  t.truthy(match([{}], matcher) === 'arrayOf(object)');
  t.truthy(match([{}, 0.5, ''], matcher) === 'arrayOf(union([object, number, string]))');

  function getArraySubType(xs) {
    if (xs.length === 0) {
      return 'any';
    }

    const children = uniq(xs.map(x => match(x, matcher)));

    if (children.length === 1) {
      return children[0];
    } else {
      return `union([${children.join(', ')}])`;
    }
  }
});
