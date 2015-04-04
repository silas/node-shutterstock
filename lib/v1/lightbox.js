/**
 * Lightbox
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var fix = require('./fix');
var utils = require('../utils');

/**
 * Initialize a new `Lightbox` client.
 */

function Lightbox(api) {
  this.api = api;
}

/**
 * List lightboxes
 */

Lightbox.prototype.list = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  var req = {
    name: 'lightbox.list',
    path: '/customers/{username}/lightboxes.json',
    params: {},
    query: {},
  };

  if (opts.exclude_empty) req.query.exclude_empty = 1;
  if (opts.exclude_images) req.query.exclude_images = 1;

  try {
    this.api._auth(opts, { username: true, auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.params.username = opts.username;
  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.fixBody(fix.lightboxList), callback);
};

/**
 * Lightbox details
 */

Lightbox.prototype.get = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { lightbox_id: opts };
  }

  var req = {
    name: 'lightbox.get',
    path: '/lightboxes/{lightbox_id}.json',
    params: { lightbox_id: opts.lightbox_id },
    query: {},
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    this.api._auth(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.fixBody(fix.lightbox), callback);
};

/**
 * Lightbox public URL
 */

Lightbox.prototype.publicUrl = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { lightbox_id: opts };
  }

  var req = {
    name: 'lightbox.publicUrl',
    path: '/lightboxes/{lightbox_id}/public_url.json',
    params: { lightbox_id: opts.lightbox_id },
    query: {},
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    this.api._auth(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.body, callback);
};

/**
 * Create lightbox
 */

Lightbox.prototype.create = function(opts, callback) {
  var req = {
    path: '/customers/{username}/lightboxes.json',
    params: { username: opts.username },
    type: 'form',
    query: {},
    body: lodash.pick(opts, 'lightbox_name'),
  };

  try {
    if (!opts.lightbox_name) throw new Error('lightbox_name required');
    this.api._auth(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._post(req, utils.fixBody(fix.lightbox), callback);
};

/**
 * Update lightbox
 */

Lightbox.prototype.update = function(opts, callback) {
  var req = {
    path: '/lightboxes/{lightbox_id}.json',
    params: { lightbox_id: opts.lightbox_id },
    type: 'form',
    query: {},
    body: lodash.pick(opts, 'lightbox_name'),
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    if (!opts.lightbox_name) throw new Error('lightbox_name required');
    this.api._auth(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._post(req, utils.body, callback);
};

/**
 * Delete lightbox
 */

Lightbox.prototype.destroy = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { lightbox_id: opts };
  }

  var req = {
    path: '/lightboxes/{lightbox_id}.json',
    params: { lightbox_id: opts.lightbox_id },
    query: {},
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    this.api._auth(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._delete(req, utils.empty, callback);
};

Lightbox.prototype['delete'] = Lightbox.prototype.destroy;
Lightbox.prototype.del = Lightbox.prototype.destroy;

/**
 * Add image to lightbox
 */

Lightbox.prototype.add = function(opts, callback) {
  opts = opts || {};

  var req = {
    path: '/lightboxes/{lightbox_id}/images/{image_id}.json',
    params: {
      lightbox_id: opts.lightbox_id,
      image_id: opts.image_id,
    },
    query: {},
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    if (!opts.image_id) throw new Error('image_id required');
    this.api._auth(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._put(req, utils.body, callback);
};

/**
 * Remove image from lightbox
 */

Lightbox.prototype.remove = function(opts, callback) {
  var req = {
    path: '/lightboxes/{lightbox_id}/images/{image_id}.json',
    params: {
      lightbox_id: opts.lightbox_id,
      image_id: opts.image_id,
    },
    query: {},
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    if (!opts.image_id) throw new Error('image_id required');
    this.api._auth(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._delete(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Lightbox = Lightbox;
