//
// Disclaimer: using byte saving techniques
//
// a   url (naming it a, beacause it will be reused to store callbacks)
// xhr placeholder to avoid using var
function pegasus(a, xhr) {
  xhr = new XMLHttpRequest();
  
  // Open url
  xhr.open('GET', a);

  // Reuse a to store callbacks
  a = [];

  // cb placeholder to avoid using var
  xhr.onreadystatechange = xhr.then = function(onSuccess, onError, cb) {

    // Test if onSuccess is a function or a load event
    if (onSuccess.call) a = [,onSuccess, onError];

    // Test if request is complete
    if (xhr.readyState == 4) {

      // index will be:
      // 0 if undefined
      // 1 if status is between 200 and 399
      // 2 if status is over
      cb = a[0|xhr.status / 200];

      // Safari doesn't support xhr.responseType = 'json'
      // so the response is parsed
      if (cb) cb(JSON.parse(xhr.responseText, xhr));
    }
  };

  // Send
  xhr.send();

  // Return request
  return xhr;
}

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

            // Fill with returned data
            var method = options.reset ? 'reset' : 'set';
            model[method](data);

            // Trigger sync event
            model.trigger('sync', model, data, options);
          },
          // Error
          function(data) {
            model.trigger('error', model, data, options);
          }
        );

      } else {
        
        // No request found for URL, use the original sync method
        BackboneSync(method, model, options);
      }

    } else {

      // Not a GET or no URL, use the original sync method
      BackboneSync(method, model, options);

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