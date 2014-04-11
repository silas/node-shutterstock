'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var should = require('should');

var v1 = require('../lib/v1');

/**
 * Tests
 */

describe('v1', function() {
  this.timeout(5 * 1000);

  before(function(done) {
    var path = process.env.API_CONFIG;

    if (!path) {
      throw new Error('set API_CONFIG environment variable');
    }

    var config = JSON.parse(fs.readFileSync(path));

    this.api = v1(config);
    this.config = config;

    if (this.api.options.access_token) return done();

    var options = {
      username: config.auth_user,
      password: config.auth_password,
    };

    this.api.authCustomer(options, function(err, res) {
      should.not.exist(err);

      config.auth_token = res.auth_token;

      done();
    });
  });

  describe('/resources', function() {
    describe('GET', function() {
      it('should return a list of resources', function(done) {
        this.api.resources(function(err, res) {
          should.not.exist(err);

          res.should.be.an.instanceOf(Array);

          var resources = {};

          res.forEach(function(r) {
            resources[r.resource] = true;
          });

          resources.should.have.property('/resources');
          resources.should.have.property('/images/search');

          done();
        });
      });
    });
  });

  describe('/test/echo', function() {
    describe('GET', function() {
      it('should return echo back param', function(done) {
        var params = { hello: 'world' };

        this.api.testEcho(params, function(err, res) {
          should.not.exist(err);

          res.hello.should.eql(params.hello);

          done();
        });
      });
    });
  });

  describe('/auth/customer', function() {
    describe('POST', function() {
      it('should authenticate valid credentials', function(done) {
        if (this.api.options.access_token) return done();

        var options = {
          username: this.config.auth_user,
          password: this.config.auth_password,
        };

        this.api.authCustomer(options, function(err, res) {
          should.not.exist(err);

          res.should.have.property('auth_token');
          res.language.should.eql('en');
          res.username.should.eql(options.username);

          done();
        });
      });

      it('should error on invalid credentials', function(done) {
        if (this.api.options.access_token) return done();

        var options = {
          username: this.config.auth_user,
          password: 'nope.' + this.config.auth_password,
        };

        this.api.authCustomer(options, function(err, res) {
          should.exist(err);

          err.message.should.eql('Invalid username and/or password');
          err.res.statusCode.should.eql(403);

          should.not.exist(res);

          done();
        });
      });
    });
  });

  describe('/categories', function() {
    describe('GET', function() {
      it('should return a list of categories', function(done) {
        this.api.categories(function(err, res) {
          should.not.exist(err);

          res.should.be.an.instanceOf(Array);

          res[0].category_name.should.eql('Transportation');

          done();
        });
      });
    });
  });

  describe('/customers/<username>', function() {
    describe('GET', function() {
      it('should return customer info', function(done) {
        var params = { auth_user: this.config.auth_user };

        if (!this.api.options.access_token) params.auth_token = this.config.auth_token;

        this.api.customer(params, function(err, res) {
          should.not.exist(err);

          res.should.have.property('account_id');
          res.should.have.property('sales_rep_info');

          done();
        });
      });
    });
  });

  describe('/customers/<username>/images/downloads', function() {
    describe('GET', function() {
      it('should return a list of customer downloads', function(done) {
        var params = { auth_user: this.config.auth_user };

        if (!this.api.options.access_token) params.auth_token = this.config.auth_token;

        this.api.customerImageDownloads(params, function(err, res) {
          should.not.exist(err);

          res.should.be.type('object');

          done();
        });
      });
    });
  });

  describe('/customers/<username>/lightboxes', function() {
    describe('GET', function() {
      it('should return a list of lightboxes', function(done) {
        var params = { auth_user: this.config.auth_user };

        if (!this.api.options.access_token) params.auth_token = this.config.auth_token;

        this.api.customerLightboxes(params, function(err, res) {
          should.not.exist(err);

          res.should.be.an.instanceOf(Array);

          done();
        });
      });
    });
  });

  describe('/customers/<username>/lightboxes/extended', function() {
    describe('GET', function() {
      it('should return a list of lightboxes with extended data', function(done) {
        var params = {
          extended: true,
          auth_user: this.config.auth_user,
        };

        if (!this.api.options.access_token) params.auth_token = this.config.auth_token;

        this.api.customerLightboxes(params, function(err, res) {
          should.not.exist(err);

          res.should.be.an.instanceOf(Array);

          done();
        });
      });
    });
  });

  describe('/customers/<username>/subscriptions', function() {
    describe('GET', function() {
      it('should return a list of subscriptions', function(done) {
        var params = { auth_user: this.config.auth_user };

        if (!this.api.options.access_token) params.auth_token = this.config.auth_token;

        this.api.customerImageDownloads(params, function(err, res) {
          should.not.exist(err);

          res.should.be.type('object');

          done();
        });
      });
    });
  });

  describe('/images/<image_id>', function() {
    describe('GET', function() {
      it('should return image details', function(done) {
        var image_id = 108559295;

        this.api.image(image_id, function(err, res) {
          should.not.exist(err);

          res.should.have.property('illustration');
          res.illustration.should.eql(0);
          res.should.have.property('r_rated');
          res.r_rated.should.eql(0);
          res.should.have.property('photo_id');
          res.photo_id.should.eql(image_id);
          res.should.have.property('enhanced_license_available');
          res.enhanced_license_available.should.eql(1);
          res.should.have.property('resource_url');
          res.should.have.property('categories');
          res.should.have.property('model_release');
          res.should.have.property('vector_type');
          res.should.have.property('description');
          res.description.should.eql('Donkey isolated on white');
          res.should.have.property('sizes');
          res.should.have.property('keywords');
          res.should.have.property('is_vector');
          res.is_vector.should.eql(0);
          res.should.have.property('web_url');
          res.should.have.property('submitter_id');
          res.submitter_id.should.eql(371512);
          res.should.have.property('submitter');
          res.submitter.should.eql('Coprid');

          done();
        });
      });

      it('should return image not found', function(done) {
        var image_id = 1;

        this.api.image(image_id, function(err, res) {
          should.exist(err);

          err.message.should.eql('Not Found');
          err.res.statusCode.should.eql(404);

          should.not.exist(res);

          done();
        });
      });
    });
  });

  describe('/images/<image_id>/similar', function() {
    describe('GET', function() {
      it('should return similar images', function(done) {
        var image_id = 108559295;

        this.api.imageSimilar(image_id, function(err, res) {
          should.not.exist(err);

          res.should.have.property('count');
          res.count.should.be.above(5);
          res.should.have.property('page');
          res.page.should.eql(0);
          res.should.have.property('sort_method');
          res.sort_method.should.eql('popular');
          res.should.have.property('results');
          res.results.should.be.an.instanceOf(Array);
          res.results.length.should.be.above(5);

          // result
          var item = res.results[0];
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
  });

  /*
  describe('/images/recommendations/keywords', function() {
    describe('GET', function() {
      it('should return recommended keywords', function(done) {
        var image_ids = [143051491, 108559295, 130763906];

        this.api.imageRecommendationKeywords(image_ids, function(err, res) {
          should.not.exist(err);

          done();
        });
      });
    });
  });
  */

  describe('/images/search', function() {
    describe('GET', function() {
      it('should return image search results', function(done) {
        this.api.imageSearch('donkey', function(err, res) {
          should.not.exist(err);

          res.should.have.property('count');
          res.count.should.be.above(5);
          res.should.have.property('page');
          res.page.should.eql(0);
          res.should.have.property('sort_method');
          res.sort_method.should.eql('popular');
          res.should.have.property('results');
          res.results.should.be.an.instanceOf(Array);
          res.results.length.should.be.above(5);

          // result
          var item = res.results[0];
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
  });
});
