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
  user: 'api-user',
  password: 'api-password',
});

api.getCategories(function(err, categories) {
  if (err) throw err;

  console.log(categories);
});
```

## Documentation

 * [shutterstock.v1](#v1)
   * [v1.echo](#v1.echo)
   * [v1.searchImages](#v1.searchImages)
   * [v1.getImage](#v1.getImage)
   * [v1.getSimilarImages](#v1.getSimilarImages)
   * [v1.getCategories](#v1.getCategories)
   * [v1.authCustomer](#v1.authCustomer)
   * [v1.registerCustomer](#v1.registerCustomer)
   * [v1.getCustomer](#v1.getCustomer)
   * [v1.getCustomerImageDownloads](#v1.getCustomerImageDownloads)
   * [v1.getCustomerSubscriptions](#v1.getCustomerSubscriptions)
   * [v1.getCustomerLightboxes](#v1.getCustomerLightboxes)
   * [v1.searchVideos](#v1.searchVideos)
   * [v1.getVideo](#v1.getVideo)

<a name="v1"/>
### Class: shutterstock.v1(options)

This is a client for interacting with [api.shutterstock.com](http://api.shutterstock.com).

`options` is an object with client settings.

Options

 * `user`: API username (not to be confused with customer username). Required.
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

<a name="v1.searchImages"/>
#### v1.searchImages(options, callback)

Search images.

`options` can be a string `searchterm` or an object containing search parameters.

`callback(err, data)` is the result of the request.

http://api.shutterstock.com/#imagessearch

<a name="v1.getImage"/>
#### v1.getImage(options, callback)

Get details for a specified image.

`options` can be an `image_id` or an object.

`callback(err, data)` is the result of the request.

http://api.shutterstock.com/#imagesimage_id

<a name="v1.getSimilarImages"/>
#### v1.getSimilarImages(options, callback)

Get images similar to a specified image.

http://api.shutterstock.com/#imagesimage_idsimilar

<a name="v1.getCategories"/>
#### v1.getCategories(callback)

Get all image categories.

http://api.shutterstock.com/#categories

<a name="v1.auth"/>
#### v1.auth(options, callback)

Authenticate as a customer.

http://api.shutterstock.com/#authcustomer

<a name="v1.getCustomer"/>
#### v1.getCustomer([options], callback)

Get customer information.

http://api.shutterstock.com/#customersusername

<a name="v1.register"/>
#### v1.register(options, callback)

Create new customer account.

http://api.shutterstock.com/#customersusername

<a name="v1.getImageDownloads"/>
#### v1.getImageDownloads([options], callback)

Get customer image downloads and the subscriptions under which they
were downloaded.

http://api.shutterstock.com/#customersusernameimagesdownloads

<a name="v1.getSubscriptions"/>
#### v1.getSubscriptions([options], callback)

Get customer subscriptions.

http://api.shutterstock.com/#customersusernamesubscriptions

<a name="v1.getLightboxes"/>
#### v1.getLightboxes([options], callback)

Get customer lightboxes.

http://api.shutterstock.com/#customersusernamelightboxes

<a name="v1.searchVideos"/>
#### v1.searchVideos(options, callback)

Search videos.

http://api.shutterstock.com/#videossearch

<a name="v1.getVideo"/>
#### v1.getVideo(options, callback)

Get details for a specified video.

http://api.shutterstock.com/#videosvideo_id

## Todo

 * `GET /lightboxes/<lightbox_id>`
 * `POST /lightboxes/<lightbox_id>`
 * `DELETE /lightboxes/<lightbox_id>`
 * `PUT /lightboxes/<lightbox_id>/images/<image_id>`
 * `DELETE /lightboxes/<lightbox_id>/images/<image_id>`
 * `GET /lightboxes/<lightbox_id>/public_url`
 * `POST /customers/<username>/lightboxes`
 * `POST /subscriptions/<subscription_id>/images/<image_id>/sizes/<size>`
 * `POST /subscriptions/<subscription_id>/videos/<video_id>/sizes/<size>`

## License

This work is licensed under the MIT License (see the LICENSE file).
