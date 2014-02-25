# Shutterstock.js

This is a Shutterstock API client for JavaScript.

## Usage

``` javascript
var shutterstock = require('shutterstock');

var api = shutterstock.v1({
  user: 'api-user',
  key: 'api-key',
});

api.categories(function(err, res) {
  if (err) throw err;

  console.log(res.body);
});
```

## License

This work is licensed under the MIT License (see the LICENSE file).
