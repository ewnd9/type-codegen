# type-codegen

[![Build Status](https://travis-ci.org/ewnd9/type-codegen.svg?branch=master)](https://travis-ci.org/ewnd9/type-codegen)

[WIP] Codegen for type systems.

Insert a snippet, generate a type definition, copy paste it to your source code.

## Install

The `type-codegen` package was manually unpublished from npm on 2025-08-28. The name has been released for potential future use.

## Example

```js
'use strict';

const got = require('got');

got('https://api.reddit.com/r/node/new')
  .then(res => {
    const data = JSON.parse(res.body);

    console.log(require('type-codegen')('tcomb', data));
    /*
    t.struct({
        kind: t.String,
        data: t.struct({
            modhash: t.String,
            children: t.list(t.struct({
                kind: t.String,
                data: t.struct({
                    contest_mode: t.Boolean,
                    banned_by: t.Nil,
                    domain: t.String,
                    ...
                })
            })),
            after: t.String,
            before: t.Nil
        })
    })
    */

    console.log(require('type-codegen')('react', data));

    /*
    PropTypes.shape({
        kind: PropTypes.string.isRequired,

        data: PropTypes.shape({
            modhash: PropTypes.string.isRequired,

            children: PropTypes.arrayOf(PropTypes.shape({
                kind: PropTypes.string.isRequired,

                data: PropTypes.shape({
                    contest_mode: PropTypes.bool.isRequired,
                    banned_by: PropTypes.any.isRequired,
                    domain: PropTypes.string.isRequired,
                    ...
                }).isRequired
            }).isRequired).isRequired,

            after: PropTypes.string.isRequired,
            before: PropTypes.any.isRequired
        }).isRequired
    }).isRequired
    */
  })
  .catch(err => {
    console.log(err.stack || err)
  });
```

## Related

- [json-to-flow](https://www.npmjs.com/package/json-to-flow) - Convert JSON type definitions to Flow types.
- [json-to-json-schema](https://github.com/mohsen1/json-to-json-schema) - Convert a JSON to a JSON Schema describing that JSON
- [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript) - Compile json schema to typescript typings
- [generate-schema](https://github.com/nijikokun/generate-schema) - Convert your JSON Object to JSON Schema
- [joi-to-json-schema](https://github.com/lightsofapollo/joi-to-json-schema) - The goal is to provide best effort conversion from Joi objects to JSON Schema
- [enjoi](https://github.com/tlivings/enjoi) - Converts a JSON schema to a Joi schema.
- [lofi-schema-elm](https://github.com/RoyalIcing/lofi-schema-elm) - Friendly syntax for creating schemas, output to Swift, React PropTypes, Elm, Golang, MongoDB, and more

## License

MIT © [ewnd9](http://ewnd9.com)
