'use strict';

/**
 * Module dependencies.
 */

var async = require('async');
var debug = require('debug')('api');
var nock = require('nock');
var uuid = require('node-uuid');

var shutterstock = require('../lib');

/**
 * Config
 */

exports.nock = { off: process.env.NOCK_OFF === 'true' };
exports.nock.on = !exports.nock.off;
exports.nock.rec = !!process.env.NOCK_REC;

exports.nock.describe = exports.nock.on ? describe : describe.skip;
exports.nock.it = exports.nock.on ? it : it.skip;

var config = exports.config = {
  api_username: 'api-username',
  api_password: 'api-password',
  auth_username: 'john',
  auth_password: 'secret',
  client_id: 'a134a44b2220a831d511',
  client_secret: '0498a3442cf2ad2d11efbda32a32fa26a20d229c',
};

if (exports.nock.off) {
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
}

/**
 * Nock
 */

function Nock() {
  var self = this;

  [
    'get',
    'head',
    'post',
    'delete',
    'put',
    'patch',
    'intercept',
    'filteringRequestBody',
    'reply',
  ].forEach(function(name) {
    self[name] = function() {
      return new Nock();
    };
  });
}

/**
 * Before
 */

exports.beforeV1 = function(done) {
  var self = this;

  Object.defineProperty(self, 'nock', {
    configurable: true,
    enumerable: true,
    get: function() {
      return exports.nock.off ? new Nock() : nock('https://api.shutterstock.com');
    },
  });

  self.api = shutterstock.v1({
    username: config.api_username,
    password: config.api_password,
  });
  self.api.on('log', debug);

  if (exports.nock.on) {
    nock.disableNetConnect();

    self.api.defaults.username = config.auth_username;
    self.api.defaults.auth_token = config.auth_token = '123';

    return done();
  }

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

exports.beforeV2 = function(done) {
  var self = this;

  Object.defineProperty(self, 'nock', {
    configurable: true,
    enumerable: true,
    get: function() {
      return exports.nock.off ? new Nock() : nock('https://api.shutterstock.com');
    },
  });

  self.api = shutterstock.v2({
    clientId: config.client_id,
    clientSecret: config.client_secret,
  });
  self.api.on('log', debug);

  if (exports.nock.on) {
    nock.disableNetConnect();

    return done();
  }

  self.config = config;

  done();
};

exports.beforeEach = function() {
  if (exports.nock.rec) nock.recorder.rec();
};

exports.afterEach = function() {
  if (exports.nock.rec) nock.restore();
};

/**
 * Lightbox.
 */

exports.beforeLightbox = function(done) {
  var self = this;

  if (exports.nock.on) {
    self.lightboxName = 'Animals';
    self.lightboxId = 123;

    return done();
  }

  var lightboxName = 'test_' + uuid.v4().slice(0, 8);

  var params = {
    username: self.config.auth_username,
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

  if (exports.nock.on) return done();

  var params = {
    lightbox_id: this.lightboxId,
  };

  self.api.lightbox.destroy(params, function(err) {
    if (err) return done(err);

    done();
  });
};
