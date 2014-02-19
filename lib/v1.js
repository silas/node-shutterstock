'use strict';

/**
 * Module dependencies.
 */

var request = require('request');
var schema = require('./schema');

/**
 * Initialize a new `Shutterstock` v1 client.
 */

function Shutterstock(options) {
  if (!(this instanceof Shutterstock)) {
    return new Shutterstock(options);
  }

  schema.validateThrow(schema.v1.options, options, 'Invalid v1 options');

  this.baseUrl = options.baseUrl || 'http://api.shutterstock.com';

  this.request = request.defaults({
    auth: {
      user: options.user,
      pass: options.key,
    },
    json: true,
    headers: {
      accepts: 'application/json',
    },
  });
}

/**
 * Client version
 */

Shutterstock.version = Shutterstock.prototype.version = '1';

/**
 * Create url from arguments.
 */

Shutterstock.prototype.url = function() {
  return this.baseUrl + '/' + [].slice.call(arguments).join('/');
};

/**
 * Handle API response.
 */

Shutterstock.prototype.handle = function(cb) {
  return function(err, res, body) {
    if (err) return cb(err, res, body);

    if (parseInt(res.statusCode / 100, 10) !== 2) {
      return cb(new Error('' + body), res, body);
    }

    cb(err, res, body);
  };
};

/**
 * Returns documentation for all available resources.
 */

Shutterstock.prototype.getResources = function(cb) {
  return this.request.get(this.url('resources.json'), this.handle(cb));
};

/**
 * Echoes whatever parameters are sent in, displayed in the representation
 * format of your choice.
 */

Shutterstock.prototype.testEcho = function(options, cb) {
  schema.validateThrow(schema.v1.options, options);

  var qs = {
    example_param: options.example_param,  // jshint ignore:line
  };

  return this.request.get({
    url: this.url('test', 'echo.json'),
    qs: qs,
  }, this.handle(cb));
};

/**
 * Displays all categories and their category ids.
 */

Shutterstock.prototype.getCategories = function(cb) {
  return this.request.get(this.url('categories.json'), this.handle(cb));
};

/*
 * Expose client.
 */

module.exports = Shutterstock;
