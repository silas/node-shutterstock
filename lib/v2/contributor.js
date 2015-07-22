/**
 * Contributor
 */

'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');

var utils = require('../utils');

/**
 * Initialize a new `Contributor` client.
 */

function Contributor(api) {
  this.api = api;
}

/**
 * Get contributors info
 */

 Contributor.prototype.get = function(opts, callback) {
   if (typeof opts === 'string' || typeof opts === 'number') {
     opts = { id: opts };
   }

   var req = {
     name: 'contributor.get',
     path: '/contributors/{id}',
     params: { id: opts.id },
     query: lodash.pick(opts, 'view'),
   };

   if (!opts.id) {
     return callback(this.api._err('id required', req));
   }

   this.api._options(req, opts);
   this.api._get(req, utils.body, callback);
 };

/**
 * Module exports.
 */

exports.Contributor = Contributor;
