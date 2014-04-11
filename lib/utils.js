'use strict';

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

exports.pick = pick;
