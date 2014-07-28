/**
 * Lightbox
 */

'use strict';

/**
 * Module dependencies.
 */

var utils = require('../utils');

/**
 * Initialize a new `Lightbox` client.
 */

function Lightbox(api) {
  this.api = api;
}

/**
 * List lightboxes
 *
 * http://api.shutterstock.com/#customersusernamelightboxes
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
 * Lightbox details
 *
 * http://api.shutterstock.com/#lightboxeslightbox_id
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
    this.api._options(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.body, callback);
};

/**
 * Lightbox public URL
 *
 * http://api.shutterstock.com/#lightboxeslightbox_idpublic_url
 */

Lightbox.prototype.publicUrl = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: opts };
  }

  var req = {
    name: 'lightbox.publicUrl',
    path: '/lightboxes/{lightbox_id}/public_url.json',
    params: { lightbox_id: opts.lightbox_id },
    query: {},
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    this.api._options(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._get(req, utils.body, callback);
};

/**
 * Create lightbox
 *
 * http://api.shutterstock.com/#lightboxeslightbox_id
 */

Lightbox.prototype.create = function(opts, callback) {
  var req = {
    path: '/customers/{username}/lightboxes.json',
    params: { username: opts.username },
    query: utils.pick(opts, 'lightbox_name'),
  };

  try {
    if (!opts.lightbox_name) throw new Error('lightbox_name required');
    this.api._options(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._post(req, utils.body, callback);
};

/**
 * Update lightbox
 *
 * http://api.shutterstock.com/#lightboxeslightbox_id
 */

Lightbox.prototype.update = function(opts, callback) {
  var req = {
    path: '/lightboxes/{lightbox_id}.json',
    params: { lightbox_id: opts.lightbox_id },
    query: utils.pick(opts, 'lightbox_name'),
  };

  try {
    if (!opts.lightbox_id) throw new Error('lightbox_id required');
    if (!opts.lightbox_name) throw new Error('lightbox_name required');
    this.api._options(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._post(req, utils.body, callback);
};

/**
 * Delete lightbox
 *
 * http://api.shutterstock.com/#lightboxeslightbox_id
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
    this.api._options(opts, { auth_token: true });
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
 *
 * http://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id
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
    this.api._options(opts, { auth_token: true });
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.query.auth_token = opts.auth_token;

  this.api._put(req, utils.body, callback);
};

/**
 * Remove image from lightbox
 *
 * http://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id
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
    this.api._options(opts, { auth_token: true });
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
