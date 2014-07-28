# Shutterstock.js

This is a Shutterstock API client for Node.js.

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
   * [v1.customer.imageDownloads](#v1.customer.imageDownloads)
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

This is a client for interacting with [api.shutterstock.com](http://api.shutterstock.com).

`options` is an object with client settings.

Options

 * `username`: API username (not to be confused with customer username). Required.
 * `password`: API password (key). Required.
 * `timeout`: An integer specifying the maximum number of seconds a request can take before timing out. Defaults to 30.

<a name="v1.echo"/>
#### v1.echo(options, callback)

Echo back specified options, used to check API connection and credentials.

`options` is an object of test key-value pairs.

`callback(err, data)` is the result of the request.

Data

Echos request options.

http://api.shutterstock.com/#testecho

<a name="v1.image.search"/>
#### v1.image.search(options, callback)

Search images.

`options` can be a string `searchterm` or an object containing search parameters.

`callback(err, data)` is the result of the request.

http://api.shutterstock.com/#imagessearch

<a name="v1.image.get"/>
#### v1.image.get(options, callback)

Get details for a specified image.

`options` can be an `image_id` or an object.

`callback(err, data)` is the result of the request.

http://api.shutterstock.com/#imagesimage_id

<a name="v1.image.similar"/>
#### v1.image.similar(options, callback)

Get images similar to a specified image.

http://api.shutterstock.com/#imagesimage_idsimilar

<a name="v1.image.categories"/>
#### v1.image.categories(callback)

Get all image categories.

http://api.shutterstock.com/#categories

<a name="v1.customer.auth"/>
#### v1.customer.auth(options, callback)

Authenticate as a customer.

http://api.shutterstock.com/#authcustomer

<a name="v1.customer.get"/>
#### v1.customer.get([options], callback)

Get customer information.

http://api.shutterstock.com/#customersusername

<a name="v1.customer.register"/>
#### v1.customer.register(options, callback)

Create new customer account.

http://api.shutterstock.com/#customersusername

<a name="v1.customer.imageDownloads"/>
#### v1.customer.imageDownloads([options], callback)

Get customer image downloads and the subscriptions under which they
were downloaded.

http://api.shutterstock.com/#customersusernameimagesdownloads

<a name="v1.customer.subscriptions"/>
#### v1.customer.subscriptions([options], callback)

Get customer subscriptions.

http://api.shutterstock.com/#customersusernamesubscriptions

<a name="v1.lightbox.list"/>
#### v1.lightbox.list([options], callback)

Get customer lightboxes.

http://api.shutterstock.com/#customersusernamelightboxes

<a name="v1.lightbox.get"/>
#### v1.lightbox.get(options, callback)

Get contents of lightbox.

http://api.shutterstock.com/#lightboxeslightbox_id

<a name="v1.lightbox.publicUrl"/>
#### v1.lightbox.publicUrl(options, callback)

Return public URL for lightbox.

http://api.shutterstock.com/#lightboxeslightbox_idpublic_url

<a name="v1.lightbox.create"/>
#### v1.lightbox.create(options, callback)

Create new lightbox.

http://api.shutterstock.com/#customersusernamelightboxes

<a name="v1.lightbox.update"/>
#### v1.lightbox.update(options, callback)

Update lightbox.

http://api.shutterstock.com/#lightboxeslightbox_id

<a name="v1.lightbox.destroy"/>
#### v1.lightbox.destroy(options, callback)

Delete lightbox.

http://api.shutterstock.com/#lightboxeslightbox_id

<a name="v1.lightbox.add"/>
#### v1.lightbox.add(options, callback)

Add image to lightbox.

http://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id

<a name="v1.lightbox.remove"/>
#### v1.lightbox.remove(options, callback)

Remove image from lightbox.

http://api.shutterstock.com/#lightboxeslightbox_idimagesimage_id

<a name="v1.video.search"/>
#### v1.video.search(options, callback)

Search videos.

http://api.shutterstock.com/#videossearch

<a name="v1.video.get"/>
#### v1.video.get(options, callback)

Get details for a specified video.

http://api.shutterstock.com/#videosvideo_id

## Todo

 * `POST /subscriptions/<subscription_id>/images/<image_id>/sizes/<size>`
 * `POST /subscriptions/<subscription_id>/videos/<video_id>/sizes/<size>`

## License

This work is licensed under the MIT License (see the LICENSE file).
