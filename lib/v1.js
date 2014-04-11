'use strict';

/**
 * Module dependencies.
 */

var http = require('http');
var url = require('url');

var request = require('./request');
var utils = require('./utils');

/**
 * Initialize a new `Shutterstock` v1 client.
 */

function Shutterstock(options) {
  if (!(this instanceof Shutterstock)) {
    return new Shutterstock(options);
  }

  options = options || {};
  options.url = url.parse(options.url || 'http://api.shutterstock.com');

  if (!options.user) throw new Error('user option required');

  if (!options.access_token) {
    if (!options.key) throw new Error('key option required');
  }

  this.options = options;
}

/**
 * Check request options for required auth parameters.
 */

Shutterstock.prototype._requireAuth = function(options) {
  if (this.options.access_token) {
    if (!options.auth_user) options.auth_user = this.options.auth_user || this.options.user;
  } else {
    if (!options.auth_token) options.auth_token = this.options.auth_token;
    if (!options.auth_token) throw new Error('auth_token required');
  }

  if (!options.auth_user) throw new Error('auth_user required');
};

/**
 * Execute API requests.
 */

Shutterstock.prototype._request = function(options, callback) {

  // we always send headeres
  if (!options.headers) options.headers = {};

  // api auth
  if (this.options.access_token) {
    options.headers.authorization = 'Bearer ' + this.options.access_token;
  } else {
    options.auth = this.options.user + ':' + this.options.key;
  }

  // url
  options.scheme = this.options.scheme;
  options.hostname = this.options.url.hostname;
  if (this.options.url.port) options.port = this.options.url.port;

  // response format
  options.path += '.json';

  request(options, function(err, res) {
    if (err) return callback(err);

    var isHtml, isJson, isText, type;

    if (res.body) {
      type = res.headers['content-type'];

      if (type) {
        isJson = ~type.indexOf('application/json');
        isText = !isJson && ~type.indexOf('text/plain');
        isHtml = !isJson && !isText && ~type.indexOf('html');
      }

      if (isJson || isText || isHtml) {
        res.body = res.body.toString('utf8');
      }

      if (isJson) {
        try {
          res.body = JSON.parse(res.body);
        } catch (err) {
          err.message = 'Invalid JSON: ' + err.message;
          err.res = res;
          return callback(err);
        }
      }
    }

    if (!isJson || res.statusCode >= 400) {
      var error = new Error(http.STATUS_CODES[res.statusCode]);

      error.res = res;

      if (isText) error.message = res.body;

      return callback(error);
    }

    return callback(null, res.body);
  });
};

/**
 * http://api.shutterstock.com/#resources
 */

Shutterstock.prototype.resources = function(callback) {
  this._request({
    method: 'GET',
    path: '/resources',
  }, callback);
};

/**
 * http://api.shutterstock.com/#testecho
 */

Shutterstock.prototype.testEcho = function(options, callback) {
  this._request({
    method: 'GET',
    path: '/test/echo',
    query: options,
  }, callback);
};

/**
 * http://api.shutterstock.com/#authcustomer
 */

Shutterstock.prototype.authCustomer = function(options, callback) {
  if (this.options.access_token) {
    return callback(new Error('login not supported with access_token'));
  }

  this._request({
    method: 'POST',
    path: '/auth/customer',
    type: 'form',
    body: utils.pick(options, 'email', 'password', 'username'),
  }, callback);
};

/**
 * http://api.shutterstock.com/#categories
 */

Shutterstock.prototype.categories = function(callback) {
  this._request({
    method: 'GET',
    path: '/categories',
  }, callback);
};

/**
 * http://api.shutterstock.com/#customersusername
 */

Shutterstock.prototype.customer = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  try {
    this._requireAuth(options);
  } catch (err) {
    return callback(err);
  }

  this._request({
    method: 'GET',
    path: '/customers/' + options.auth_user,
    query: { auth_token: options.auth_token },
  }, callback);
};

/**
 * http://api.shutterstock.com/#customersusernameimagesdownloads
 */

Shutterstock.prototype.customerImageDownloads = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  try {
    this._requireAuth(options);
  } catch (err) {
    return callback(err);
  }

  this._request({
    method: 'GET',
    path: '/customers/' + options.auth_user + '/images/downloads',
    query: utils.pick(options, 'auth_token', 'field', 'image_id', 'license',
                      'page_number', 'page_size', 'sort_by', 'sort_order'),
  }, callback);
};

/**
 * http://api.shutterstock.com/#customersusernamelightboxes
 */

Shutterstock.prototype.customerLightboxes = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  try {
    this._requireAuth(options);
  } catch (err) {
    return callback(err);
  }

  var path = '/customers/' + options.auth_user + '/lightboxes';

  if (options.extended) path += '/extended';

  this._request({
    method: 'GET',
    path: path,
    query: utils.pick(options, 'auth_token', 'auth_token', 'exclude_empty', 'exclude_images')
  }, callback);
};

/**
 * http://api.shutterstock.com/#customersusernamesubscriptions
 */

Shutterstock.prototype.customerSubscriptions = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  try {
    this._requireAuth(options);
  } catch (err) {
    return callback(err);
  }

  this._request({
    method: 'GET',
    path: '/customers/' + options.auth_user + '/subscriptions',
    query: utils.pick(options, 'auth_token', 'auth_token', 'exclude_empty', 'exclude_images'),
  }, callback);
};

/**
 * http://api.shutterstock.com/#imagesimage_id
 */

Shutterstock.prototype.image = function(options, callback) {
  if (typeof options === 'string' || typeof options === 'number') {
    options = { image_id: options };
  }

  if (!options.image_id) return callback(new Error('image_id required'));

  this._request({
    method: 'GET',
    path: '/images/' + options.image_id,
    query: utils.pick(options, 'language'),
  }, callback);
};

/**
 * http://api.shutterstock.com/#imagesimage_idsimilar
 */

Shutterstock.prototype.imageSimilar = function(options, callback) {
  if (typeof options === 'string' || typeof options === 'number') {
    options = { image_id: options };
  }

  if (!options.image_id) return callback(new Error('image_id required'));

  this._request({
    method: 'GET',
    path: '/images/' + options.image_id + '/similar',
    query: utils.pick(options, 'page_number', 'sort_method'),
  }, callback);
};

/**
 * http://api.shutterstock.com/#imagesrecommendationskeywords
 */

Shutterstock.prototype.imageRecommendationKeywords = function(options, callback) {
  if (Array.isArray(options)) {
    options = { image_id: options };
  }

  if (!options.image_id) {
    return callback(new Error('image_id required'));
  }
  if (!Array.isArray(options.image_id)) {
    return callback(new Error('image_id must be an array'));
  }

  options.image_id = options.image_id.join(',');

  this._request({
    method: 'GET',
    path: '/images/recommendations/keywords',
    query: utils.pick(options, 'image_id', 'max_results'),
  }, callback);
};

/**
 * http://api.shutterstock.com/#imagessearch
 */

Shutterstock.prototype.imageSearch = function(options, callback) {
  if (typeof options === 'string') {
    options = { searchterm: options };
  }

  this._request({
    method: 'GET',
    path: '/images/search',
    query: utils.pick(
      options,
      'all',
      'category_id',
      'color',
      'commercial_only',
      'editorial_only',
      'enhanced_only',
      'exclude_keywords',
      'language',
      'model_released',
      'orientation',
      'page_number',
      'people_age',
      'people_ethnicity',
      'people_gender',
      'people_number',
      'photographer_name',
      'results_per_page',
      'safesearch',
      'search_group',
      'searchterm',
      'sort_method',
      'submitter_id'
    ),
  }, callback);
};

/*
 * Module Exports.
 */

module.exports = Shutterstock;
