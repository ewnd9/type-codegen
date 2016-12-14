'use strict';

const match = require('../pattern-matching');
const { builders: j } = require('recast/lib/types');

const tt = type => j.memberExpression(j.identifier('PropTypes'), j.identifier(type));
const isRequired = type => j.memberExpression(type, j.identifier('isRequired'));

const tFunction = isRequired(tt('func'));
const tArray = isRequired(tt('array'));
const tString = isRequired(tt('string'));
const tNumber = isRequired(tt('number'));
const tBoolean = isRequired(tt('bool'));
const tAny = isRequired(tt('any'));

module.exports = format;

function format(input) {
  const matcher = {
    undefined: () => tAny,
    null: () => tAny,
    number: () => tNumber,
    boolean: () => tBoolean,
    string: () => tString,
    function: () => tFunction,
    array: generateArray,
    object: generateObject
  };

  return match(input, matcher);

  function generateArray(xs) {
    if (xs.length === 0) {
      return tArray;
    }

    return isRequired(j.callExpression(tt('arrayOf'), [match(xs[0], matcher)]));
  }

  // @TODO: figure out how to merge array children
  //
  // function generateArraySubType(xs) {
  //   const children = xs.map(x => match(x, matcher));
  //   const uniq = uniqBy(children, x => x);
  //
  //   if (uniq.length === 1) {
  //     return uniq[0];
  //   } else {
  //     return j.callExpression(tt('oneOf'), uniq);
  //   }
  // }

  function generateObject(x) {
    if (Object.keys(x).length === 0) {
      return tt('object');
    }

    const obj = Object.keys(x).reduce(
      (total, key) => {
        total.push(j.property('init', j.identifier(key), match(x[key], matcher)));
        return total;
      },
      []
    );

    return isRequired(j.callExpression(tt('shape'), [j.objectExpression(obj)]));
  }
}
