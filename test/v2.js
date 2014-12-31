'use strict';

/**
 * Module dependencies.
 */

var should = require('should');

var helper = require('./helper');

/**
 * Tests
 */

describe('v2', function() {
  before(helper.beforeV2);
  beforeEach(helper.beforeEach);

  describe('image.get', function() {
    it('should return image details', function(done) {
      var imageId = '108559295';

      this.api.image.get(imageId, function(err, data) {
        should.not.exist(err);

        data.should.have.property('id', imageId);
        data.should.have.property('keywords');
        data.should.have.property('media_type', 'image');
        data.should.have.property('categories');
        data.should.have.property('description', 'Donkey isolated on white');
        data.should.have.property('contributor');
        data.contributor.should.have.property('id', '371512');
        data.should.have.property('is_adult', false);
        data.should.have.property('image_type', 'photo');
        data.should.have.property('assets');

        done();
      });
    });

    it('should return image not found', function(done) {
      var imageId = 1;

      this.api.image.get(imageId, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('not found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });
});
