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

function User(api) {
  this.api = api;
}

/**
 * Get image categories
 */

User.prototype.subscriptions = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'user.subscriptions',
    path: '/user/subscriptions',
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.User = User;
