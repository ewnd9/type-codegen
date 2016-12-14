'use strict';

const j = require('jscodeshift');

module.exports = generateFromAST;

function generateFromAST(ast) {
  return j(ast).toSource({ quote: 'single' });
}
