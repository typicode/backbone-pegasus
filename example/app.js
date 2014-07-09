// Just a simple Backbone.Marionette app
// Fake data provided by http://jsonplaceholder.typicode.com

var Post = Backbone.Model.extend({
  urlRoot: 'http://jsonplaceholder.typicode.com/posts'
})

var Posts = Backbone.Collection.extend({
  url: 'http://jsonplaceholder.typicode.com/posts',
  model: Post
})

var PostView = Backbone.Marionette.ItemView.extend({
  el: '#app',
  template: "#post-template",
  modelEvents: {
    sync: 'render'
  }
})

var PostsView = Backbone.Marionette.ItemView.extend({
  el: '#app',
  template: "#posts-template",
  collectionEvents: {
    sync: 'render'
  }
})

var Router = Backbone.Router.extend({
  routes: {
    'posts': 'list',
    'posts/:id': 'show',
    '': 'list'
  },

  list: function() {
    var posts = new Posts()
    new PostsView({collection: posts})
    posts.fetch()
  },

  show: function(id) {
    var post = new Post({id: id})
    new PostView({model: post})
    post.fetch()
  }
})

var app = new Backbone.Marionette.Application()

app.addInitializer(function() {
  new Router()
  Backbone.history.start()
})
