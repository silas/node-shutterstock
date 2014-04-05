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
      res.statusCode.should.eql(200);
      config.auth_token = res.body.auth_token;
      done();
    });
  });

  describe('/resources', function() {
    describe('GET', function() {
      it('should return a list of resources', function(done) {
        this.api.resources(function(err, res) {
          should.not.exist(err);
          res.statusCode.should.eql(200);
          res.body.should.be.an.instanceOf(Array);
          res.body[0].resource.should.eql('/resources');
          done();
        });
      });
    });
  });

  describe('/test/echo', function() {
    describe('GET', function() {
      it('should return echo back param', function(done) {
        var data = 'hello world';

        this.api.testEcho(data, function(err, res) {
          should.not.exist(err);
          res.statusCode.should.eql(200);
          res.body.example_param.should.eql(data);
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
          res.statusCode.should.eql(200);
          res.body.should.have.property('auth_token');
          res.body.language.should.eql('en');
          res.body.username.should.eql(options.username);
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
          res.statusCode.should.eql(200);
          res.body.should.be.an.instanceOf(Array);
          res.body[0].category_name.should.eql('Transportation');
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
          res.statusCode.should.eql(200);
          res.body.should.have.property('account_id');
          res.body.should.have.property('sales_rep_info');
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
          res.statusCode.should.eql(200);
          res.body.should.be.type('object');
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
          res.statusCode.should.eql(200);
          res.body.should.be.an.instanceOf(Array);
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
          res.statusCode.should.eql(200);
          res.body.should.be.an.instanceOf(Array);
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
          res.statusCode.should.eql(200);
          res.body.should.be.type('object');
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
          res.statusCode.should.eql(200);

          var body = res.body;
          body.should.have.property('illustration');
          body.illustration.should.eql(0);
          body.should.have.property('r_rated');
          body.r_rated.should.eql(0);
          body.should.have.property('photo_id');
          body.photo_id.should.eql(image_id);
          body.should.have.property('enhanced_license_available');
          body.enhanced_license_available.should.eql(1);
          body.should.have.property('resource_url');
          body.should.have.property('categories');
          body.should.have.property('model_release');
          body.should.have.property('vector_type');
          body.should.have.property('description');
          body.description.should.eql('Donkey isolated on white');
          body.should.have.property('sizes');
          body.should.have.property('keywords');
          body.should.have.property('is_vector');
          body.is_vector.should.eql(0);
          body.should.have.property('web_url');
          body.should.have.property('submitter_id');
          body.submitter_id.should.eql(371512);
          body.should.have.property('submitter');
          body.submitter.should.eql('Coprid');

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
          res.statusCode.should.eql(200);

          var body = res.body;
          body.should.have.property('count');
          body.count.should.be.above(5);
          body.should.have.property('page');
          body.page.should.eql(0);
          body.should.have.property('sort_method');
          body.sort_method.should.eql('popular');
          body.should.have.property('results');
          body.results.should.be.an.instanceOf(Array);
          body.results.length.should.be.above(5);

          // result
          var item = body.results[0];
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
          res.statusCode.should.eql(200);

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
          res.statusCode.should.eql(200);

          // body
          var body = res.body;
          body.should.have.property('count');
          body.count.should.be.above(5);
          body.should.have.property('page');
          body.page.should.eql(0);
          body.should.have.property('sort_method');
          body.sort_method.should.eql('popular');
          body.should.have.property('results');
          body.results.should.be.an.instanceOf(Array);
          body.results.length.should.be.above(5);

          // result
          var item = body.results[0];
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
