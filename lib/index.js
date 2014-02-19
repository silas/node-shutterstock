'use strict';

/**
 * Module dependencies.
 */

var schema = require('./schema');

/**
 * Expose client loader.
 */

module.exports = function(options) {
  schema.validateThrow(schema.options, options, 'Invalid options');
  return require('./v' + options.version)(options);
};
