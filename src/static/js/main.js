define(function(require, exports, module){

var $ = require("jquery");
var marionette = require("marionette");
var renderer = require("app/renderer");
var app = require("app/app");
var AppRouter = require("app/app-router").AppRouter;

require("backbone/stickit");

app.appRouter = new AppRouter();

app.addRegions({
    main: ".js-main"
});

app.addInitializer(function() {
    Backbone.history.start({
        pushState: true
    });
});

$(function(){ app.start(); });

});
