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

### Class: shutterstock.v1(options)

#### v1.resources(callback)

A meta-resource which provides information about all available resources.

http://api.shutterstock.com/#resources

#### v1.testEcho(options, callback)

Allows developers to test their code by verifying that inputs are received
by the API and outputs are received by the client.

http://api.shutterstock.com/#testecho

#### v1.authCustomer(options, callback)

Allows the client to login as a registered downloading customer.

http://api.shutterstock.com/#authcustomer

#### v1.categories(callback)

Displays all categories and their category ids.

http://api.shutterstock.com/#categories

#### v1.customer([options], callback)

Display registered user information.

http://api.shutterstock.com/#customersusername

#### v1.customerImageDownloads([options], callback)

Displays customer image downloads and the subscriptions under which they
were downloaded.

http://api.shutterstock.com/#customersusernameimagesdownloads

#### v1.customerLightboxes([options], callback)

Displays customer lightboxes.

http://api.shutterstock.com/#customersusernamelightboxes

#### v1.customerSubscriptions([options], callback)

Displays information about customer subscriptions including start and end
dates, number of downloads remaining, and available sizes. For enterprise
subscriptions, also returns price per download.

http://api.shutterstock.com/#customersusernamesubscriptions

#### v1.image(options, callback)

Displays details for a specific image.

http://api.shutterstock.com/#imagesimage_id

#### v1.imageSimilar(options, callback)

Searches for images similar to the given image.

http://api.shutterstock.com/#imagesimage_idsimilar

#### v1.imageRecommendationKeywords(options, callback)

Provides keyword recommendations based on the set of image IDs provided.

http://api.shutterstock.com/#imagesrecommendationskeywords

#### v1.imageSearch(options, callback)

Searches for images that meet provided criteria.

http://api.shutterstock.com/#imagessearch

## License

This work is licensed under the MIT License (see the LICENSE file).
