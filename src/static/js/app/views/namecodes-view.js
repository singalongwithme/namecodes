define(function(require, exports, module) {
	var marionette = require('marionette');
	var _ = require("underscore");
	var app = require("app/app");

	var NamecodesTemplate = require("hbs!../templates/namecodes");

	var Namecodes = marionette.CompositeView.extend({
		
		className: "contact row",

		template: NamecodesTemplate,

		initialize: function() {
			this.app = app;
		}

	});

	exports.Namecodes = Namecodes;
});