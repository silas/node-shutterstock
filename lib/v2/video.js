/**
 * Video
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var utils = require('../utils');

/**
 * Initialize a new `Video` client.
 */

function Video(api) {
  this.api = api;
}

/**
 * List videos
 */

Video.prototype.list = function(opts, callback) {
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
    name: 'video.list',
    path: '/videos',
    query: lodash.pick(opts, 'id', 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._get(req, utils.body, callback);
};

/**
 * Video details
 */

Video.prototype.get = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: opts };
  }

  var req = {
    name: 'video.get',
    path: '/videos/{id}',
    params: { id: opts.id },
    query: lodash.pick(opts, 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._get(req, utils.body, callback);
};

/**
 * Video search
 */

Video.prototype.search = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { query: opts };
  } else if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'video.search',
    path: '/videos/search',
    query: lodash.pick(opts,
      'aspect_ratio',
      'category',
      'contributor',
      'added_date',
      'added_date_start',
      'added_date_end',
      'license',
      'model',
      'page',
      'per_page',
      'people_age',
      'people_ethnicity',
      'people_gender',
      'people_number',
      'people_model_released',
      'query',
      'resolution',
      'safe',
      'sort',
      'view'
    ),
  };

  this.api._get(req, utils.body, callback);
};

/**
 * Similar videos
 */

Video.prototype.similar = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: [opts] };
  }

  var req = {
    name: 'video.similar',
    path: '/videos/{id}/similar',
    params: { id: opts.id },
    query: lodash.pick(opts,
      'page',
      'per_page',
      'sort'
    ),
  };

  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Video = Video;
