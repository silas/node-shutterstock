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

var api = shutterstock.v1({
  username: 'api-username',
  password: 'api-password',
});

api.image.categories(function(err, categories) {
  if (err) throw err;

  console.log(categories);
});
```

## Documentation

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

<a name="v1"/>
### Class: shutterstock.v1(options)

This is a client for interacting with [api.shutterstock.com][api].

Options

 * username (String): API username (not to be confused with customer username)
 * password (String): API password (key)
 * timeout (Number, default: 30000ms): number of milliseconds before request is aborted

<a name="v1.echo"/>
#### v1.echo(options, callback)

Echo back specified options, used to check API connection and credentials.

`options` is an object of test key-value pairs.

`callback(err, data)` is the result of the request.

Data

Echos request options.

https://api.shutterstock.com/#testecho

<a name="v1.image.search"/>
#### v1.image.search(options, callback)

Search images.

`options` can be a string `searchterm` or an object containing search parameters.

`callback(err, data)` is the result of the request.

https://api.shutterstock.com/#imagessearch

<a name="v1.image.get"/>
#### v1.image.get(options, callback)

Get details for a specified image.

`options` can be an `image_id` or an object.

`callback(err, data)` is the result of the request.

https://api.shutterstock.com/#imagesimage_id

<a name="v1.image.similar"/>
#### v1.image.similar(options, callback)

Get images similar to a specified image.

https://api.shutterstock.com/#imagesimage_idsimilar

<a name="v1.image.categories"/>
#### v1.image.categories(callback)

Get all image categories.

https://api.shutterstock.com/#categories

<a name="v1.customer.auth"/>
#### v1.customer.auth(options, callback)

Authenticate as a customer.

https://api.shutterstock.com/#authcustomer

<a name="v1.customer.get"/>
#### v1.customer.get([options], callback)

Get customer information.

https://api.shutterstock.com/#customersusername

<a name="v1.customer.register"/>
#### v1.customer.register(options, callback)

Create new customer account.

https://api.shutterstock.com/#customersusername

<a name="v1.customer.images"/>
#### v1.customer.images([options], callback)

Get customer image downloads and the subscriptions under which they
were downloaded.

https://api.shutterstock.com/#customersusernameimagesdownloads

<a name="v1.customer.subscriptions"/>
#### v1.customer.subscriptions([options], callback)

Get customer subscriptions.

https://api.shutterstock.com/#customersusernamesubscriptions

<a name="v1.lightbox.list"/>
#### v1.lightbox.list([options], callback)

Get customer lightboxes.

https://api.shutterstock.com/#customersusernamelightboxes

<a name="v1.lightbox.get"/>
#### v1.lightbox.get(options, callback)

Get contents of lightbox.

https://api.shutterstock.com/#lightboxeslightbox_id

<a name="v1.lightbox.publicUrl"/>
#### v1.lightbox.publicUrl(options, callback)

Return public URL for lightbox.

https://api.shutterstock.com/#lightboxeslightbox_idpublic_url

<a name="v1.lightbox.create"/>
#### v1.lightbox.create(options, callback)

Create new lightbox.

https://api.shutterstock.com/#customersusernamelightboxes

<a name="v1.lightbox.update"/>
#### v1.lightbox.update(options, callback)

Update lightbox.

https://api.shutterstock.com/#lightboxeslightbox_id

<a name="v1.lightbox.destroy"/>
#### v1.lightbox.destroy(options, callback)

Delete lightbox.

https://api.shutterstock.com/#lightboxeslightbox_id

<a name="v1.lightbox.add"/>
#### v1.lightbox.add(options, callback)

Add image to lightbox.

https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id

<a name="v1.lightbox.remove"/>
#### v1.lightbox.remove(options, callback)

Remove image from lightbox.

https://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id

<a name="v1.video.search"/>
#### v1.video.search(options, callback)

Search videos.

https://api.shutterstock.com/#videossearch

<a name="v1.video.get"/>
#### v1.video.get(options, callback)

Get details for a specified video.

https://api.shutterstock.com/#videosvideo_id

## Todo

 * `POST /subscriptions/<subscription_id>/images/<image_id>/sizes/<size>`
 * `POST /subscriptions/<subscription_id>/videos/<video_id>/sizes/<size>`
 * [Nock](https://www.npmjs.org/package/nock) tests
 * Document all options

## License

This work is licensed under the MIT License (see the LICENSE file).

[api]: https://api.shutterstock.com/
