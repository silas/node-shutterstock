'use strict';

/**
 * Module dependencies.
 */

var jjv = require('jjv');

/**
 * Schema environment
 */

var env = jjv();

/**
 * Validate and throw on error
 */

function validateThrow(schema, data, message) {
  var errors = env.validate(schema, data);

  if (errors) {
    var err = new Error(message || 'invalid');
    err.errors = errors;
    err.message += '\n' + JSON.stringify(errors, null, 4);
    throw err;
  }
}

/*
 * Schema
 */

exports.options = {
  type: 'object',
  properties: {
    version: {
      type: 'string',
      enum: ['1'],
    },
  },
  required: ['version'],
};

var v1 = exports.v1 = {};

v1.options = {
  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
    user: {
      type: 'string',
      minimum: 1,
    },
  },
  required: ['key', 'user'],
};

/**
 * Expose schema.
 */

exports.validateThrow = validateThrow;
