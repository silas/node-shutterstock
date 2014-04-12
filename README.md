# Shutterstock.js

This is a Shutterstock API client for Node.js.

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

api.getCategories(function(err, categories) {
  if (err) throw err;

  console.log(categories);
});
```

## Documentation

 * [shutterstock.v1](#class-shutterstockv1options)
   * [v1.echo](#v1testechooptions-callback)
   * [v1.searchImages](#v1imagesearchoptions-callback)
   * [v1.getImage](#v1imageoptions-callback)
   * [v1.getSimilarImages](#v1imagesimilaroptions-callback)
   * [v1.getCategories](#v1categoriescallback)
   * [v1.authCustomer](#v1authcustomeroptions-callback)
   * [v1.getCustomer](#v1customeroptions-callback)
   * [v1.getCustomerImageDownloads](#v1customerimagedownloadsoptions-callback)
   * [v1.getCustomerSubscriptions](#v1customerlightboxesoptions-callback)
   * [v1.getCustomerLightboxes](#v1customerlightboxesoptions-callback)

### Class: shutterstock.v1(options)

This is a client for interacting with [api.shutterstock.com](http://api.shutterstock.com).

#### v1.echo(options, callback)

Echo back specified options, used to check API connection and credentials.

http://api.shutterstock.com/#testecho

#### v1.searchImages(options, callback)

Search images.

http://api.shutterstock.com/#imagessearch

#### v1.getImage(options, callback)

Get details for a specified image.

http://api.shutterstock.com/#imagesimage_id

#### v1.getSimilarImages(options, callback)

Get images similar to a specified image.

http://api.shutterstock.com/#imagesimage_idsimilar

#### v1.getCategories(callback)

Get all image categories.

http://api.shutterstock.com/#categories

#### v1.authCustomer(options, callback)

Login as a customer.

http://api.shutterstock.com/#authcustomer

#### v1.getCustomer([options], callback)

Get customer information.

http://api.shutterstock.com/#customersusername

#### v1.getCustomerImageDownloads([options], callback)

Get customer image downloads and the subscriptions under which they
were downloaded.

http://api.shutterstock.com/#customersusernameimagesdownloads

#### v1.getCustomerSubscriptions([options], callback)

Get customer subscriptions.

http://api.shutterstock.com/#customersusernamesubscriptions

#### v1.getCustomerLightboxes([options], callback)

Get customer lightboxes.

http://api.shutterstock.com/#customersusernamelightboxes

## License

This work is licensed under the MIT License (see the LICENSE file).
