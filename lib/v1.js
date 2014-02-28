'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var debug = require('debug')('shutterstock:v1');
var request = require('superagent');

var utils = require('./utils');

/**
 * Initialize a new `Shutterstock` v1 client.
 */

function Shutterstock(options) {
  if (!(this instanceof Shutterstock)) {
    return new Shutterstock(options);
  }

  options = options || {};
  options.baseUrl = options.baseUrl || 'http://api.shutterstock.com';
  options.baseUrl = utils.stripSlash(options.baseUrl, { post: true });

  if (!options.user) throw new Error('user option required');

  if (!options.access_token) {
    if (!options.key) throw new Error('key option required');
  }

  debug('options', options);

  this.options = options;
}

Shutterstock.prototype._requireAuth = function(options) {
  if (this.options.access_token) {
    if (!options.auth_user) options.auth_user = this.options.auth_user || this.options.user;
  } else {
    if (!options.auth_token) options.auth_token = this.options.auth_token;
    if (!options.auth_token) throw new Error('auth_token required');
  }

  if (!options.auth_user) throw new Error('auth_user required');
}

/**
 * Wrap HTTP request.
 */

Shutterstock.prototype.wrap = function(req, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  req.accept('json');

  if (this.options.access_token) {
    req.set('Authorization', 'Bearer ' + this.options.access_token);
  } else {
    req.auth(this.options.user, this.options.key);
  }

  if (options.auth_token) {
    req.query({ auth_token: options.auth_token });
  }

  req.end(function(err, res) {
    debug('response status', res.statusCode);
    debug('response headers', res.headers);
    debug('response text', res.text);

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
  if (this.options.access_token) {
    return cb(new Error('login not supported with access_token'));
  }

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

  try {
    this._requireAuth(options);
  } catch(err) {
    return cb(err);
  }

  return this.wrap(
    request
      .get(this.url('customers', options.auth_user)),
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

  try {
    this._requireAuth(options);
  } catch(err) {
    return cb(err);
  }

  return this.wrap(
    request.get(this.url('customers', options.auth_user, 'images', 'downloads')),
    _.pick(options, 'auth', 'auth_token', 'user'),
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

  try {
    this._requireAuth(options);
  } catch(err) {
    return cb(err);
  }

  var url = options.extended ?
    this.url('customers', options.auth_user, 'lightboxes', 'extended') :
    this.url('customers', options.auth_user, 'lightboxes');

  return this.wrap(
    request
      .get(url)
      .query(_.pick(options, 'exclude_empty', 'exclude_images', 'hero_image_only')),
    _.pick(options, 'auth', 'auth_token'),
    cb
  );
};

/**
 * Displays details for a specific image.
 *
 * http://api.shutterstock.com/#imagesimage_id
 */

Shutterstock.prototype.image = function(options, cb) {
  if (typeof options === 'string' || typeof options === 'number') {
    options = { image_id: options };
  }

  if (!options.image_id) return cb(new Error('image_id required'));

  return this.wrap(
    request
      .get(this.url('images', options.image_id))
      .query(_.pick(options, 'language')),
    cb
  );
};

/**
 * Searches for images similar to the given image.
 *
 * http://api.shutterstock.com/#imagesimage_idsimilar
 */

Shutterstock.prototype.imageSimilar = function(options, cb) {
  if (typeof options === 'string' || typeof options === 'number') {
    options = { image_id: options };
  }

  if (!options.image_id) return cb(new Error('image_id required'));

  return this.wrap(
    request
      .get(this.url('images', options.image_id, 'similar'))
      .query(_.pick(options, 'page_number', 'sort_method')),
    cb
  );
};

/**
 * Provides keyword recommendations based on the set of image IDs provided.
 *
 * http://api.shutterstock.com/#imagesrecommendationskeywords
 */

Shutterstock.prototype.imageRecommendationKeywords = function(options, cb) {
  if (Array.isArray(options)) {
    options = { image_id: options };
  }

  if (!options.image_id) {
    return cb(new Error('image_id required'));
  }
  if (!Array.isArray(options.image_id)) {
    return cb(new Error('image_id must be an array'));
  }

  options.image_id = options.image_id.join(',');

  return this.wrap(
    request
      .get(this.url('images', 'recommendations', 'keywords'))
      .query(_.pick(options, 'image_id', 'max_results')),
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
