'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');
var fixtures = require('fixturefiles');
var should = require('should');
var querystring = require('querystring');

var helper = require('./helper');

/**
 * Tests
 */

describe('v2', function() {
  before(helper.beforeV2);
  beforeEach(helper.beforeEach);

  describe('audio.list', function() {
    it('should return list of tracks', function(done) {
      var ids = ['113011', '15326'];

      this.nock
        .get('/v2/audio?' + querystring.stringify({ id: ids }))
        .reply(200, fixtures.v2.audio.list);

      this.api.audio.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;
        data.data.should.have.length(2);

        lodash.each(data.data, function(data) {
          data.should.have.keys(
            'id',
            'added_date',
            'album',
            'assets',
            'contributor',
            'description',
            'published_time',
            'title',
            'media_type'
          );
        });

        done();
      });
    });

    it('should return when audio not found', function(done) {
      var ids = ['1'];

      this.nock
        .get('/v2/audio?' + querystring.stringify({ id: ids }))
        .reply(200, { data: [] });

      this.api.audio.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;
        data.data.should.be.empty;

        done();
      });
    });
  });

  describe('audio.get', function() {
    it('should return audio details', function(done) {
      var id = '113011';

      this.nock
        .get('/v2/audio/113011')
        .reply(200, fixtures.v2.audio.get);

      this.api.audio.get(id, function(err, data) {
        should.not.exist(err);

        data.should.have.property('id', id);
        data.should.have.property('media_type', 'audio');
        data.should.have.property('artists');
        data.should.have.property('title', 'MTV Hip Hop');
        data.should.have.property('contributor');
        data.contributor.should.have.property('id', '2');
        data.should.have.property('is_adult', false);
        data.should.have.property('assets');

        done();
      });
    });

    it('should return audio not found', function(done) {
      var id = 1;

      this.nock
        .get('/v2/audio/1')
        .reply(404, { message: 'Not Found' });

      this.api.audio.get(id, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('Not Found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('audio.search', function() {
    it('should return all tracks', function(done) {
      this.nock
        .get('/v2/audio/search')
        .reply(200, fixtures.v2.audio.search);

      this.api.audio.search(function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });

    it('should return query tracks for beat', function(done) {
      this.nock
        .get('/v2/audio/search?query=beat')
        .reply(200, fixtures.v2.audio.search);

      this.api.audio.search('beat', function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });
  });

  describe('contributor.get', function() {
    it('should return contributor information', function(done) {
      var id = '164782';

      this.nock
        .get('/v2/contributors/164782')
        .reply(200, fixtures.v2.contributor.get);

      this.api.contributor.get(id, function(err, data) {
        should.not.exist(err);

        data.should.have.property('id', id);

        done();
      });
    });
  });

  describe('image.categories', function() {
    it('should return image categories', function(done) {
      this.nock
        .get('/v2/images/categories')
        .reply(200, fixtures.v2.image.categories);

      this.api.image.categories(function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;

        done();
      });
    });
  });

  describe('image.list', function() {
    it('should return list of images', function(done) {
      var ids = ['108559295', '143051491'];

      this.nock
        .get('/v2/images?' + querystring.stringify({ id: ids }))
        .reply(200, fixtures.v2.image.list);

      this.api.image.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;
        data.data.should.have.length(2);

        lodash.each(data.data, function(data) {
          data.should.have.keys(
            'id',
            'aspect',
            'assets',
            'contributor',
            'description',
            'image_type',
            'media_type'
          );
        });

        done();
      });
    });

    it('should return when images not found', function(done) {
      var ids = ['1'];

      this.nock
        .get('/v2/images?' + querystring.stringify({ id: ids }))
        .reply(200, { data: [] });

      this.api.image.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;
        data.data.should.be.empty;

        done();
      });
    });
  });

  describe('image.get', function() {
    it('should return image details', function(done) {
      var id = '108559295';

      this.nock
        .get('/v2/images/108559295')
        .reply(200, fixtures.v2.image.get);

      this.api.image.get(id, function(err, data) {
        should.not.exist(err);

        data.should.have.property('id', id);
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
      var id = 1;

      this.nock
        .get('/v2/images/1')
        .reply(404, { message: 'Not Found' });

      this.api.image.get(id, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('Not Found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('image.recommendations', function() {
    it('should return recommendations for images', function(done) {
      var ids = ['108559295', '143051491'];

      this.nock
        .get('/v2/images/recommendations?' + querystring.stringify({ id: ids }))
        .reply(200, fixtures.v2.image.recommendations);

      this.api.image.recommendations(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;

        lodash.each(data.data, function(item) {
          item.should.have.property('id');
        });

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

    it('should return query images for donkey', function(done) {
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

  describe('image.similar', function() {
    it('should return similar images', function(done) {
      this.nock
        .get('/v2/images/123/similar')
        .reply(200, fixtures.v2.image.similar);

      this.api.image.similar(123, function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });
  });

  describe('video.list', function() {
    it('should return list of videos', function(done) {
      var ids = ['5869544', '3816467'];

      this.nock
        .get('/v2/videos?' + querystring.stringify({ id: ids }))
        .reply(200, fixtures.v2.video.list);

      this.api.video.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;
        data.data.should.have.length(2);

        lodash.each(data.data, function(data) {
          data.should.have.keys(
            'media_type',
            'id',
            'aspect',
            'duration',
            'description',
            'contributor',
            'aspect_ratio',
            'assets'
          );
        });

        done();
      });
    });

    it('should return when videos not found', function(done) {
      var ids = ['1'];

      this.nock
        .get('/v2/videos?' + querystring.stringify({ id: ids }))
        .reply(200, { data: [] });

      this.api.video.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.Array;
        data.data.should.be.empty;

        done();
      });
    });
  });

  describe('video.get', function() {
    it('should return video details', function(done) {
      var id = '5869544';

      this.nock
        .get('/v2/videos/5869544')
        .reply(200, fixtures.v2.video.get);

      this.api.video.get(id, function(err, data) {
        should.not.exist(err);

        data.should.have.property('id', id);
        data.should.have.property('keywords');
        data.should.have.property('media_type', 'video');
        data.should.have.property('categories');
        data.should.have.property('description', 'Mae Klang Waterfall of inthanon national ' +
                                  'park, chiang mai, thailand (slow motion shot)');
        data.should.have.property('contributor');
        data.contributor.should.have.property('id', '943678');
        data.should.have.property('is_adult', false);
        data.should.have.property('assets');

        done();
      });
    });

    it('should return video not found', function(done) {
      var id = 1;

      this.nock
        .get('/v2/videos/1')
        .reply(404, { message: 'Not Found' });

      this.api.video.get(id, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('Not Found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('video.search', function() {
    it('should return all videos', function(done) {
      this.nock
        .get('/v2/videos/search')
        .reply(200, fixtures.v2.video.search);

      this.api.video.search(function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });

    it('should return query videos for donkey', function(done) {
      this.nock
        .get('/v2/videos/search?query=donkey')
        .reply(200, fixtures.v2.video.search);

      this.api.video.search('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });
  });

  describe('video.similar', function() {
    it('should return similar videos', function(done) {
      this.nock
        .get('/v2/videos/4535879/similar')
        .reply(200, fixtures.v2.video.similar);

      this.api.video.similar(4535879, function(err, data) {
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
