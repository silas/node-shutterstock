'use strict';

/**
 * Module dependencies.
 */

var schema = require('./schema');

/**
 * Expose client loader.
 */

module.exports = function(options) {
  options = options || {};
  options.version = options.version || '1';
  schema.validateThrow(schema.options, options, 'Invalid options');
  return require('./v' + options.version)(options);
};
