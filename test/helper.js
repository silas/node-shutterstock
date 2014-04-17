'use strict';

/**
 * Module dependencies.
 */

var async = require('async');
var debug = require('debug')('v1');
var uuid = require('uuid');

var v1 = require('../lib/v1');

/**
 * Config
 */

var config = exports.config = {
  timeout: 5,
  api_username: '',
  api_password: '',
  auth_username: '',
  auth_password: '',
};

Object.keys(config).forEach(function(key) {
  var envName = 'SHUTTERSTOCK_' + key.toUpperCase();
  var defaultValue = config[key];
  var value = process.env[envName];

  if (value) {
    if (typeof defaultValue === 'number') {
      value = parseInt(value, 10);
    }
    config[key] = value;
  } else if (!defaultValue) {
    throw new Error(envName + ' required');
  }
});

debug('config', config);

/**
 * Before
 */

exports.before = function(done) {
  var self = this;

  self.api = v1({
    username: config.api_username,
    password: config.api_password,
  });

  self.config = config;

  var jobs = {};

  // authenticate as user (noop for oauth)
  if (self.api.options.access_token) {
    jobs.auth = function(cb) {
      cb();
    };
  } else {
    jobs.auth = function(cb) {
      var options = {
        username: config.auth_username,
        password: config.auth_password,
      };

      self.api.auth(options, function(err, data) {
        if (err) return cb(err);

        config.auth_token = data.auth_token;

        self.api.options.auth_username = config.auth_username;
        self.api.options.auth_token = config.auth_token;

        cb();
      });
    };
  }

  // remove all lightboxes for user
  jobs.removeLightboxes = ['auth', function(cb) {
    self.api.getLightboxes(function(err, data) {
      if (err) return cb(err);

      var deleteJobs = data.map(function(lightbox) {
        return function(cb) {
          self.api.deleteLightbox({ lightbox_id: lightbox.lightbox_id }, cb);
        };
      });

      async.parallel(deleteJobs, cb);
    });
  }];

  async.auto(jobs, done);
};

exports.beforeEach = function() {
  if (this.api.options.access_token) return;

  this.api.options.auth_username = config.auth_username;
  this.api.options.auth_token = config.auth_token;
};

/**
 * Lightbox.
 */

exports.beforeLightbox = function(done) {
  var self = this;

  var lightboxName = 'test_' + uuid.v4().slice(0, 8);

  var params = {
    username: this.config.auth_username,
    lightbox_name: lightboxName,
  };

  self.api.createLightbox(params, function(err, data) {
    if (err) return done(err);

    self.lightboxName = lightboxName;
    self.lightboxId = data.lightbox_id;

    done();
  });
};

exports.afterLightbox = function(done) {
  var self = this;

  var params = {
    lightbox_id: this.lightboxId,
  };

  self.api.deleteLightbox(params, function(err) {
    if (err) return done(err);

    done();
  });
};
