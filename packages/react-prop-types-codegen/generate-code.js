'use strict';

const j = require('jscodeshift');

const generateAST = require('./generate-ast');

module.exports = generate;
module.exports.astToCode = astToCode;

function generate(ast) {
  return astToCode(generateAST(ast));
}

function astToCode(ast) {
  return j(ast).toSource({ quote: 'single' });
}
