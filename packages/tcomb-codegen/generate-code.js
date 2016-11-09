'use strict';

const j = require('jscodeshift');

const generateRuntime = require('./generate-runtime');
const generateAST = require('./generate-ast');

module.exports = generate;
module.exports.astToCode = astToCode;

function generate(ast) {
  return astToCode(generateAST(generateRuntime(ast)));
}

function astToCode(ast) {
  return j(ast).toSource({ quote: 'single' });
}
