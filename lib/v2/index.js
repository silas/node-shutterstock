'use strict';

/**
 * Module dependencies.
 */

var papi = require('papi');
var util = require('util');

var Image = require('./image').Image;
var Video = require('./video').Video;
var meta = require('../../package.json');

/**
 * Initialize a new `Shutterstock` v2 client.
 */

function Shutterstock(opts) {
  if (!(this instanceof Shutterstock)) {
    return new Shutterstock(opts);
  }

  opts = opts || {};

  if (!opts.baseUrl) {
    opts.baseUrl = 'https://api.shutterstock.com/v2';
  }
  opts.name = 'shutterstock.v2';
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

  papi.Client.call(this, opts);

  if (!opts.headers.authorization && !this._opts.baseUrl.auth) {
    if (!opts.clientId) throw new Error('clientId required');
    if (!opts.clientSecret) throw new Error('clientSecret required');
    this._opts.baseUrl.auth = opts.clientId + ':' + opts.clientSecret;
  }

  this.image = new Image(this);
  this.video = new Video(this);
}

Shutterstock.Image = Image;
Shutterstock.Video = Video;

util.inherits(Shutterstock, papi.Client);

/*
 * Module exports.
 */

exports.Shutterstock = Shutterstock;
