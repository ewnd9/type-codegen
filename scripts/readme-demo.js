'use strict';

const got = require('got');

got('https://api.reddit.com/r/node/new')
  .then(res => {
    const data = JSON.parse(res.body);

    console.log(require('type-codegen/packages/tcomb-codegen').generateCode(data));
    console.log(require('type-codegen/packages/react-prop-types-codegen').generateCode(data));
  })
  .catch(err => {
    console.log(err.stack || err)
  });
