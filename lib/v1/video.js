/**
 * Videos
 */

'use strict';

/**
 * Module dependencies.
 */

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
    query: utils.pick(
      opts,
      'searchterm',
      'page_number',
      'results_per_page',
      'sort_method',
      'submitter_id'
    ),
  };

  this.api._get(req, utils.body, callback);
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
    query: utils.pick(opts, 'language'),
  };

  if (!opts.video_id) return callback(this.api._err('video_id required', req));

  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Video = Video;
