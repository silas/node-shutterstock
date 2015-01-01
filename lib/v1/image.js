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
 * Module exports.
 */

exports.Image = Image;
