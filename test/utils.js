'use strict';

/**
 * Module dependencies.
 */

require('should');

var utils = require('../lib/utils');

/**
 * Tests
 */

describe('utils', function() {
  describe('cleanError', function() {
    it('should return die message', function() {
      utils.cleanError('ok at test.pl line 1.').should.eql('ok');
    });
  });
});
