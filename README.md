# Shutterstock [![Build Status](https://secure.travis-ci.org/silas/node-shutterstock.png?branch=master)](http://travis-ci.org/silas/node-shutterstock)

This is a Node.js [Shutterstock API][v2] client.

 * [Usage](#usage)
 * [Documentation](#documentation)
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
   * [v2.audio.list](#v2.audio.list)
   * [v2.audio.get](#v2.audio.get)
   * [v2.audio.search](#v2.audio.search)
   * [v2.contributor.get](#v2.contributor.get)
   * [v2.contributor.listSets](#v2.contributor.listSets)
   * [v2.contributor.getSetItems](#v2.contributor.getSetItems)
   * [v2.image.categories](#v2.image.categories)
   * [v2.image.list](#v2.image.list)
   * [v2.image.get](#v2.image.get)
   * [v2.image.recommendations](#v2.image.recommendations)
   * [v2.image.search](#v2.image.search)
   * [v2.image.similar](#v2.image.similar)
   * [v2.video.list](#v2.video.list)
   * [v2.video.get](#v2.video.get)
   * [v2.video.search](#v2.video.search)
   * [v2.video.similar](#v2.video.similar)
 * [shutterstock.v1](#v1)
   * [v1.echo](#v1.echo)
   * [v1.image.search](#v1.image.search)
   * [v1.image.get](#v1.image.get)
   * [v1.image.similar](#v1.image.similar)
   * [v1.image.categories](#v1.image.categories)
   * [v1.image.download](#v1.image.download)
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
   * [v1.video.download](#v1.video.download)

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
 * accessToken (String, optional): OAuth2 access token
 * timeout (Number, default: 30000): number of milliseconds before request is aborted

Usage

``` javascript
var shutterstock = require('shutterstock');

var v2 = shutterstock.v2({
  clientId: 'client-id',
  clientSecret: 'client-secret',
});
```

<a name="v2.audio.list"/>
#### v2.audio.list(options, callback)

Get details for multiple audio tracks.

Options - [Documentation](https://developers.shutterstock.com/api/v2/audio/list)

 * id (String[]): track IDs
 * view (String, optional): render view

Usage

``` javascript
v2.audio.list(['113011', '15326'], function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.audio.get"/>
#### v2.audio.get(options, callback)

Get details for a specified track.

Options - [Documentation](https://developers.shutterstock.com/api/v2/audio/get)

 * id (String): track ID
 * view (String, optional): render view

Usage

``` javascript
v2.audio.get('113011', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.audio.search"/>
#### v2.audio.search(options, callback)

Search tracks.

Options - [Documentation](https://developers.shutterstock.com/api/v2/audio/search)

 * query (String, optional): query string
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

And many more, see official documentation for more details.

Usage

``` javascript
v2.audio.search('beat', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.contributor.get"/>
#### v2.contributor.get(options, callback)

Get contributor informations.

Options - [Documentation](https://developers.shutterstock.com/api/v2/contributors/get)

  * id (String): contributor ID

Usage

``` javascript
v2.contributor.get('164782', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.contributor.listSets"/>
#### v2.contributor.listSets(options, callback)

List sets of contributor.

Options - [Documentation](https://developers.shutterstock.com/api/v2/contributors/listSets)

  * id (String): contributor ID

Usage

``` javascript
v2.contributor.listSets('164782', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.contributor.getSetItems"/>
#### v2.contributor.getSetItems(options, callback)

Get items of contributor's set.

Options - [Documentation](https://developers.shutterstock.com/api/v2/contributors/getSetItems)

  * contributor_id (String): contributor ID
  * id (String): Set ID

Usage

``` javascript
v2.contributor.getSetItems({contributor_id: '164782', id: '536307'}, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.image.categories"/>
#### v2.image.categories(callback)

Get all image categories.

[Documentation](https://developers.shutterstock.com/api/v2/image/categories)

Usage

``` javascript
v2.image.categories(function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.image.list"/>
#### v2.image.list(options, callback)

Get details for multiple images.

Options - [Documentation](https://developers.shutterstock.com/api/v2/image/list)

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

Options - [Documentation](https://developers.shutterstock.com/api/v2/image/get)

 * id (String): image ID
 * view (String, optional): render view

Usage

``` javascript
v2.image.get('108559295', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.image.recommendations"/>
#### v2.image.recommendations(options, callback)

Return recommendations for specified images.

Options - [Documentation](https://developers.shutterstock.com/api/v2/image/recommendations)

 * id (String[]): image IDs
 * max_items (Number, default: 20): number of results to return

And more, see official documentation for more details.

Usage

``` javascript
v2.image.recommendations(['108559295', '143051491'], function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.image.search"/>
#### v2.image.search(options, callback)

Search images.

Options - [Documentation](https://developers.shutterstock.com/api/v2/image/search)

 * query (String, optional): query string
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

And many more, see official documentation for more details.

Usage

``` javascript
v2.image.search('donkey', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.image.similar"/>
#### v2.image.similar(options, callback)

Get similar images.

Options - [Documentation](https://developers.shutterstock.com/api/v2/image/similar)

 * id (String, optional): image ID
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

Usage

``` javascript
v2.image.similar('108559295', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.video.list"/>
#### v2.video.list(options, callback)

Get details for multiple videos.

Options - [Documentation](https://developers.shutterstock.com/api/v2/video/list)

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

Options - [Documentation](https://developers.shutterstock.com/api/v2/video/get)

 * id (String): video ID
 * view (String, optional): render view

Usage

``` javascript
v2.video.get('5869544', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.video.search"/>
#### v2.video.search(options, callback)

Search videos.

Options - [Documentation](https://developers.shutterstock.com/api/v2/video/search)

 * query (String, optional): query string
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

And many more, see official documentation for more details.

Usage

``` javascript
v2.video.search('donkey', function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v2.video.similar"/>
#### v2.video.similar(options, callback)

Get similar videos.

Options - [Documentation](https://developers.shutterstock.com/api/v2/video/similar)

 * id (String, optional): video ID
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

Usage

``` javascript
v2.video.similar('4535879', function(err, data) {
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
 * timeout (Number, default: 30000): number of milliseconds before request is aborted

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

Options - [Documentation](https://api.shutterstock.com/#testecho)

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

Options - [Documentation](https://api.shutterstock.com/#imagessearch)

 * searchterm (String): search query
 * sort_method (String, default: popular): sort results
 * page_number (Number, default: 0): page to return
 * results_per_page (Number, default: 150): number of results to return per page
 * submitter_id (Number, optional): filter results by contributor ID

And many more, see official documentation for more details.

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

Options - [Documentation](https://api.shutterstock.com/#imagesimage_id)

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

Options - [Documentation](https://api.shutterstock.com/#imagesimage_idsimilar)

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

[Documentation](https://api.shutterstock.com/#categories)

Usage

``` javascript
v1.image.categories(function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.image.download"/>
#### v1.image.download(options, callback)

License image.

Options - [Documentation](http://api.shutterstock.com/#subscriptionssubscription_idimagesimage_idsizessize)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * subscription_id (Number): photo subscription ID
 * image_id (Number): image ID
 * size (String): image size
 * format (String): image format

And more, see official documentation for more details.

Usage

``` javascript
var opts = {
  image_id: 108559295,
  subscription_id: 123,
  size: 'huge',
  format: 'jpg',
};

v1.image.download(opts, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.auth"/>
#### v1.customer.auth(options, callback)

Authenticate as a user.

Options - [Documentation](https://api.shutterstock.com/#authcustomer)

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

Options - [Documentation](https://api.shutterstock.com/#customersusername)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username

Usage

``` javascript
v1.customer.get({ username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.register"/>
#### v1.customer.register(options, callback)

Create new customer account.

Options - [Documentation](https://api.shutterstock.com/#customersusername)

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

Options - [Documentation](https://api.shutterstock.com/#customersusernameimagesdownloads)

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
v1.customer.images({ username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.customer.subscriptions"/>
#### v1.customer.subscriptions([options], callback)

Get customer subscriptions.

Options - [Documentation](https://api.shutterstock.com/#customersusernamesubscriptions)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username

Usage

``` javascript
v1.customer.subscriptions({ username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.list"/>
#### v1.lightbox.list([options], callback)

Get customer lightboxes.

Options - [Documentation](https://api.shutterstock.com/#customersusernamelightboxes)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * exclude_empty (Boolean, default: false): filter empty lightboxes
 * exclude_images (Boolean, default: false): only return lightbox metadata

Usage

``` javascript
v1.lightbox.list({ username: 'john' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.get"/>
#### v1.lightbox.get(options, callback)

Get contents of lightbox.

Options - [Documentation](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * verification_code (String, optional): access lightbox without auth_token, get from [lightbox.publicUrl](#v1.lightbox.publicUrl)

Usage

``` javascript
v1.lightbox.get({ lightbox_id: 123 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.publicUrl"/>
#### v1.lightbox.publicUrl(options, callback)

Return public URL for lightbox.

Options - [Documentation](https://api.shutterstock.com/#lightboxeslightbox_idpublic_url)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID

Usage

``` javascript
v1.lightbox.publicUrl({ lightbox_id: 123 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.create"/>
#### v1.lightbox.create(options, callback)

Create new lightbox.

Options - [Documentation](https://api.shutterstock.com/#customersusernamelightboxes)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * lightbox_name (String): new lightbox name

Usage

``` javascript
v1.lightbox.create({ username: 'john', lightbox_name: 'Animals' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.update"/>
#### v1.lightbox.update(options, callback)

Update lightbox.

Options - [Documentation](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * lightbox_name (String): updated lightbox name

Usage

``` javascript
v1.lightbox.update({ lightbox_id: 123, lightbox_name: 'Animals' }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.destroy"/>
#### v1.lightbox.destroy(options, callback)

Delete lightbox.

Options - [Documentation](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID

Usage

``` javascript
v1.lightbox.destroy({ lightbox_id: 123 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.add"/>
#### v1.lightbox.add(options, callback)

Add image to lightbox.

Options - [Documentation](https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * image_id (Number): image ID to add to lightbox

Usage

``` javascript
v1.lightbox.add({ lightbox_id: 123, image_id: 108559295 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.lightbox.remove"/>
#### v1.lightbox.remove(options, callback)

Remove image from lightbox.

Options - [Documentation](https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * image_id (Number): image ID to remove from lightbox

Usage

``` javascript
v1.lightbox.remove({ lightbox_id: 123, image_id: 108559295 }, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.video.search"/>
#### v1.video.search(options, callback)

Search videos.

Options - [Documentation](https://api.shutterstock.com/#videossearch)

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

Options - [Documentation](https://api.shutterstock.com/#videosvideo_id)

 * video_id (Number): video ID

Usage

``` javascript
v1.video.get(6061547, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

<a name="v1.video.download"/>
#### v1.video.download(options, callback)

License video.

Options - [Documentation](http://api.shutterstock.com/#subscriptionssubscription_idvideosvideo_idsizessize)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * subscription_id (Number): footage subscription ID
 * video_id (Number): video ID
 * size (String): video size

And more, see official documentation for more details.

Usage

``` javascript
var opts = {
  video_id: 5869544,
  subscription_id: 123,
  size: 'hd',
};

v1.video.download(opts, function(err, data) {
  if (err) throw err;

  console.log(data);
});
```

## License

This work is licensed under the MIT License (see the LICENSE file).

[v2]: https://developers.shutterstock.com/
[v1]: https://api.shutterstock.com/
