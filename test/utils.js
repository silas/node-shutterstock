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

  describe('pick', function() {
    it('should return die message', function() {
      var data = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
      };

      utils.pick(data, 'two', 'four', 'six').should.eql({
        two: 2,
        four: 4,
      });
    });
  });
});
