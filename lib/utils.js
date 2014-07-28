'use strict';

/**
 * Module dependencies.
 */

var http = require('http');

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
 * Error
 */

function error(ctx, next) {
  var err = ctx.err;

  if (err.clean) {
    return next(false, err, undefined, ctx.res);
  }

  if (err.message) err.message = cleanError(err.message);

  if (!err.message || err.message.match(/<html>/i)) {
    if (ctx.res && http.STATUS_CODES[ctx.res.statusCode]) {
      err.message = http.STATUS_CODES[ctx.res.statusCode].toLowerCase();
    } else {
      err.message = 'unknown failure';
    }
  }

  next(false, err, undefined, ctx.res);
}

/**
 * Body
 */

function body(ctx, next) {
  if (ctx.err) return error(ctx, next);

  next(false, undefined, ctx.res.body, ctx.res);
}

/**
 * Empty
 */

function empty(ctx, next) {
  if (ctx.err) return error(ctx, next);

  next(false, undefined, undefined, ctx.res);
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

exports.body = body;
exports.cleanError = cleanError;
exports.empty = empty;
exports.erro = error;
exports.pick = pick;
