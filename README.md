# Shutterstock [![Build Status](https://secure.travis-ci.org/silas/node-shutterstock.png?branch=master)](http://travis-ci.org/silas/node-shutterstock)

This is a Node.js [Shutterstock API][v2] client.

 * [Usage](#usage)
 * [Documentation](#documentation)
 * [Todo](#todo)
 * [License](#license)

## Usage

Install

``` console
$ npm install shutterstock --save
```

Example

``` javascript
var shutterstock = require('shutterstock');

var api = shutterstock.v2({
  clientId: 'a134a44b2220a831d511',
  clientSecret: '0498a3442cf2ad2d11efbda32a32fa26a20d229c',
});

api.image.get('108559295', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

## Documentation

 * [shutterstock.v2](#v2)
   * [v2.image.list](#v2.image.list)
   * [v2.image.get](#v2.image.get)
   * [v2.image.search](#v2.image.search)
   * [v2.video.list](#v2.video.list)
   * [v2.video.get](#v2.video.get)
   * [v2.video.search](#v2.video.search)
 * [shutterstock.v1](#v1)
   * [v1.echo](#v1.echo)
   * [v1.image.search](#v1.image.search)
   * [v1.image.get](#v1.image.get)
   * [v1.image.similar](#v1.image.similar)
   * [v1.image.categories](#v1.image.categories)
   * [v1.customer.auth](#v1.customer.auth)
   * [v1.customer.register](#v1.customer.register)
   * [v1.customer.get](#v1.customer.get)
   * [v1.customer.images](#v1.customer.images)
   * [v1.customer.subscriptions](#v1.customer.subscriptions)
   * [v1.lightbox.list](#v1.lightbox.list)
   * [v1.lightbox.get](#v1.lightbox.get)
   * [v1.lightbox.publicUrl](#v1.lightbox.publicUrl)
   * [v1.lightbox.create](#v1.lightbox.create)
   * [v1.lightbox.update](#v1.lightbox.update)
   * [v1.lightbox.destroy](#v1.lightbox.destroy)
   * [v1.lightbox.add](#v1.lightbox.add)
   * [v1.lightbox.remove](#v1.lightbox.remove)
   * [v1.video.search](#v1.video.search)
   * [v1.video.get](#v1.video.get)

<a name="callback"/>
### Callback

All callbacks have the following signature `function(err, data, res)`.

 * err (Error, optional): set if there was an error, otherwise falsy
 * data (Object, optional): response data if any, otherwise `undefined`
 * res (http.IncomingMessage, optional): HTTP response object with additional `body` property. This might not exist when `err` is set. The `body` property can be a decoded object, string, or Buffer.

<a name="v2"/>
### Class: shutterstock.v2(options)

This is a client for interacting with [API v2][v2].

Options

 * clientId (String): OAuth2 client ID
 * clientSecret (String): OAuth2 client secret
 * timeout (Number, default: 30000ms): number of milliseconds before request is aborted

Usage

``` javascript
var shutterstock = require('shutterstock');

var v2 = shutterstock.v2({
  clientId: 'client-id',
  clientSecret: 'client-secret',
});
```

<a name="v2.image.list"/>
#### v2.image.list(options, callback)

Get details for multiple images.

Options - [Official Documentation](https://developers.shutterstock.com/api/v2/image/list)

 * id (String[]): image IDs
 * view (String, optional): render view

Usage

``` javascript
v2.image.list(['108559295', '143051491'], function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.image.get"/>
#### v2.image.get(options, callback)

Get details for a specified image.

Options - [Official Documentation](https://developers.shutterstock.com/api/v2/image/get)

 * id (String): image ID
 * view (String, optional): render view

Usage

``` javascript
v2.image.get('108559295', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.image.search"/>
#### v2.image.search(options, callback)

Search images.

Options - [Official Documentation](https://developers.shutterstock.com/api/v2/image/search)

 * query (String, optional): query string
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

And many more, see options for more details.

Usage

``` javascript
v2.image.search('donkey', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.video.list"/>
#### v2.video.list(options, callback)

Get details for multiple videos.

Options - [Official Documentation](https://developers.shutterstock.com/api/v2/video/list)

 * id (String[]): video IDs
 * view (String, optional): render view

Usage

``` javascript
v2.video.list(['108559295', '143051491'], function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.video.get"/>
#### v2.video.get(options, callback)

Get details for a specified video.

Options - [Official Documentation](https://developers.shutterstock.com/api/v2/video/get)

 * id (String): video ID
 * view (String, optional): render view

Usage

``` javascript
v2.image.get('5869544', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.video.search"/>
#### v2.video.search(options, callback)

Search videos.

Options - [Official Documentation](https://developers.shutterstock.com/api/v2/video/search)

 * query (String, optional): query string
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

And many more, see options for more details.

Usage

``` javascript
v2.video.search('donkey', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1"/>
### Class: shutterstock.v1(options)

This is a client for interacting with [API v1][v1].

Options

 * username (String): API username (not to be confused with customer username)
 * password (String): API password (key)
 * timeout (Number, default: 30000ms): number of milliseconds before request is aborted

Usage

``` javascript
var shutterstock = require('shutterstock');

var v1 = shutterstock.v1({
  username: 'api-username',
  password: 'api-password',
});
```

<a name="v1.echo"/>
#### v1.echo(options, callback)

Echo back specified options, used to check API connection and credentials.

Options - [Official Documentation](https://api.shutterstock.com/#testecho)

 * key (String): value

Usage

``` javascript
v1.image.echo({ hello: 'world' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.image.search"/>
#### v1.image.search(options, callback)

Search images.

Options - [Official Documentation](https://api.shutterstock.com/#imagessearch)

 * searchterm (String): search query
 * sort_method (String, default: popular): sort results
 * page_number (Number, default: 0): page to return
 * results_per_page (Number, default: 150): number of results to return per page
 * submitter_id (Number, optional): filter results by contributor ID

And many more, see options for more details.

Usage

``` javascript
v1.image.search('donkey', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.image.get"/>
#### v1.image.get(options, callback)

Get details for a specified image.

Options - [Official Documentation](https://api.shutterstock.com/#imagesimage_id)

 * image_id (Number): image ID

Usage

``` javascript
v1.image.get(108559295, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.image.similar"/>
#### v1.image.similar(options, callback)

Get images similar to a specified image.

Options - [Official Documentation](https://api.shutterstock.com/#imagesimage_idsimilar)

 * image_id (Number): image ID

Usage

``` javascript
v1.image.similar(108559295, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.image.categories"/>
#### v1.image.categories(callback)

Get all image categories.

[Official Documentation](https://api.shutterstock.com/#categories)

Usage

``` javascript
v1.image.categories(function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.auth"/>
#### v1.customer.auth(options, callback)

Authenticate as a user.

Options - [Official Documentation](https://api.shutterstock.com/#authcustomer)

 * email (String): user's email, required if username not specified
 * username (String): user's username, required if email not specified
 * password (String): user's password

Usage

``` javascript
v1.customer.auth({ username: 'john', password: 'secret' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.get"/>
#### v1.customer.get([options], callback)

Get user information.

Options - [Official Documentation](https://api.shutterstock.com/#customersusername)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username

Usage

``` javascript
v1.customer.get({ auth_token: token, username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.register"/>
#### v1.customer.register(options, callback)

Create new customer account.

Options - [Official Documentation](https://api.shutterstock.com/#customersusername)

 * email (String): new user's email address
 * username (String): new user's username
 * password (String): new user's password

Usage

``` javascript
v1.customer.register({ email: 'john@example.org', username: 'john', password: 'secret' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.images"/>
#### v1.customer.images([options], callback)

Get user's image downloads and the subscriptions under which they
were downloaded.

Options - [Official Documentation](https://api.shutterstock.com/#customersusernameimagesdownloads)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * image_id (Number, optional): get downloads for specific image
 * license (String, optional): filter results by license
 * page_number (Number, default: 0): page to return
 * page_size (Number, default: 40): number of results to return per page
 * sort_by (String, optional): sort results
 * sort_order (String, default: desc): sort order

Usage

``` javascript
v1.customer.images({ auth_token: token, username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.subscriptions"/>
#### v1.customer.subscriptions([options], callback)

Get customer subscriptions.

Options - [Official Documentation](https://api.shutterstock.com/#customersusernamesubscriptions)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username

Usage

``` javascript
v1.customer.subscriptions({ auth_token: token, username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.list"/>
#### v1.lightbox.list([options], callback)

Get customer lightboxes.

Options - [Official Documentation](https://api.shutterstock.com/#customersusernamelightboxes)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * exclude_empty (Boolean, default: false): filter empty lightboxes
 * exclude_images (Boolean, default: false): only return lightbox metadata

Usage

``` javascript
v1.lightbox.list({ auth_token: token, username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.get"/>
#### v1.lightbox.get(options, callback)

Get contents of lightbox.

Options - [Official Documentation](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * verification_code (String, optional): access lightbox without auth_token, get from [lightbox.publicUrl](#v1.lightbox.publicUrl)

Usage

``` javascript
v1.lightbox.get({ auth_token: token, lightbox_id: 123 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.publicUrl"/>
#### v1.lightbox.publicUrl(options, callback)

Return public URL for lightbox.

Options - [Official Documentation](https://api.shutterstock.com/#lightboxeslightbox_idpublic_url)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID

Usage

``` javascript
v1.lightbox.publicUrl({ auth_token: token, lightbox_id: 123 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.create"/>
#### v1.lightbox.create(options, callback)

Create new lightbox.

Options - [Official Documentation](https://api.shutterstock.com/#customersusernamelightboxes)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * lightbox_name (String): new lightbox name

Usage

``` javascript
v1.lightbox.create({ auth_token: token, username: 'john', lightbox_name: 'Animals' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.update"/>
#### v1.lightbox.update(options, callback)

Update lightbox.

Options - [Official Documentation](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * lightbox_name (String): updated lightbox name

Usage

``` javascript
v1.lightbox.update({ auth_token: token, lightbox_id: 123, lightbox_name: 'Animals' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.destroy"/>
#### v1.lightbox.destroy(options, callback)

Delete lightbox.

Options - [Official Documentation](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID

Usage

``` javascript
v1.lightbox.destroy({ auth_token: token, lightbox_id: 123 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.add"/>
#### v1.lightbox.add(options, callback)

Add image to lightbox.

Options - [Official Documentation](https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * image_id (Number): image ID to add to lightbox

Usage

``` javascript
v1.lightbox.add({ auth_token: token, lightbox_id: 123, image_id: 108559295 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.remove"/>
#### v1.lightbox.remove(options, callback)

Remove image from lightbox.

Options - [Official Documentation](https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * image_id (Number): image ID to remove from lightbox

Usage

``` javascript
v1.lightbox.remove({ auth_token: token, lightbox_id: 123, image_id: 108559295 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.video.search"/>
#### v1.video.search(options, callback)

Search videos.

Options - [Official Documentation](https://api.shutterstock.com/#videossearch)

 * searchterm (String): search query
 * sort_method (String, default: popular): sort results
 * page_number (Number, default: 0): page to return
 * results_per_page (Number, default: 150): number of results to return per page
 * submitter_id (Number, optional): filter results by contributor ID

Usage

``` javascript
v1.video.search('donkey', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.video.get"/>
#### v1.video.get(options, callback)

Get details for a specified video.

Options - [Official Documentation](https://api.shutterstock.com/#videosvideo_id)

 * video_id (Number): video ID

Usage

``` javascript
v1.video.get(6061547, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

## Todo

 * All of v2
 * `POST /subscriptions/<subscription_id>/images/<image_id>/sizes/<size>`
 * `POST /subscriptions/<subscription_id>/videos/<video_id>/sizes/<size>`

## License

This work is licensed under the MIT License (see the LICENSE file).

[v2]: https://developers.shutterstock.com/
[v1]: https://api.shutterstock.com/
