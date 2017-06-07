require.config({

  baseUrl: "src/static/js",

  paths : {
    "marionette": "vendor/backbone/marionette",
    "underscore": "vendor/underscore/underscore"
  },

   packages: [
        {
            location: "app",
            name: "app"
        },

        {
            location: "vendor/jquery",
            name: "jquery",
            main:"jquery"
        },

        {
            location: "vendor/backbone",
            name: "backbone",
            main:"backbone"
        },

        {
            location: "vendor/require/hbs",
            name: "hbs",
            main:"hbs"
        },

        {
          location: "vendor/",
          name: "seedrandom",
          main: "seedrandom"
        }
    ],

    map: {
        "*": {
            "handlebars": "hbs/handlebars",
        },
    },

  hbs: {
        templateExtension : "html",
        // if disableI18n is `true` it won"t load locales and the i18n helper
        // won"t work as well.
        disableI18n : true,
        helperDirectory: "app/shared/hbs"
  },

  shim : {

    "backbone": {
        "deps": ["jquery", "underscore"],
        "exports": "Backbone"
    },

    "backbone/stickit" : {
      "deps" : ["backbone"],
      "exports" : "Stickit"
    },

    "jquery/mockjax": {
        "deps": ["jquery"],
        "exports": "jquery"
    },
  },

  // introduced in requirejs 2.1.11, helps Backbone along.
  // http://jrburke.com/2014/02/16/requirejs-2.1.11-released/
  wrapShim: true,

});
