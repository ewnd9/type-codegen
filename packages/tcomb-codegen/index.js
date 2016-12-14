'use strict';

const generateASTFromTypes = require('./generate-ast');
const generateRuntime = require('./generate-runtime');

exports.generateAST = data => generateASTFromTypes(generateRuntime(data));
exports.generateRuntime = generateRuntime;
