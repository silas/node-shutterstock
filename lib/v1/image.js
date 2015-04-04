/**
 * Image
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var fix = require('./fix');
var utils = require('../utils');

/**
 * Initialize a new `Image` client.
 */

function Image(api) {
  this.api = api;
}

/**
 * Image search
 */

Image.prototype.search = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  }

  if (typeof opts === 'string') {
    opts = { searchterm: opts };
  }

  var req = {
    name: 'image.search',
    path: '/images/search.json',
    query: lodash.pick(opts,
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
    ),
  };

  this.api._get(req, utils.fixBody(fix.imageSearch), callback);
};

/**
 * Image details
 */

Image.prototype.get = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { image_id: opts };
  }

  var req = {
    name: 'image.get',
    path: '/images/{image_id}.json',
    params: { image_id: opts.image_id },
    query: lodash.pick(opts, 'language'),
  };

  if (!opts.image_id) {
    return callback(this.api._err('image_id required', req));
  }

  this.api._get(req, utils.fixBody(fix.image), callback);
};

/**
 * Similar images
 */

Image.prototype.similar = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { image_id: opts };
  }

  var req = {
    name: 'image.similar',
    path: '/images/{image_id}/similar.json',
    params: { image_id: opts.image_id },
    query: lodash.pick(opts, 'page_number', 'sort_method'),
  };

  if (!opts.image_id) {
    return callback(this.api._err('image_id required', req));
  }

  this.api._get(req, utils.fixBody(fix.imageSearch), callback);
};

/**
 * Get image categories
 */

Image.prototype.categories = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'image.categories',
    path: '/categories.json',
  };

  this.api._get(req, utils.body, callback);
};

/**
 * Image download
 */

Image.prototype.download = function(opts, callback) {
  opts = opts || {};

  if (opts.metadata && typeof opts.metadata !== 'string') {
    opts.metadata = JSON.stringify(opts.metadata);
  }

  if (!opts.image_id && opts.id) {
    opts.image_id = opts.id;
    delete opts.id;
  }

  var req = {
    name: 'image.download',
    path: '/subscriptions/{subscription_id}/images/{image_id}/sizes/{size}.json',
    params: lodash.pick(opts,
      'subscription_id',
      'image_id',
      'size'
    ),
    type: 'form',
    body: lodash.pick(opts,
      'auth_token',
      'auth_cookie_name',
      'auth_cookie_value',
      'auth_token',
      'download_host',
      'editorial_acknowledgement',
      'format',
      'metadata',
      'show_modal'
    ),
  };

  try {
    this.api._auth(opts, { auth_token: true });
    if (!opts.auth_token) throw new Error('auth_token required');
    if (!opts.subscription_id) throw new Error('subscription_id required');
    if (!opts.image_id) throw new Error('image_id required');
    if (!opts.size) throw new Error('size required');
    if (!opts.format) throw new Error('format required');
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.body.auth_token = opts.auth_token;

  this.api._post(req, utils.fixBody(fix.imageDownload), callback);
};

/**
 * Module exports.
 */

exports.Image = Image;
