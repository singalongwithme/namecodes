define(function(require, exports, module) {
	var marionette = require('marionette');
	var CardTemplate = require("hbs!../templates/card");

	var CardView = marionette.ItemView.extend({
		
		tagName: "div",

		className: "card-row",

		template: CardTemplate
		
	});

	exports.CardView = CardView;
});