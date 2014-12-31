/**
 * Image
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var utils = require('../utils');

/**
 * Initialize a new `Image` client.
 */

function Image(api) {
  this.api = api;
}

/**
 * Image details
 */

Image.prototype.get = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: opts };
  }

  var req = {
    name: 'image.get',
    path: '/images/{id}',
    params: { id: opts.id },
    query: lodash.pick(opts, 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Image = Image;
