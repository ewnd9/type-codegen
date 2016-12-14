'use strict';

const got = require('got');

got('https://api.reddit.com/r/node/new')
  .then(res => {
    const data = JSON.parse(res.body);

    console.log(require('type-codegen')('tcomb', data));
    console.log(require('type-codegen')('react', data));
  })
  .catch(err => {
    console.log(err.stack || err)
  });
