//
// BackbonePegasus
//
(function(){
  // Used to store Pegasus requests
  var requests = {};

  // Used to store Backbone.sync
  var BackboneSync;

  // Custom sync function
  // --------------------

  // If a model or a collection wants to make a GET request to a URL and there's
  // already a Pegasus request for that URL
  //
  // Then use the corresponding request promise
  //
  // Else delegate to the original Backbone.sync method

  function sync(method, model, options) {
    var url;

    // Requested URL
    if (model.url) {
      if (typeof model.url === 'string') {
        url = model.url;
      } else {
        url = model.url();
      }
    }

    if (method === 'read' && url) {

      var request = requests[url];

      if (request) {

        request.then(
          // Success
          function(data) {
            // Delete from requests so that subsequent requests go through
            // Backbone original sync method
            delete requests[url];

            var method = options.reset ? 'reset' : 'set';
            model[method](data);

            if (options && options.success) {
              options.success(data);
            }

            model.trigger('sync', model, data, options);
          },
          // Error
          function(data, xhr) {
            if (options && options.error) {
              options.error(xhr);
            }

            model.trigger('error', model, xhr, options);
          }
        );
        return request;

      } else {
        // No request found for URL, use the original sync method
        return BackboneSync(method, model, options);
      }

    } else {

      // Not a GET or no URL, use the original sync method
      return BackboneSync(method, model, options);

    }
  }

  window.BackbonePegasus = {
    // Make a request and store the promise
    get: function(url) {
      requests[url] = pegasus(url);
    },

    // Replace Backbone.sync with BackbonePegasus custom sync
    setup: function() {
      BackboneSync  = Backbone.sync;
      Backbone.sync = sync;
    }
  };
})();
