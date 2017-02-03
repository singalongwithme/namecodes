define(function(require, exports, module){
	var $ = require("jquery");
	var marionette = require('marionette');
	var _ = require("underscore");
	var seed = require("seedrandom");
	var app = require("app/app");

	var HeaderTemplate = require("hbs!../templates/header");

	var HeaderView = marionette.ItemView.extend({

		className: "js-controls",

		template: HeaderTemplate,

		ui: {
			input: ".js-input",
			spymaster: ".js-spymaster-btn",
			reset: ".js-reset-btn"
		},

		events: {
			"keyup @ui.input": "filterDeck"
		},

		initialize: function() {
			this.wordsList = this.options.wordsList;

			_.bindAll(this, 'filterDeck');
		},

		filterDeck: function(e) {
			var gameDeck = [];

			var DECK_SIZE = 25;

			Math.seedrandom(this.ui.input.val());

			for (var i = 0; i < DECK_SIZE; i++) {
				var index = Math.floor(Math.random() * this.wordsList.length);
				gameDeck.push(this.wordsList[index]);
			}

			this.onDeckCreated(gameDeck);
		},

		onDeckCreated: function(deck) {
			this.triggerMethod("show:deck", deck);
		}

	});

	exports.HeaderView = HeaderView;
});