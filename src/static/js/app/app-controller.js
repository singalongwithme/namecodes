define(function(require, exports, module) {

var $ = require("jquery");
var backbone = require("backbone");
var marionette = require("marionette");
var app = require("app/app");

var Namecodes = require("app/views/namecodes-view").Namecodes;

var AppController = marionette.Object.extend({

    initialize: function(){
        this.app = app;
    },

    default: function(){
    	// initialize main marionette app here
    	this.app.main.show(new Namecodes());
    },
});

exports.AppController = AppController;

});