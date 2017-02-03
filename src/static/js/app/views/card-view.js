define(function(require, exports, module) {
	var marionette = require('marionette');
	var CardTemplate = require("hbs!../templates/card");

	var CardView = marionette.ItemView.extend({
		
		tagName: "div",

		className: "card-row",

		template: CardTemplate,

		ui: {
			card: ".js-card"
		},

		events: {
			"click @ui.card": "hasBeenSelected"
		},

		initialize: function() {
			_.bindAll(this, "hasBeenSelected");
		},

		hasBeenSelected: function(e) {
			e.preventDefault();

			$(e.currentTarget).addClass("has-been-selected");
		}


		
	});

	exports.CardView = CardView;
});