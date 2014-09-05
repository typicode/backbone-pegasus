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

__There's nothing else to change in your app__ and you don't even have to use backbone-pegasus for all your URLs. 

In fact, if a model or collection requests an URL that wasn't loaded by backbone-pegasus, it simply falls back to making the request using Backbone.

## Example

You can find a working app in the example directory and this is what you should get.

![](http://i.imgur.com/gT3DR18.png)

Obviously, in production you should concatenate your app scripts. However, what's important in this screenshot is that your data (the yellow bar) is being loaded:

* as soon as backbone-pegasus has finished loading
* while still loading the other scripts.

See also http://typicode.github.io/pegasus/ for other live examples of Pegasus.

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

_Another [custom router example](https://github.com/typicode/backbone-pegasus/blob/master/example/index.html#L37) can be found in the example directory._

You can also use a third-party library like [route-recognizer](https://github.com/tildeio/route-recognizer).
