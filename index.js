'use strict';

const generate = require('./packages/utils/generate-code');

const types = {
  tcomb: require('./packages/tcomb-codegen'),
  react: require('./packages/react-prop-types-codegen')
};

module.exports = codegen;

function codegen(type, data) {
  const t = types[type];

  if (t) {
    return generate(t.generateAST(data));
  } else {
    throw new Error(`Unknown type: "${type}"`);
  }
};
