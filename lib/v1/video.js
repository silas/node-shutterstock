/**
 * Videos
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var fix = require('./fix');
var utils = require('../utils');

/**
 * Initialize a new `Video` client.
 */

function Video(api) {
  this.api = api;
}

/**
 * Video search
 */

Video.prototype.search = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { searchterm: opts };
  } else {
    opts = opts || {};
  }

  var req = {
    name: 'video.search',
    path: '/videos/search.json',
    query: lodash.pick(opts,
      'searchterm',
      'page_number',
      'results_per_page',
      'sort_method',
      'submitter_id'
    ),
  };

  this.api._get(req, utils.fixBody(fix.videoSearch), callback);
};

/**
 * Video details
 */

Video.prototype.get = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { video_id: opts };
  } else {
    opts = opts || {};
  }

  var req = {
    path: '/videos/{video_id}.json',
    params: { video_id: opts.video_id },
    query: lodash.pick(opts, 'language'),
  };

  if (!opts.video_id) return callback(this.api._err('video_id required', req));

  this.api._get(req, utils.fixBody(fix.video), callback);
};

/**
 * Video download
 */

Video.prototype.download = function(opts, callback) {
  opts = opts || {};

  if (opts.metadata && typeof opts.metadata !== 'string') {
    opts.metadata = JSON.stringify(opts.metadata);
  }

  if (!opts.video_id && opts.id) {
    opts.video_id = opts.id;
    delete opts.id;
  }

  var req = {
    name: 'video.download',
    path: '/subscriptions/{subscription_id}/videos/{video_id}/sizes/{size}.json',
    params: lodash.pick(opts,
      'subscription_id',
      'video_id',
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
      'metadata',
      'show_modal'
    ),
  };

  try {
    this.api._auth(opts, { auth_token: true });
    if (!opts.auth_token) throw new Error('auth_token required');
    if (!opts.subscription_id) throw new Error('subscription_id required');
    if (!opts.video_id) throw new Error('video_id required');
    if (!opts.size) throw new Error('size required');
  } catch (err) {
    return callback(this.api._err(err, req));
  }

  req.body.auth_token = opts.auth_token;

  this.api._post(req, utils.fixBody(fix.videoDownload), callback);
};

/**
 * Module exports.
 */

exports.Video = Video;
