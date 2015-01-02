'use strict';

/**
 * Module dependencies.
 */

var fixtures = require('fixturefiles');
var should = require('should');
var querystring = require('querystring');
var uuid = require('node-uuid');

var helper = require('./helper');
var config = helper.config;

/**
 * Tests
 */

describe('v1', function() {
  before(helper.beforeV1);
  beforeEach(helper.beforeEach);

  describe('resources', function() {
    it('should return a list of resources', function(done) {
      this.nock
        .get('/resources.json')
        .reply(200, fixtures.v1.resources);

      this.api.resources(function(err, data) {
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

  describe('echo', function() {
    it('should return requested parameters', function(done) {
      this.nock
        .get('/test/echo.json?hello=world')
        .reply(200, fixtures.v1.echo);

      var params = { hello: 'world' };

      this.api.echo(params, function(err, data) {
        should.not.exist(err);

        data.should.eql(params);

        done();
      });
    });
  });

  describe('image.search', function() {
    it('should return image search results', function(done) {
      this.nock
        .get('/images/search.json?searchterm=donkey')
        .reply(200, fixtures.v1.image.search);

      this.api.image.search('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('count');
        data.count.should.be.above(5);
        data.should.have.property('page');
        data.page.should.equal(0);
        data.should.have.property('sort_method');
        data.sort_method.should.equal('popular');
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

  describe('image.get', function() {
    it('should return image details', function(done) {
      var imageId = 108559295;

      this.nock
        .get('/images/108559295.json')
        .reply(200, fixtures.v1.image.get);

      this.api.image.get(imageId, function(err, data) {
        should.not.exist(err);

        data.should.have.property('illustration');
        data.illustration.should.equal(0);
        data.should.have.property('r_rated');
        data.r_rated.should.equal(0);
        data.should.have.property('photo_id');
        data.photo_id.should.equal(imageId);
        data.should.have.property('enhanced_license_available');
        data.enhanced_license_available.should.equal(1);
        data.should.have.property('resource_url');
        data.should.have.property('categories');
        data.should.have.property('model_release');
        data.should.have.property('vector_type');
        data.should.have.property('description');
        data.description.should.equal('Donkey isolated on white');
        data.should.have.property('sizes');
        data.should.have.property('keywords');
        data.should.have.property('is_vector');
        data.is_vector.should.equal(0);
        data.should.have.property('web_url');
        data.should.have.property('submitter_id');
        data.submitter_id.should.equal(371512);
        data.should.have.property('submitter');
        data.submitter.should.equal('Coprid');

        done();
      });
    });

    it('should return image not found', function(done) {
      var imageId = 1;

      this.nock
        .get('/images/1.json')
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

  describe('image.similar', function() {
    it('should return similar images', function(done) {
      var imageId = 108559295;

      this.nock
        .get('/images/108559295/similar.json')
        .reply(200, fixtures.v1.image.similar);

      this.api.image.similar(imageId, function(err, data) {
        should.not.exist(err);

        data.should.have.property('count');
        data.count.should.be.above(5);
        data.should.have.property('page');
        data.page.should.equal(0);
        data.should.have.property('sort_method');
        data.sort_method.should.equal('popular');
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

  describe('image.categories', function() {
    it('should return a list of categories', function(done) {
      this.nock
        .get('/categories.json')
        .reply(200, fixtures.v1.categories);

      this.api.image.categories(function(err, data) {
        should.not.exist(err);

        data.should.be.an.instanceOf(Array);
        data.length.should.be.above(0);

        data[0].category_name.should.equal('Transportation');

        done();
      });
    });
  });

  describe('customer.auth', function() {
    it('should authenticate valid credentials', function(done) {
      var options = {
        username: config.auth_username,
        password: config.auth_password,
      };

      this.nock
        .post('/auth/customer.json', options)
        .reply(200, fixtures.v1.customer.auth);

      this.api.customer.auth(options, function(err, data) {
        should.not.exist(err);

        data.should.have.properties('auth_token', 'language', 'username');

        done();
      });
    });

    it('should error on invalid credentials', function(done) {
      var options = {
        username: config.auth_username,
        password: 'nope.' + config.auth_password,
      };

      this.nock
        .post('/auth/customer.json', options)
        .reply(403, 'Invalid username and/or password', {
          'Content-Type': 'text/plain; charset=utf-8',
        });

      this.api.customer.auth(options, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('Invalid username and/or password');
        res.statusCode.should.equal(403);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('customer.get', function() {
    it('should return customer info', function(done) {
      var params = { username: config.auth_username };

      this.nock
        .get('/customers/' + config.auth_username + '.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200, fixtures.v1.customer.get);

      this.api.customer.get(params, function(err, data) {
        should.not.exist(err);

        data.should.have.property('account_id');
        data.should.have.property('sales_rep_info');

        done();
      });
    });
  });

  helper.nock.describe('customer.register', function() {
    it('should register a customer', function(done) {
      var id = uuid.v4().replace(/-/g, '').slice(16);

      var params = {
        username: 'silas_test_' + id,
        password: uuid.v4(),
        email: 'silas+test_' + id + '@shutterstock.com',
      };

      this.nock
        .put('/customers/' + params.username + '.json?' + querystring.stringify({
          email: params.email,
          password: params.password,
        }))
        .reply(200, fixtures.v1.customer.register);

      this.api.customer.register(params, function(err, data) {
        should.not.exist(err);

        should(data).be.type('object');
        data.should.have.property('account_id');

        done();
      });
    });
  });

  describe('customer.images', function() {
    it('should return a list of customer downloads', function(done) {
      var params = { username: config.auth_username };

      this.nock
        .get('/customers/' + params.username + '/images/downloads.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200, fixtures.v1.customer.images);

      this.api.customer.images(params, function(err, data) {
        should.not.exist(err);

        data.should.be.type('object');

        done();
      });
    });
  });

  describe('customer.subscriptions', function() {
    it('should return a list of subscriptions', function(done) {
      var params = { username: config.auth_username };

      this.nock
        .get('/customers/' + params.username + '/subscriptions.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200, fixtures.v1.customer.subscriptions);

      this.api.customer.subscriptions(params, function(err, data) {
        should.not.exist(err);

        data.should.be.type('object');

        done();
      });
    });
  });

  describe('lightbox.list', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should return a list of lightboxes', function(done) {
      this.nock
        .get('/customers/' + this.api.defaults.username + '/lightboxes.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200, fixtures.v1.lightboxes.list);

      this.api.lightbox.list(function(err, data) {
        should.not.exist(err);

        data.should.be.an.instanceOf(Array);

        done();
      });
    });
  });

  describe('lightbox.get', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should return lightbox', function(done) {
      var self = this;

      var params = {
        username: config.auth_username,
        lightbox_id: self.lightboxId,
      };

      this.nock
        .get('/lightboxes/' + self.lightboxId + '.json?auth_token=' + this.api.defaults.auth_token)
        .reply(200, fixtures.v1.lightboxes.get);

      self.api.lightbox.get(params, function(err, data) {
        should.not.exist(err);

        data.should.have.properties(
          'lightbox_id',
          'lightbox_name',
          'confirmed',
          'resource_url',
          'image_count',
          'images'
        );
        data.lightbox_id.should.equal(self.lightboxId);
        data.lightbox_name.should.equal(self.lightboxName);
        data.confirmed.should.equal(1);
        data.image_count.should.equal(0);

        done();
      });
    });
  });

  describe('lightbox.publicUrl', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should return lightbox public url', function(done) {
      var params = { lightbox_id: this.lightboxId };

      this.nock
        .get('/lightboxes/' + this.lightboxId + '/public_url.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200, fixtures.v1.lightboxes.publicUrl);

      this.api.lightbox.publicUrl(params, function(err, data) {
        should.not.exist(err);

        data.should.have.properties(
          'verification_code',
          'public_url'
        );

        done();
      });
    });
  });

  describe('lightbox.create', function() {
    after(helper.afterLightbox);

    it('should create a lightbox', function(done) {
      var self = this;

      var params = {
        username: config.auth_username,
        lightbox_name: 'test_' + uuid.v4().slice(0, 8),
      };

      this.nock
        .post('/customers/' + this.api.defaults.username + '/lightboxes.json?auth_token=' +
             this.api.defaults.auth_token,
             { lightbox_name: params.lightbox_name })
        .reply(200, fixtures.v1.lightboxes.create);

      self.api.lightbox.create(params, function(err, data) {
        should.not.exist(err);

        should(data).be.type('object');
        data.should.have.property('lightbox_id');

        self.lightboxId = data.lightbox_id;

        done();
      });
    });
  });

  describe('lightbox.update', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should update lightbox name', function(done) {
      var self = this;

      var name = 'test_' + uuid.v4().slice(0, 8);

      var params = {
        lightbox_id: self.lightboxId,
        lightbox_name: name,
      };

      this.nock
        .post('/lightboxes/' + self.lightboxId + '.json?auth_token=' +
             this.api.defaults.auth_token,
             { lightbox_name: params.lightbox_name })
        .reply(200, fixtures.v1.lightboxes.update);

      this.nock
        .get('/lightboxes/' + self.lightboxId + '.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200, { lightbox_name: params.lightbox_name });

      self.api.lightbox.update(params, function(err) {
        should.not.exist(err);

        delete params.lightbox_name;

        self.api.lightbox.get(params, function(err, data) {
          should.not.exist(err);

          data.should.have.property('lightbox_name');
          data.lightbox_name.should.equal(name);

          done();
        });
      });
    });
  });

  describe('lightbox.destroy', function() {
    before(helper.beforeLightbox);

    it('should delete the lightbox', function(done) {
      var self = this;

      this.nock
        .delete('/lightboxes/' + self.lightboxId + '.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200);

      this.nock
        .get('/customers/' + this.api.defaults.username + '/lightboxes.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200, []);

      self.api.lightbox.destroy(self.lightboxId, function(err) {
        should.not.exist(err);

        self.api.lightbox.list(function(err, data) {
          should.not.exist(err);

          data.forEach(function(lightbox) {
            should(lightbox).be.type('object');
            lightbox.should.have.property('lightbox_id');
            lightbox.lightbox_id.should.not.equal(self.lightboxId);
          });

          done();
        });
      });
    });
  });

  helper.nock.describe('lightbox.add', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should add image to lightbox', function(done) {
      var self = this;

      var params = {
        lightbox_id: self.lightboxId,
        image_id: 108559295,
      };

      this.nock
        .put('/lightboxes/' + self.lightboxId + '/images/108559295.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200);

      self.api.lightbox.add(params, function(err) {
        should.not.exist(err);

        done();
      });
    });
  });

  helper.nock.describe('lightbox.remove', function() {
    before(helper.beforeLightbox);
    after(helper.afterLightbox);

    it('should remove image from lightbox', function(done) {
      var self = this;

      var imageId = 108559295;

      var params = {
        lightbox_id: self.lightboxId,
        image_id: imageId,
      };

      this.nock
        .delete('/lightboxes/' + self.lightboxId + '/images/108559295.json?auth_token=' +
             this.api.defaults.auth_token)
        .reply(200);

      self.api.lightbox.remove(params, function(err) {
        should.not.exist(err);

        done();
      });
    });
  });

  describe('video.search', function() {
    it('should return video search results', function(done) {
      this.nock
        .get('/videos/search.json?searchterm=donkey')
        .reply(200, fixtures.v1.video.search);

      this.api.video.search('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('count');
        data.count.should.be.above(5);

        data.should.have.property('page');
        data.page.should.equal(0);

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

  describe('video.get', function() {
    it('should return video details', function(done) {
      var video_id = 5869544;

      this.nock
        .get('/videos/5869544.json')
        .reply(200, fixtures.v1.video.get);

      this.api.video.get(video_id, function(err, data) {
        should.not.exist(err);

        should(data).be.type('object');

        data.should.have.property('video_id');
        data.video_id.should.equal(video_id);
        data.should.have.property('description');
        data.should.have.property('categories');
        data.should.have.property('keywords');
        data.should.have.property('submitter_id');

        done();
      });
    });

    it('should return video not found', function(done) {
      var video_id = 1;

      this.nock
        .get('/videos/1.json')
        .reply(404, 'Id not found', {
          'Content-Type': 'text/plain; charset=utf-8',
        });

      this.api.video.get(video_id, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('Id not found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });
});
