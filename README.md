# Shutterstock API

``` javascript
var shutterstock = require('shutterstock');

var api = shutterstock({
  user: 'api-user',
  key: 'api-key',
  version: '1',
});

api.getCategories(function(err, res, body) {
  if (err) throw err;
  console.log(body);
});
```
