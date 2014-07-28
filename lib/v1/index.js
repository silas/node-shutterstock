'use strict';

/**
 * Module dependencies.
 */

var rapi = require('rapi');
var util = require('util');

var Customer = require('./customer').Customer;
var Image_ = require('./image').Image;
var Lightbox = require('./lightbox').Lightbox;
var Video = require('./video').Video;
var meta = require('../../package.json');
var utils = require('../utils');

/**
 * Initialize a new `Shutterstock` v1 client.
 */

function Shutterstock(opts) {
  if (!(this instanceof Shutterstock)) {
    return new Shutterstock(opts);
  }

  opts = opts || {};

  if (!opts.baseUrl) {
    opts.baseUrl = 'https://api.shutterstock.com';
  }
  opts.name = 'shutterstock.v1';
  opts.type = 'json';

  if (!opts.hasOwnProperty('timeout')) {
    opts.timeout = 30 * 1000;
  }

  if (!opts.headers) {
    opts.headers = {};
  }

  opts.headers['user-agent'] = 'node-shutterstock/' + meta.version;

  this.defaults = opts.defaults || {};
  delete opts.defaults;

  rapi.Client.call(this, opts);

  if (!this._opts.baseUrl.auth) {
    if (!opts.username) throw new Error('api username required');
    if (!opts.password) throw new Error('api password required');
    this._opts.baseUrl.auth = opts.username + ':' + opts.password;
  }

  this.customer = new Customer(this);
  this.image = new Image_(this);
  this.lightbox = new Lightbox(this);
  this.video = new Video(this);
}

util.inherits(Shutterstock, rapi.Client);

/**
 * Require auth
 */

Shutterstock.prototype._options = function(opts, setup) {
  setup = setup || {};

  if (setup.username) {
    opts.username = opts.username || this.defaults.username;
    if (!opts.username) throw new Error('username required');
  }

  if (setup.auth_token) {
    opts.auth_token = opts.auth_token || this.defaults.auth_token;
    if (!opts.auth_token) throw new Error('auth_token required');
  }
};

/**
 * Get resources
 */

Shutterstock.prototype.resources = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  var req = {
    name: 'resources',
    path: '/resources.json',
  };

  this._get(req, utils.body, callback);
};

/**
 * Echo options back
 */

Shutterstock.prototype.echo = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  var req = {
    name: 'echo',
    path: '/test/echo.json',
    query: opts,
  };

  this._get(req, utils.body, callback);
};

/*
 * Module exports.
 */

exports.Shutterstock = Shutterstock;
