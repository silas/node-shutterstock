'use strict';

/**
 * Module dependencies.
 */

var async = require('async');
var debug = require('debug')('v1');
var uuid = require('node-uuid');

var shutterstock = require('../lib');

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

  self.api = shutterstock.v1({
    username: config.api_username,
    password: config.api_password,
  });
  self.api.on('log', debug);

  self.config = config;

  var jobs = {};

  jobs.auth = function(next) {
    var options = {
      username: config.auth_username,
      password: config.auth_password,
    };

    self.api.customer.auth(options, function(err, data) {
      if (err) return next(err);

      config.auth_token = data.auth_token;

      self.api.defaults.username = config.auth_username;
      self.api.defaults.auth_token = config.auth_token;

      next();
    });
  };

  // remove all lightboxes for user
  jobs.lightboxes = ['auth', function(next) {
    self.api.lightbox.list(function(err, data) {
      if (err) return next(err);

      data = data.filter(function(data) {
        return data.lightbox_name.indexOf('test_') === 0;
      });

      data = data.map(function(lightbox) {
        return function(next) {
          self.api.lightbox.destroy({ lightbox_id: lightbox.lightbox_id }, next);
        };
      });

      async.parallel(data, next);
    });
  }];

  async.auto(jobs, done);
};

exports.beforeEach = function() {
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

  self.api.lightbox.create(params, function(err, data) {
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

  self.api.lightbox.destroy(params, function(err) {
    if (err) return done(err);

    done();
  });
};
