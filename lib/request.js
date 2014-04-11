'use strict';

/**
 * Module dependencies.
 */

var http = require('http');
var https = require('https');
var querystring = require('querystring');

var utils = require('./utils');

/**
 * Create new request
 */

function request(options, callback) {
  var done = false;
  var bodyLength = 0;
  var req, timeout;

  if (options.query) {
    try {
      options.path += '?' + querystring.stringify(options.query);
    } catch (err) {
      err.message = 'Query encode: ' + err.message;
      return callback(err);
    }
  }

  if (options.body) {
    if (!options.type && !Buffer.isBuffer(options.body)) {
      options.type = 'json';
    }

    if (options.type === 'json') {
      options.headers['content-type'] = 'application/json; charset=utf-8';

      try {
        options.body = JSON.stringify(options.body);
      } catch (err) {
        err.message = 'JSON encode: ' + err.message;
        return callback(err);
      }
    } else if (options.type === 'form') {
      options.headers['content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';

      try {
        options.body = querystring.stringify(options.body);
      } catch (err) {
        err.message = 'Form encode: ' + err.message;
        return callback(err);
      }
    }

    if (!Buffer.isBuffer(options.body)) {
      options.body = new Buffer(options.body, 'utf8');
    }

    options.headers['content-length'] = options.body.length;
  }

  req = (options.scheme === 'https' ? https : http)
    .request(utils.pick(options,
      'hostname', 'port', 'method', 'path', 'headers', 'auth'));

  req.on('error', function(err) {
    if (done) {
      if (timeout) clearTimeout(timeout);
      return;
    }
    done = true;

    callback(err);
  });

  if (options.timeout > 0) {
    timeout = setTimeout(function() {
      req.abort();
      req.emit('error', new Error('Timeout'));
    }, options.timeout);

    req.setTimeout(options.timeout, function() {
      req.emit('error', new Error('Timeout'));
    });
  }

  req.on('response', function(res) {
    var chunks = [];

    res.on('data', function(chunk) {
      chunks.push(chunk);
      bodyLength += chunk.length;
    });

    res.on('end', function() {
      if (done) return;
      done = true;

      if (timeout) clearTimeout(timeout);

      res.body = Buffer.concat(chunks, bodyLength);

      callback(null, res);
    });
  });

  req.end(options.body);
}

/**
 * Module Exports.
 */

module.exports = request;
