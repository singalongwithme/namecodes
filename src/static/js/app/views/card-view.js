define(function(require, exports, module) {
	var marionette = require("marionette");
	var backbone = require("backbone");
	var CardTemplate = require("hbs!../templates/card");

	var CardView = marionette.ItemView.extend({
		
		className: "col",

		template: CardTemplate,

		ui: {
			card: ".js-card"
		},

		events: {
			"click @ui.card": "cardClickHandler"
		},

		initialize: function() {
			backbone.on("reset:deck", this.reset, this);

			_.bindAll(this, "hasBeenSelected");
		},

		hasBeenSelected: function(e) {
			e.preventDefault();

			$(e.currentTarget).toggleClass("has-been-selected");
		},

		triggerUpdateScore: function(e) {
			backbone.trigger("update:score", e.currentTarget);
		},

		cardClickHandler: function(e) {
			this.hasBeenSelected(e);
			this.triggerUpdateScore(e);
		},

		reset: function(e) {
			this.$el.find(".js-card").removeClass("has-been-selected");
		}
	});

	exports.CardView = CardView;
});