'use strict';

/**
 * Module dependencies.
 */

var fixtures = require('fixturefiles');
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

      this.nock
        .get('/v2/images/108559295')
        .reply(200, fixtures.v2.image.get);

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

      this.nock
        .get('/v2/images/1')
        .reply(404);

      this.api.image.get(imageId, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('not found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('image.search', function() {
    it('should return all images', function(done) {
      this.nock
        .get('/v2/images/search')
        .reply(200, fixtures.v2.image.search);

      this.api.image.search(function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });

    it('should return image details', function(done) {
      this.nock
        .get('/v2/images/search?query=donkey')
        .reply(200, fixtures.v2.image.search);

      this.api.image.search('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });
  });
});
