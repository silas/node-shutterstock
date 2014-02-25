'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var request = require('superagent');

/**
 * Initialize a new `Shutterstock` v1 client.
 */

function Shutterstock(options) {
  if (!(this instanceof Shutterstock)) {
    return new Shutterstock(options);
  }

  options = options || {};
  options.baseUrl = options.baseUrl || 'http://api.shutterstock.com';

  if (!options.user) throw new Error('user option required');
  if (!options.key) throw new Error('key option required');

  this.options = options;
}

/**
 * Wrap HTTP request.
 */

Shutterstock.prototype.wrap = function(req, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  req = req.
    accept('json').
    auth(this.options.user, this.options.key);

  if (options.auth) {
    var auth_token = options.auth_token || this.options.auth_token;

    if (!auth_token) return cb(new Error('auth_token required'));

    req = req.query({ auth_token: auth_token });
  }

  req.end(function(err, res) {
    if (err) return cb(err, res);
    if (res.error) return cb(res.error, res);
    return cb(null, res);
  });
};

/**
 * Create url from arguments.
 */

Shutterstock.prototype.url = function() {
  var args = [].slice.call(arguments);

  // only support json format
  args[args.length - 1] += '.json';

  return this.options.baseUrl + '/' + args.join('/');
};

/**
 * A meta-resource which provides information about all available resources.
 *
 * http://api.shutterstock.com/#resources
 */

Shutterstock.prototype.resources = function(cb) {
  return this.wrap(request.get(this.url('resources')), cb);
};

/**
 * Allows developers to test their code by verifying that inputs are received
 * by the API and outputs are received by the client.
 *
 * http://api.shutterstock.com/#testecho
 */

Shutterstock.prototype.testEcho = function(options, cb) {
  if (typeof options === 'string') {
    options = { example_param: options };  // jshint ignore:line
  }

  return this.wrap(
    request
      .get(this.url('test', 'echo'))
      .query(_.pick(options, 'example_param')),
    cb
  );
};

/**
 * Allows the client to login as a registered downloading customer.
 *
 * http://api.shutterstock.com/#authcustomer
 */

Shutterstock.prototype.authCustomer = function(options, cb) {
  return this.wrap(
    request
      .post(this.url('auth', 'customer'))
      .type('form')
      .send(_.pick(options, 'email', 'password', 'username')),
    cb
  );
};

/**
 * Displays all categories and their category ids.
 *
 * http://api.shutterstock.com/#categories
 */

Shutterstock.prototype.categories = function(cb) {
  return this.wrap(request.get(this.url('categories')), cb);
};

/**
 * Display registered user information.
 *
 * http://api.shutterstock.com/#customersusername
 */

Shutterstock.prototype.customer = function(options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options.auth = true;

  var user = options.user || this.options.user;

  return this.wrap(
    request
      .get(this.url('customers', user)),
    _.pick(options, 'auth', 'auth_token'),
    cb
  );
};

/**
 * Displays customer image downloads and the subscriptions under which they
 * were downloaded.
 *
 * http://api.shutterstock.com/#customersusernameimagesdownloads
 */

Shutterstock.prototype.customerImageDownloads = function(options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options.auth = true;

  var user = options.user || this.options.user;

  return this.wrap(
    request.get(this.url('customers', user, 'images', 'downloads')),
    _.pick(options, 'auth', 'auth_token'),
    cb
  );
};

/**
 * Displays customer lightboxes.
 *
 * http://api.shutterstock.com/#customersusernamelightboxes
 */

Shutterstock.prototype.customerLightboxes = function(options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options.auth = true;

  var user = options.user || this.options.user;

  var url = options.extended ?
    this.url('customers', user, 'lightboxes', 'extended') :
    this.url('customers', user, 'lightboxes');

  return this.wrap(
    request
      .get(url)
      .query(_.pick(options, 'exclude_empty', 'exclude_images', 'hero_image_only')),
    _.pick(options, 'auth', 'auth_token'),
    cb
  );
};

/**
 * Searches for images that meet provided criteria.
 *
 * http://api.shutterstock.com/#imagessearch
 */

Shutterstock.prototype.imageSearch = function(options, cb) {
  if (typeof options === 'string') {
    options = { searchterm: options };
  }

  return this.wrap(
    request
      .get(this.url('images', 'search'))
      .query(_.pick(
        options,
        'all',
        'category_id',
        'color',
        'commercial_only',
        'editorial_only',
        'enhanced_only',
        'exclude_keywords',
        'language',
        'model_released',
        'orientation',
        'page_number',
        'people_age',
        'people_ethnicity',
        'people_gender',
        'people_number',
        'photographer_name',
        'results_per_page',
        'safesearch',
        'search_group',
        'searchterm',
        'sort_method',
        'submitter_id'
      )),
    cb
  );
};

/*
 * Expose client.
 */

module.exports = Shutterstock;
