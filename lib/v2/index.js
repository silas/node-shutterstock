'use strict';

/**
 * Module dependencies.
 */

var papi = require('papi');
var util = require('util');

var Audio = require('./audio').Audio;
var Contributor = require('./contributor').Contributor;
var Image = require('./image').Image;
var Video = require('./video').Video;
var User = require('./user').User;
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

  if (!opts.headers.authorization && opts.accessToken) {
    opts.headers.authorization = 'Bearer ' + opts.accessToken;
  }

  papi.Client.call(this, opts);

  if (!opts.headers.authorization && !this._opts.baseUrl.auth) {
    if (!opts.clientId) throw new Error('clientId required');
    if (!opts.clientSecret) throw new Error('clientSecret required');
    this._opts.baseUrl.auth = opts.clientId + ':' + opts.clientSecret;
  }

  this.audio = new Audio(this);
  this.contributor = new Contributor(this);
  this.image = new Image(this);
  this.video = new Video(this);
  this.user = new User(this);
}

Shutterstock.Audio = Audio;
Shutterstock.Contributor = Contributor;
Shutterstock.Image = Image;
Shutterstock.Video = Video;
Shutterstock.User = User;

util.inherits(Shutterstock, papi.Client);

/**
 * Common options
 */

Shutterstock.prototype._options = function(req, opts) {
  if (!opts) opts = {};

  if (!req.query) req.query = {};

  if (opts.fields) req.query.fields = opts.fields;

  // papi
  if (opts.hasOwnProperty('ctx')) req.ctx = opts.ctx;
  if (opts.hasOwnProperty('timeout')) req.timeout = opts.timeout;
};

/**
 * Module exports.
 */

exports.Shutterstock = Shutterstock;
