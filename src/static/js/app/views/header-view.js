define(function(require, exports, module){
	var $ = require("jquery");
	var marionette = require('marionette');
	var _ = require("underscore");
	var app = require("app/app");

	var HeaderTemplate = require("hbs!../templates/header");

	var HeaderView = marionette.ItemView.extend({

		className: "js-controls",

		template: HeaderTemplate,

		initialize: function() {
			this.wordsList = this.options.wordsList;
		},

		serializeData: function() {
			return {
				wordsList: this.wordsList
			}
		},

		onRender: function() {
		},

		onBeforeRender: function() {
			console.log(this.wordsList);
		}

	});

	exports.HeaderView = HeaderView;
});