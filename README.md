# Shutterstock API

This is a Shutterstock API client for Node.

## Usage

``` javascript
var shutterstock = require('shutterstock');

var api = shutterstock({
  user: 'api-user',
  key: 'api-key',
});

api.getCategories(function(err, res, body) {
  if (err) throw err;
  console.log(body);
});
```

## License

This work is licensed under the MIT License (see the LICENSE file).
