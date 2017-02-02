define(function(require, exports, module) {

var $ = require("jquery");
var backbone = require("backbone");
var marionette = require("marionette");
var app = require("app/app");

var AppController = marionette.Object.extend({

    initialize: function(){
        this.app = app;
    },

    default: function(){
    },
});

exports.AppController = AppController;

});