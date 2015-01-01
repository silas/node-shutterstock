# Shutterstock

This is a Node.js [Shutterstock API][api] client.

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

api.image.get('108559295', function(err, image) {
  if (err) throw err;

  console.log(image);
});
```

## Documentation

 * [shutterstock.v2](#v2)
   * [v2.image.get](#v2.image.get)
   * [v2.image.search](#v2.image.search)
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

<a name="v2.image.get"/>
#### v2.image.get(options, callback)

Get details for a specified image.

[Options](https://developers.shutterstock.com/api/v2/image/get#get-parameters)

 * id (String): image ID
 * view (String, optional): render view

<a name="v2.image.search"/>
#### v2.image.search(options, callback)

Search images.

[Options](https://developers.shutterstock.com/api/v2/image/search)

 * query (String, optional): query string
 * page (Number, default: 1): page to return
 * per_page (Number, default: 20): number of results to return per page
 * sort (String, default: popular): sort results

And many more, see options for more details.

<a name="v1"/>
### Class: shutterstock.v1(options)

This is a client for interacting with [API v1][v1].

Options

 * username (String): API username (not to be confused with customer username)
 * password (String): API password (key)
 * timeout (Number, default: 30000ms): number of milliseconds before request is aborted

<a name="v1.echo"/>
#### v1.echo(options, callback)

Echo back specified options, used to check API connection and credentials.

[Options](https://api.shutterstock.com/#testecho)

 * key (String): value

<a name="v1.image.search"/>
#### v1.image.search(options, callback)

Search images.

[Options](https://api.shutterstock.com/#imagessearch)

 * searchterm (String): search query
 * sort_method (String, default: popular): sort results
 * page_number (Number, default: 0): page to return
 * results_per_page (Number, default: 150): number of results to return per page
 * submitter_id (Number, optional): filter results by contributor ID

And many more, see options for more details.

<a name="v1.image.get"/>
#### v1.image.get(options, callback)

Get details for a specified image.

[Options](https://api.shutterstock.com/#imagesimage_id)

 * image_id (Number): image ID

<a name="v1.image.similar"/>
#### v1.image.similar(options, callback)

Get images similar to a specified image.

[Options](https://api.shutterstock.com/#imagesimage_idsimilar)

 * image_id (Number): image ID

<a name="v1.image.categories"/>
#### v1.image.categories(callback)

Get all image categories.

<a name="v1.customer.auth"/>
#### v1.customer.auth(options, callback)

Authenticate as a user.

[Options](https://api.shutterstock.com/#authcustomer)

 * email (String): user's email, required if username not specified
 * username (String): user's username, required if email not specified
 * password (String): user's password

<a name="v1.customer.get"/>
#### v1.customer.get([options], callback)

Get user information.

[Options](https://api.shutterstock.com/#customersusername)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username

<a name="v1.customer.register"/>
#### v1.customer.register(options, callback)

Create new customer account.

[Options](https://api.shutterstock.com/#customersusername)

 * email (String): new user's email address
 * username (String): new user's username
 * password (String): new user's password

<a name="v1.customer.images"/>
#### v1.customer.images([options], callback)

Get user's image downloads and the subscriptions under which they
were downloaded.

[Options](https://api.shutterstock.com/#customersusernameimagesdownloads)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * image_id (Number, optional): get downloads for specific image
 * license (String, optional): filter results by license
 * page_number (Number, default: 0): page to return
 * page_size (Number, default: 40): number of results to return per page
 * sort_by (String, optional): sort results
 * sort_order (String, default: desc): sort order

<a name="v1.customer.subscriptions"/>
#### v1.customer.subscriptions([options], callback)

Get customer subscriptions.

[Options](https://api.shutterstock.com/#customersusernamesubscriptions)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username

<a name="v1.lightbox.list"/>
#### v1.lightbox.list([options], callback)

Get customer lightboxes.

[Options](https://api.shutterstock.com/#customersusernamelightboxes)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * exclude_empty (Boolean, default: false): filter empty lightboxes
 * exclude_images (Boolean, default: false): only return lightbox metadata

<a name="v1.lightbox.get"/>
#### v1.lightbox.get(options, callback)

Get contents of lightbox.

[Options](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * verification_code (String, optional): access lightbox without auth_token, get from [lightbox.publicUrl](#v1.lightbox.publicUrl)

<a name="v1.lightbox.publicUrl"/>
#### v1.lightbox.publicUrl(options, callback)

Return public URL for lightbox.

[Optional](https://api.shutterstock.com/#lightboxeslightbox_idpublic_url)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * username (String): user's username
 * lightbox_id (Number): lightbox ID

<a name="v1.lightbox.create"/>
#### v1.lightbox.create(options, callback)

Create new lightbox.

[Options](https://api.shutterstock.com/#customersusernamelightboxes)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_name (String): new lightbox name

<a name="v1.lightbox.update"/>
#### v1.lightbox.update(options, callback)

Update lightbox.

[Options](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * lightbox_name (String): updated lightbox name

<a name="v1.lightbox.destroy"/>
#### v1.lightbox.destroy(options, callback)

Delete lightbox.

[Options](https://api.shutterstock.com/#lightboxeslightbox_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID

<a name="v1.lightbox.add"/>
#### v1.lightbox.add(options, callback)

Add image to lightbox.

[Options](https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * image_id (Number): image ID to add to lightbox

<a name="v1.lightbox.remove"/>
#### v1.lightbox.remove(options, callback)

Remove image from lightbox.

[Options](https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id)

 * auth_token (String): authentication token, get from [customer.auth](#v1.customer.auth)
 * lightbox_id (Number): lightbox ID
 * image_id (Number): image ID to remove from lightbox

<a name="v1.video.search"/>
#### v1.video.search(options, callback)

Search videos.

[Options](https://api.shutterstock.com/#videossearch)

 * searchterm (String): search query
 * sort_method (String, default: popular): sort results
 * page_number (Number, default: 0): page to return
 * results_per_page (Number, default: 150): number of results to return per page
 * submitter_id (Number, optional): filter results by contributor ID

<a name="v1.video.get"/>
#### v1.video.get(options, callback)

Get details for a specified video.

[Options](https://api.shutterstock.com/#videosvideo_id)

 * video_id (Number): video ID

## Todo

 * All of v2
 * `POST /subscriptions/<subscription_id>/images/<image_id>/sizes/<size>`
 * `POST /subscriptions/<subscription_id>/videos/<video_id>/sizes/<size>`
 * [Nock](https://www.npmjs.org/package/nock) tests

## License

This work is licensed under the MIT License (see the LICENSE file).

[v2]: https://developers.shutterstock.com/
[v1]: https://api.shutterstock.com/
