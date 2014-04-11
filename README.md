# Shutterstock.js

This is a Shutterstock API client for JavaScript.

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

var api = shutterstock.v1({
  user: 'api-user',
  key: 'api-key',
});

api.categories(function(err, categories) {
  if (err) throw err;

  console.log(categories);
});
```

## Documentation

 * [shutterstock.v1](#class-shutterstockv1options)
   * [v1.resources](#v1resourcescallback)
   * [v1.testEcho](#v1testechooptions-callback)
   * [v1.imageSearch](#v1imagesearchoptions-callback)
   * [v1.image](#v1imageoptions-callback)
   * [v1.imageSimilar](#v1imagesimilaroptions-callback)
   * [v1.categories](#v1categoriescallback)
   * [v1.authCustomer](#v1authcustomeroptions-callback)
   * [v1.customer](#v1customeroptions-callback)
   * [v1.customerImageDownloads](#v1customerimagedownloadsoptions-callback)
   * [v1.customerSubscriptions](#v1customerlightboxesoptions-callback)
   * [v1.customerLightboxes](#v1customerlightboxesoptions-callback)

### Class: shutterstock.v1(options)

This is a client for interacting with [api.shutterstock.com](http://api.shutterstock.com).

#### v1.testEcho(options, callback)

Echo back specified options, used to check API connection and credentials.

http://api.shutterstock.com/#testecho

#### v1.imageSearch(options, callback)

Search images.

http://api.shutterstock.com/#imagessearch

#### v1.image(options, callback)

Get details for a specified image.

http://api.shutterstock.com/#imagesimage_id

#### v1.imageSimilar(options, callback)

Get images similar to a specified image.

http://api.shutterstock.com/#imagesimage_idsimilar

#### v1.categories(callback)

Get all image categories.

http://api.shutterstock.com/#categories

#### v1.authCustomer(options, callback)

Login as a customer.

http://api.shutterstock.com/#authcustomer

#### v1.customer([options], callback)

Get customer information.

http://api.shutterstock.com/#customersusername

#### v1.customerImageDownloads([options], callback)

Get customer image downloads and the subscriptions under which they
were downloaded.

http://api.shutterstock.com/#customersusernameimagesdownloads

#### v1.customerSubscriptions([options], callback)

Get customer subscriptions.

http://api.shutterstock.com/#customersusernamesubscriptions

#### v1.customerLightboxes([options], callback)

Get customer lightboxes.

http://api.shutterstock.com/#customersusernamelightboxes

## License

This work is licensed under the MIT License (see the LICENSE file).
