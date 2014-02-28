'use strict';

function stripSlash(value, options) {
  options = options || { pre: true, post: true };

  if (!value || value.length < 2) return value;

  // pre
  if (options.pre && value[0] === '/') {
    value = value.slice(1);
  }

  // post
  if (options.post && value[value.length - 1] === '/') {
    value = value.slice(0, value.length - 2);
  }

  return value;
}

exports.stripSlash = stripSlash;
