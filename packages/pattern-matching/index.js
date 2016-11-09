'use strict';

module.exports = match;

function match(input, matcher) {
  const t = typeof input;

  if (t === 'undefined') {
    return matcher.undefined(input);
  } else if (input === null) {
    return matcher.null(input);
  } else if (t === 'boolean') {
    return matcher.boolean(input);
  } else if (t === 'string') {
    return matcher.string(input);
  } else if (t === 'number') {
    return matcher.number(input);
  } else if (Array.isArray(input)) {
    return matcher.array(input);
  } else if (t === 'object') {
    return matcher.object(input);
  } else {
    throw new Error(`unknown ${t}`);
  }
}
