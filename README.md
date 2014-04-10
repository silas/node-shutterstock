# Shutterstock.js

This is a Shutterstock API client for JavaScript.

## Install

``` console
$ npm install shutterstock --save
```

## Usage

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

## License

This work is licensed under the MIT License (see the LICENSE file).
