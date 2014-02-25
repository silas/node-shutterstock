'use strict';

/**
 * Module dependencies.
 */

var should = require('should');

var v1 = require('../lib/v1');

/**
 * Config
 */

var config = {
  baseUrl: process.env.API_BASE_URL || 'http://api.shutterstock.com',
  user: process.env.API_USER,
  key: process.env.API_KEY,
  password: process.env.API_PASSWORD,
};

/**
 * Tests
 */

describe('v1', function() {
  before(function(done) {
    this.api = v1({
      user: config.user,
      key: config.key,
      baseUrl: config.baseUrl
    });

    var options = {
      username: config.user,
      password: config.password,
    };

    this.api.authCustomer(options, function(err, res) {
      should.not.exist(err);
      res.statusCode.should.eql(200);
      config.auth_token = res.body.auth_token;
      done();
    });
  });

  beforeEach(function() {
    this.api.options.auth_token = null;
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
        var options = {
          username: config.user,
          password: config.password,
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
        this.api.options.auth_token = config.auth_token;

        this.api.customer(function(err, res) {
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
        this.api.options.auth_token = config.auth_token;

        this.api.customerImageDownloads(function(err, res) {
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
        this.api.options.auth_token = config.auth_token;

        this.api.customerLightboxes(function(err, res) {
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
        this.api.options.auth_token = config.auth_token;

        this.api.customerLightboxes({ extended: true }, function(err, res) {
          should.not.exist(err);
          res.statusCode.should.eql(200);
          res.body.should.be.an.instanceOf(Array);
          done();
        });
      });
    });
  });

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
