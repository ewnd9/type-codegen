'use strict';

const t = require('tcomb');
const { builders: j } = require('recast/lib/types');

const prop = (key, value) => j.property('init', j.identifier(key), format(value));
const tt = type => j.memberExpression(j.identifier('t'), j.identifier(type));

const tStruct = children => j.callExpression(tt('struct'), [j.objectExpression(children)]);
const tList = child => j.callExpression(tt('list'), [child]);
const tUnion = children => j.callExpression(tt('union'), [j.arrayExpression(children)]);
const tString = tt('String');
const tNumber = tt('Number');
const tBoolean = tt('Boolean');
const tNil = tt('Nil');
const tAny = tt('Any');
const tFunction = tt('Function');

module.exports = format;
module.exports.formatProps = formatProps;

function format(input) {
  if (isType(input, 'struct')) {
    const { props } = input.meta;
    const nextProps = Object
      .keys(props)
      .reduce(
        (total, key) => {
          total.push(prop(key, props[key]));
          return total;
        },
        []
      );

    return tStruct(nextProps);
  } else if (isType(input, 'list')) {
    return tList(format(input.meta.type));
  } else if (isType(input, 'union')) {
    return tUnion(input.meta.types.map(format));
  } else if (isType(input, 'String')) {
    return tString;
  } else if (isType(input, 'Number')) {
    return tNumber;
  } else if (isType(input, 'Boolean')) {
    return tBoolean;
  } else if (isType(input, 'Nil')) {
    return tNil;
  } else if (isType(input, 'Any')) {
    return tAny;
  } else if (isType(input, 'Function')) {
    return tFunction;
  }

  throw new Error(`unknown input: ${getType(input)}`);
}

function formatProps(obj) {
  const props = Object
    .keys(obj)
    .map(key => prop(key, obj[key]));

  return j.objectExpression(props);
}

function isType(val, type) {
  return getType(val) === type;
}

function getType(val) {
  return t.isType(val) && ((val.meta.kind === 'irreducible' && val.meta.name) || (val.meta.kind));
}
