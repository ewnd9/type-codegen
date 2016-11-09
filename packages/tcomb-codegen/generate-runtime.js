'use strict';

const t = require('tcomb');
const uniqBy = require('lodash.uniqby');

const match = require('../pattern-matching');

module.exports = generate;
module.exports.getType = getType;

function generate(input) {
  const matcher = {
    undefined: () => t.Nil,
    null: () => t.Nil,
    number: () => t.Number,
    boolean: () => t.Boolean,
    string: () => t.String,
    array: xs => generateArray(xs),
    object: x => generateObject(x)
  };

  return match(input, matcher);

  function generateArray(xs) {
    return t.list(generateArraySubType(xs));
  }

  function generateArraySubType(xs) {
    if (xs.length === 0) {
      return t.Any;
    }

    const children = xs.map(x => match(x, matcher));
    const uniq = uniqBy(children, x => getType(x));

    if (uniq.length === 1) {
      return uniq[0];
    } else {
      return t.union(uniq);
    }
  }

  function generateObject(x) {
    const obj = Object.keys(x).reduce(
      (total, curr) => {
        total[curr] = match(x[curr], matcher);
        return total;
      },
      {}
    );

    return t.struct(obj);
  }
}

function getType(val) {
  return t.isType(val) && ((val.meta.kind === 'irreducible' && val.meta.name) || (val.meta.kind));
}
