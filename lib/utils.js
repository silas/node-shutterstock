'use strict';

/**
 * Clean ugly v1 error messages.
 */

function cleanError(message) {
  if (!message) return message;

  // remove die at
  var match = message.match(/(.*) at .* line /);

  if (!match) return message;

  return match[1];
}

/**
 * Create a shallow copy of obj composed of the specified properties.
 */

function pick(obj) {
  var args = Array.prototype.slice.call(arguments);
  args.shift();

  var result = {};

  args.forEach(function(name) {
    if (obj.hasOwnProperty(name)) {
      result[name] = obj[name];
    }
  });

  return result;
}

/**
 * Module Exports.
 */

exports.cleanError = cleanError;
exports.pick = pick;
