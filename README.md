# backbone-pegasus ![Bower](https://img.shields.io/bower/v/backbone-pegasus.svg?style=flat)]

> Improve your Backbone app loading time with [Pegasus](https://github.com/typicode/pegasus).

Using backbone-pegasus, you can start loading data while still loading Backbone and other scripts.

## Show me

![](http://i.imgur.com/gT3DR18.png)

_Obviously, in production you should concatenate your app scripts._

However, what's important in this screenshot is that  data (yellow bar) is being loaded:

* as soon as `backbone-pegasus.js` has finished loading
* in parallel with the other scripts

You can find a working app in the example directory.

See also http://typicode.github.io/pegasus/ for other live examples.

## Usage

```html
<script src="backbone-pegasus.js"></script>
<script>

  // Preload URL(s)
  BackbonePegasus.get('http://api.example.com/users');
  BackbonePegasus.get('http://api.example.com/posts');
  
</script>

<script src="jquery.js"></script>
<script src="underscore.js"></script>
<script src="backbone.js"></script>
<script src="app.js"></script>
<script>

  // Set up backbone-pegasus
  BackbonePegasus.setup();
  
  // Start your app
  app.start();

</script>
```

__There's nothing else to change in your app.__

`BackbonePegasus.setup()` modifies `Backbone.sync()` so that it checks for URLs loaded by backbone-pegasus. If there's no match, it falls back to `Backbone.sync()` original method.

## Routing

To keep things light and fast, backbone-pegasus doesn't come with a router.

But depending on your needs, you can write your own:

```javascript
var base = 'http://api.example.com';

// Will preload URLs based on hash
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

## Support

All modern browsers and IE8+
