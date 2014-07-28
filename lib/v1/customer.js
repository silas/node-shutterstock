/**
 * Customer
 */

'use strict';

/**
 * Module dependencies.
 */

var utils = require('../utils');

/**
 * Initialize a new `Customer` client.
 */

function Customer(api) {
  this.api = api;
}

/**
 * Authenticate customer
 *
 * http://api.shutterstock.com/#authcustomer
 */

Customer.prototype.auth = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  try {
    if (!opts.username && !opts.email) {
      throw new Error('username or email required');
    }
    if (!opts.password) throw new Error('password required');
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  var req = {
    name: 'customer.auth',
    path: '/auth/customer.json',
    type: 'form',
    body: utils.pick(opts, 'email', 'password', 'username'),
  };

  this.api._post(req, utils.body, callback);
};

/**
 * Customer details
 *
 * http://api.shutterstock.com/#customersusername
 */

Customer.prototype.get = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  var req = {
    name: 'customer.get',
    path: '/customers/{username}.json',
    params: {},
    query: {},
  };

  try {
    this.api._options(opts, { username: true, auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.params.username = opts.username;
  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.body, callback);
};

/**
 * Register new user
 *
 * http://api.shutterstock.com/#customersusername
 */

Customer.prototype.register = function(opts, callback) {
  opts = opts || {};

  var req = {
    name: 'customer.register',
    path: '/customers/{username}.json',
    params: { username: opts.username },
    query: utils.pick(opts, 'email', 'password'),
  };

  try {
    if (!opts.username) throw new Error('username required');
    if (!opts.password) throw new Error('password required');
    if (!opts.email) throw new Error('email required');
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  this.api._put(req, utils.body, callback);
};

/**
 * List image download history
 *
 * http://api.shutterstock.com/#customersusernameimagesdownloads
 */

Customer.prototype.images = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  var req = {
    name: 'customer.images',
    path: '/customers/{username}/images/downloads.json',
    params: {},
    query: utils.pick(
      opts,
      'field',
      'image_id',
      'license',
      'page_number',
      'page_size',
      'sort_by',
      'sort_order'
    ),
  };

  try {
    this.api._options(opts, { username: true, auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.params.username = opts.username;
  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.body, callback);
};

/**
 * List subscriptions
 *
 * http://api.shutterstock.com/#customersusernamesubscriptions
 */

Customer.prototype.subscriptions = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  var req = {
    name: 'customer.subscriptions',
    path: '/customers/{username}/subscriptions.json',
    params: {},
    query: utils.pick(
      opts,
      'exclude_empty',
      'exclude_images'
    ),
  };

  try {
    this.api._options(opts, { username: true, auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.params.username = opts.username;
  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Customer = Customer;
