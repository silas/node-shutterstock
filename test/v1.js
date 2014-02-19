'use strict';

var shutterstock = require('../lib');

describe('v1', function() {
  it('should require valid version', function(done) {
    (function() {
      shutterstock({
        key: 'api-key',
        user: 'api-user',
        version: '-1',
      });
    }).should.throw(/^Invalid options/);

    done();
  });

  it('should require auth', function(done) {
    (function() {
      shutterstock({
        version: '1',
      });
    }).should.throw(/^Invalid v1 options\n/);

    done();
  });

  it('should initalize', function(done) {
    var api = shutterstock({
      key: 'api-key',
      user: 'api-user',
      version: '1',
    });

    api.version.should.eql('1');

    done();
  });
});
