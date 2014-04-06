'use strict';

/**
 * Module dependencies.
 */

var util = require('util');

/**
 * Initialize a new `ShutterstockError`.
 */

function ShutterstockError(err, res) {
  if (!(this instanceof ShutterstockError)) {
    return new ShutterstockError(err, res);
  }

  this.name = 'ShutterstockError';

  if (err instanceof Error) {
    this.message = err.message;
  } else {
    this.message = err || 'unknown error';
  }

  if (typeof res === 'object') {
    this.res = res;
  }

  Error.captureStackTrace(this, ShutterstockError);
}
util.inherits(ShutterstockError, Error);

/*
 * Module Exports.
 */

module.exports = ShutterstockError;
