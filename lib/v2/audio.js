/**
 * Audio
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var utils = require('../utils');

/**
 * Initialize a new `Audio` client.
 */

function Audio(api) {
  this.api = api;
}

/**
 * List tracks
 */

Audio.prototype.list = function(opts, callback) {
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
    name: 'audio.list',
    path: '/audio',
    query: lodash.pick(opts, 'id', 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._get(req, utils.body, callback);
};

/**
 * Clip details
 */

Audio.prototype.get = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { id: opts };
  }

  var req = {
    name: 'audio.get',
    path: '/audio/{id}',
    params: { id: opts.id },
    query: lodash.pick(opts, 'view'),
  };

  if (!opts.id) {
    return callback(this.api._err('id required', req));
  }

  this.api._get(req, utils.body, callback);
};

/**
 * Audio search
 */

Audio.prototype.search = function(opts, callback) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = { query: opts };
  } else if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var req = {
    name: 'audio.search',
    path: '/audio/search',
    query: lodash.pick(opts,
      'album_title',
      'artists',
      'bpm',
      'bpm_from',
      'bpm_to',
      'added_date',
      'added_date_start',
      'added_date_end',
      'duration',
      'genre',
      'is_instrumental',
      'instruments',
      'lyrics',
      'moods',
      'page',
      'per_page',
      'safe',
      'similar_artists',
      'sort',
      'title',
      'query',
      'vocal_description',
      'view'
    ),
  };

  this.api._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Audio = Audio;
