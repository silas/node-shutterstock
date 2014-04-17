'use strict';

/**
 * Module dependencies.
 */

var async = require('async');
var debug = require('debug')('v1');
var should = require('should');
var uuid = require('uuid');

var helper = require('./helper');
var config = helper.config;

/**
 * Tests
 */

describe('v1', function() {
  this.timeout(config.timeout * 1000);

  before(helper.before);
  beforeEach(helper.beforeEach);

  describe('#getResources', function() {
    it('should return a list of resources', function(done) {
      this.api.getResources(function(err, data) {
        should.not.exist(err);

        data.should.be.an.instanceOf(Array);

        var resources = {};

        data.forEach(function(r) {
          resources[r.resource] = true;
        });

        resources.should.have.property('/resources');
        resources.should.have.property('/images/search');

        done();
      });
    });
  });

  describe('#echo', function() {
    it('should return requested parameters', function(done) {
      var params = { hello: 'world' };

      this.api.echo(params, function(err, data) {
        should.not.exist(err);

        data.should.eql(params);

        done();
      });
    });
  });

  describe('#searchImages', function() {
    it('should return image search results', function(done) {
      this.api.searchImages('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('count');
        data.count.should.be.above(5);
        data.should.have.property('page');
        data.page.should.eql(0);
        data.should.have.property('sort_method');
        data.sort_method.should.eql('popular');
        data.should.have.property('results');
        data.results.should.be.an.instanceOf(Array);
        data.results.length.should.be.above(5);

        // result
        var item = data.results[0];
        item.should.have.property('thumb_large_width');
        item.should.have.property('resource_url');
        item.should.have.property('web_url');
        item.should.have.property('thumb_small');
        item.should.have.property('photo_id');
        item.should.have.property('thumb_small_height');
        item.should.have.property('description');
        item.should.have.property('thumb_large_height');
        item.should.have.property('preview');
        item.should.have.property('thumb_large');
        item.should.have.property('thumb_small_width');

        done();
      });
    });
  });

  describe('#getImage', function() {
    it('should return image details', function(done) {
      var imageId = 108559295;

      this.api.getImage(imageId, function(err, data) {
        should.not.exist(err);

        data.should.have.property('illustration');
        data.illustration.should.eql(0);
        data.should.have.property('r_rated');
        data.r_rated.should.eql(0);
        data.should.have.property('photo_id');
        data.photo_id.should.eql(imageId);
        data.should.have.property('enhanced_license_available');
        data.enhanced_license_available.should.eql(1);
        data.should.have.property('resource_url');
        data.should.have.property('categories');
        data.should.have.property('model_release');
        data.should.have.property('vector_type');
        data.should.have.property('description');
        data.description.should.eql('Donkey isolated on white');
        data.should.have.property('sizes');
        data.should.have.property('keywords');
        data.should.have.property('is_vector');
        data.is_vector.should.eql(0);
        data.should.have.property('web_url');
        data.should.have.property('submitter_id');
        data.submitter_id.should.eql(371512);
        data.should.have.property('submitter');
        data.submitter.should.eql('Coprid');

        done();
      });
    });

    it('should return image not found', function(done) {
      var imageId = 1;

      this.api.getImage(imageId, function(err, data) {
        should.exist(err);

        err.message.should.eql('Not Found');
        err.res.statusCode.should.eql(404);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('#getSimilarImages', function() {
    it('should return similar images', function(done) {
      var imageId = 108559295;

      this.api.getSimilarImages(imageId, function(err, data) {
        should.not.exist(err);

        data.should.have.property('count');
        data.count.should.be.above(5);
        data.should.have.property('page');
        data.page.should.eql(0);
        data.should.have.property('sort_method');
        data.sort_method.should.eql('popular');
        data.should.have.property('results');
        data.results.should.be.an.instanceOf(Array);
        data.results.length.should.be.above(5);

        // result
        var item = data.results[0];
        item.should.have.property('thumb_large_width');
        item.should.have.property('resource_url');
        item.should.have.property('web_url');
        item.should.have.property('vector_ext');
        item.should.have.property('thumb_small');
        item.should.have.property('photo_id');
        item.should.have.property('thumb_small_height');
        item.should.have.property('description');
        item.should.have.property('thumb_large_height');
        item.should.have.property('preview');
        item.should.have.property('thumb_large');
        item.should.have.property('thumb_small_width');

        done();
      });
    });
  });

  describe('#getCategories', function() {
    it('should return a list of categories', function(done) {
      this.api.getCategories(function(err, data) {
        should.not.exist(err);

        data.should.be.an.instanceOf(Array);
        data.length.should.be.above(0);

        data[0].category_name.should.eql('Transportation');

        done();
      });
    });
  });

  describe('#auth', function() {
    it('should authenticate valid credentials', function(done) {
      if (this.api.options.access_token) return done();

      var options = {
        username: config.auth_username,
        password: config.auth_password,
      };

      this.api.auth(options, function(err, data) {
        should.not.exist(err);

        data.should.have.property('auth_token');
        data.language.should.eql('en');
        data.username.should.eql(options.username);

        done();
      });
    });

    it('should error on invalid credentials', function(done) {
      if (this.api.options.access_token) return done();

      var options = {
        username: config.auth_username,
        password: 'nope.' + config.auth_password,
      };

      this.api.auth(options, function(err, data) {
        should.exist(err);

        err.message.should.eql('Invalid username and/or password');
        err.res.statusCode.should.eql(403);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('#getCustomer', function() {
    it('should return customer info', function(done) {
      var params = { username: config.auth_username };

      this.api.getCustomer(params, function(err, data) {
        should.not.exist(err);

        data.should.have.property('account_id');
        data.should.have.property('sales_rep_info');

        done();
      });
    });
  });

  describe.skip('#register', function() {
    it('should register a customer', function(done) {
      var id = uuid.v4().replace(/-/g, '').slice(16);

      var params = {
        username: 'silas_test_' + id,
        password: uuid.v4(),
        email: 'silas+test_' + id + '@shutterstock.com',
      };

      debug('register', params);

      this.api.register(params, function(err, data) {
        should.not.exist(err);

        should(data).be.type('object');
        data.should.have.property('account_id');

        done();
      });
    });
  });

  describe('#getImageDownloads', function() {
    it('should return a list of customer downloads', function(done) {
      var params = { username: config.auth_username };

      this.api.getImageDownloads(params, function(err, data) {
        should.not.exist(err);

        data.should.be.type('object');

        done();
      });
    });
  });

  describe('#getSubscriptions', function() {
    it('should return a list of subscriptions', function(done) {
      var params = { username: config.auth_username };

      this.api.getSubscriptions(params, function(err, data) {
        should.not.exist(err);

        data.should.be.type('object');

        done();
      });
    });
  });

  describe('#getLightboxes', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should return a list of lightboxes', function(done) {
      var params = { username: config.auth_username };

      this.api.getLightboxes(params, function(err, data) {
        should.not.exist(err);

        data.should.be.an.instanceOf(Array);

        done();
      });
    });

    it('should return a list of lightboxes with extended data', function(done) {
      var params = {
        extended: true,
        username: config.auth_username,
      };

      this.api.getLightboxes(params, function(err, data) {
        should.not.exist(err);

        data.should.be.an.instanceOf(Array);

        done();
      });
    });
  });

  describe('#getLightbox', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should return lightbox', function(done) {
      var self = this;

      var params = {
        username: config.auth_username,
        lightbox_id: self.lightboxId,
      };

      self.api.getLightbox(params, function(err, data) {
        should.not.exist(err);

        data.should.have.properties(
          'lightbox_id',
          'lightbox_name',
          'confirmed',
          'resource_url',
          'image_count',
          'images'
        );
        data.lightbox_id.should.eql(self.lightboxId);
        data.lightbox_name.should.eql(self.lightboxName);
        data.confirmed.should.eql(1);
        data.image_count.should.eql(0);

        done();
      });
    });
  });

  describe('#getLightboxPublicUrl', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should return lightbox public url', function(done) {
      var params = { lightbox_id: this.lightboxId };

      this.api.getLightboxPublicUrl(params, function(err, data) {
        should.not.exist(err);

        data.should.have.properties(
          'verification_code',
          'public_url'
        );

        done();
      });
    });
  });

  describe('#createLightbox', function() {
    after(helper.afterLightbox);

    it('should create a lightbox', function(done) {
      var self = this;

      var params = {
        username: config.auth_username,
        lightbox_name: 'test_' + uuid.v4().slice(0, 8),
      };

      self.api.createLightbox(params, function(err, data) {
        should.not.exist(err);

        should(data).be.type('object');
        data.should.have.property('lightbox_id');

        self.lightboxId = data.lightbox_id;

        done();
      });
    });
  });

  describe('#updateLightbox', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should update lightbox name', function(done) {
      var self = this;

      var name = 'test_' + uuid.v4().slice(0, 8);

      var params = {
        lightbox_id: self.lightboxId,
        lightbox_name: name,
      };

      self.api.updateLightbox(params, function(err) {
        should.not.exist(err);

        delete params.lightbox_name;

        self.api.getLightbox(params, function(err, data) {
          should.not.exist(err);

          data.should.have.property('lightbox_name');
          data.lightbox_name.should.eql(name);

          done();
        });
      });
    });
  });

  describe('#deleteLightbox', function() {
    before(helper.beforeLightbox);

    it('should delete the lightbox', function(done) {
      var self = this;

      self.api.deleteLightbox({ lightbox_id: self.lightboxId }, function(err) {
        should.not.exist(err);

        self.api.getLightboxes(function(err, data) {
          should.not.exist(err);

          data.forEach(function(lightbox) {
            should(lightbox).be.type('object');
            lightbox.should.have.property('lightbox_id');
            lightbox.lightbox_id.not.eql(self.lightboxId);
          });

          done();
        });
      });
    });
  });

  describe.skip('#addToLightbox', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should add image to lightbox', function(done) {
      var self = this;

      var params = {
        lightbox_id: self.lightboxId,
        image_id: 108559295,
      };

      self.api.addToLightbox(params, function(err) {
        should.not.exist(err);

        self.api.getLightbox({ lightbox_id: self.lightboxId }, function(err, data) {
          should.not.exist(err);

          should(data).be.type('object');

          done();
        });
      });
    });
  });

  describe.skip('#removeFromLightbox', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should remove image from lightbox', function(done) {
      var self = this;

      var imageId = 108559295;

      var params = {
        lightbox_id: self.lightboxId,
        image_id: imageId,
      };

      var jobs = [];

      jobs.push(function(cb) {
        self.api.addToLightbox(params, function(err) {
          if (err) return cb(err);

          cb();
        });
      });

      jobs.push(function(cb) {
        self.api.getLightbox({ lightbox_id: self.lightboxId }, function(err, data) {
          if (err) return cb(err);

          should(data).be.type('object');

          data.should.have.property('images');
          data.images.should.be.an.instanceOf(Array);
          data.images.should.contain(imageId);

          cb();
        });
      });

      jobs.push(function(cb) {
        self.api.removeFromLightbox(params, function(err) {
          if (err) return cb(err);

          cb();
        });
      });

      jobs.push(function(cb) {
        self.api.getLightbox({ lightbox_id: self.lightboxId }, function(err, data) {
          if (err) return cb(err);

          should(data).be.type('object');

          data.should.have.property('images');
          data.images.should.be.an.instanceOf(Array);
          data.images.should.not.contain(imageId);

          cb();
        });
      });

      async.series(jobs, function(err) {
        should.not.exist(err);

        done();
      });
    });
  });

  describe.skip('#getImageKeywordRecommendations', function() {
    it('should return recommended keywords', function(done) {
      var imageIds = [143051491, 108559295, 130763906];

      this.api.getImageKeywordRecommendations(imageIds, function(err, data) {
        should.not.exist(err);

        should(data).be.type('object');

        done();
      });
    });
  });

  describe('#searchVideos', function() {
    it('should return video search results', function(done) {
      this.api.searchVideos('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('count');
        data.count.should.be.above(5);

        data.should.have.property('page');
        data.page.should.eql(0);

        data.should.have.property('results');
        data.results.should.be.an.instanceOf(Array);
        data.results.length.should.be.above(0);

        var result = data.results[0];
        result.should.be.type('object');

        result.should.have.property('video_id');
        result.should.have.property('submitter_id');
        result.should.have.property('description');

        done();
      });
    });
  });

  describe('#getVideo', function() {
    it('should return video details', function(done) {
      var video_id = 5869544;

      this.api.getVideo(video_id, function(err, data) {
        should.not.exist(err);

        should(data).be.type('object');

        data.should.have.property('video_id');
        data.video_id.should.eql(video_id);
        data.should.have.property('description');
        data.should.have.property('categories');
        data.should.have.property('keywords');
        data.should.have.property('submitter_id');

        done();
      });
    });

    it('should return video not found', function(done) {
      var video_id = 1;

      this.api.getVideo(video_id, function(err, data) {
        should.exist(err);

        err.message.should.eql('Id not found');
        err.res.statusCode.should.eql(404);

        should.not.exist(data);

        done();
      });
    });
  });
});
