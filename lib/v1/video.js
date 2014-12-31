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
    query: lodash.pick(
      opts,
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
 * Module exports.
 */

exports.Video = Video;
