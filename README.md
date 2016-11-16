# type-codegen

[![Build Status](https://travis-ci.org/ewnd9/type-codegen.svg?branch=master)](https://travis-ci.org/ewnd9/type-codegen)

Codegen for type systems.

Insert a snippet, generate a type definition, copy paste it to your source code.

## Install

```sh
$ npm install type-codegen -g
```

## Usage

```js
'use strict';

const got = require('got');

got('https://api.reddit.com/r/node/new')
  .then(res => {
    const data = JSON.parse(res.body);
    console.log(require('type-codegen/packages/tcomb-codegen').generateCode(data));

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
                    subreddit: t.String,
                    selftext_html: t.String,
                    selftext: t.String,
                    likes: t.Nil,
                    suggested_sort: t.Nil,
                    user_reports: t.list(t.Any),
                    secure_media: t.Nil,
                    saved: t.Boolean,
                    id: t.String,
                    gilded: t.Number,
                    secure_media_embed: t.struct({}),
                    clicked: t.Boolean,
                    report_reasons: t.Nil,
                    author: t.String,
                    media: t.Nil,
                    name: t.String,
                    score: t.Number,
                    approved_by: t.Nil,
                    over_18: t.Boolean,
                    removal_reason: t.Nil,
                    hidden: t.Boolean,
                    thumbnail: t.String,
                    subreddit_id: t.String,
                    edited: t.Boolean,
                    link_flair_css_class: t.Nil,
                    author_flair_css_class: t.Nil,
                    downs: t.Number,
                    mod_reports: t.list(t.Any),
                    archived: t.Boolean,
                    media_embed: t.struct({}),
                    is_self: t.Boolean,
                    hide_score: t.Boolean,
                    spoiler: t.Boolean,
                    permalink: t.String,
                    locked: t.Boolean,
                    stickied: t.Boolean,
                    created: t.Number,
                    url: t.String,
                    author_flair_text: t.Nil,
                    quarantine: t.Boolean,
                    title: t.String,
                    created_utc: t.Number,
                    link_flair_text: t.Nil,
                    distinguished: t.Nil,
                    num_comments: t.Number,
                    visited: t.Boolean,
                    num_reports: t.Nil,
                    ups: t.Number
                })
            })),

            after: t.String,
            before: t.Nil
        })
    })
    */
  })
  .catch(err => {
    console.log(err.stack || err)
  });
```

## Related

- [json-to-flow](https://www.npmjs.com/package/json-to-flow) - Convert JSON type definitions to Flow types.

## License

MIT © [ewnd9](http://ewnd9.com)
