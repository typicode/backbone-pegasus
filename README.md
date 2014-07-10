# backbone-pegasus [![Bower version](https://badge.fury.io/bo/backbone-pegasus.svg)](http://badge.fury.io/bo/backbone-pegasus)

> Improve your Backbone app loading time with [Pegasus](https://github.com/typicode/pegasus).

Using backbone-pegasus, you can start loading data while loading Backbone and other scripts.

## Usage

```html
<script src="backbone-pegasus.js"></script>
<script>

  // Start loading models and collections data
  BackbonePegasus.get('http://api.example.com/songs');
  BackbonePegasus.get('http://api.example.com/users');
  
</script>

<script src="jquery.js"></script>
<script src="underscore.js"></script>
<script src="backbone.js"></script>
<script src="app.js"></script>
<script>

  $(function() {
  
    // Set up backbone-pegasus
    BackbonePegasus.setup();
  
    // Start your app
    app.start();

  });

</script>
```

There's nothing else to change in your app.

## Routing

To keep things light and fast, backbone-pegasus doesn't come with a router.

But depending on your needs, you can write your own:

```javascript
var base = 'http://api.example.com';

switch(window.location.hash) {
  case '#posts':
    BackbonePegasus.get(base + '/posts');
    break;
  case '#users':
    BackbonePegasus.get(base + '/users');
    break;
  default:
    BackbonePegasus.get(base + '/posts');
}
```

_Another [example](https://github.com/typicode/backbone-pegasus/blob/master/example/index.html#L37) can be found in the example directory._

Or you can use a third-party library like [route-recognizer](https://github.com/tildeio/route-recognizer).
