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
 * Get image categories
 */

Image.prototype.categories = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'image.categories',
    path: '/images/categories',
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * List images
 */

Image.prototype.list = function(opts, callback) {
  if (Array.isArray(opts)) {
    opts = { id: opts };
  } else if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: [opts] };
  }

  if (!opts.id && opts.ids) {
    opts.id = opts.ids;
    delete opts.ids;
  }

  var req = {
    name: 'image.list',
    path: '/images',
    query: lodash.pick(opts, 'id', 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

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

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Image recommendations
 */

Image.prototype.recommendations = function(opts, callback) {
  if (Array.isArray(opts)) {
    opts = { id: opts };
  } else if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: [opts] };
  }

  var req = {
    name: 'image.recommendations',
    path: '/images/recommendations',
    query: lodash.pick(opts,
      'id',
      'max_items',
      'safe'
    ),
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Image search
 */

Image.prototype.search = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { query: opts };
  } else if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'image.search',
    path: '/images/search',
    query: lodash.pick(opts,
      'category',
      'color',
      'contributor',
      'added_date',
      'added_date_start',
      'added_date_end',
      'image_type',
      'language',
      'license',
      'model',
      'orientation',
      'page',
      'per_page',
      'people_model_released',
      'people_age',
      'people_ethnicity',
      'people_gender',
      'people_number',
      'query',
      'safe',
      'sort',
      'view'
    ),
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Similar images
 */

Image.prototype.similar = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: [opts] };
  }

  var req = {
    name: 'image.similar',
    path: '/images/{id}/similar',
    params: { id: opts.id },
    query: lodash.pick(opts,
      'page',
      'per_page',
      'sort'
    ),
  };

  this.api._options(req, opts);
  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Image = Image;
