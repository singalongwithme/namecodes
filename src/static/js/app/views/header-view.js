define(function(require, exports, module){
	var $ = require("jquery");
	var marionette = require('marionette');
	var _ = require("underscore");
	var seed = require("seedrandom");
	var app = require("app/app");

	var HeaderTemplate = require("hbs!../templates/header");
	var Deck = require("../collections/deck").Deck;

	var HeaderView = marionette.ItemView.extend({

		className: "js-controls",

		template: HeaderTemplate,

		ui: {
			input: ".js-input",
			spymaster: ".js-spymaster-btn",
			reset: ".js-reset-btn"
		},

		events: {
			"keyup @ui.input": "filterDeck",
			"click @ui.spymaster": "enableSpymaster"
		},

		initialize: function() {
			this.words_list = this.options.words_list;

			_.bindAll(this, 'filterDeck');
		},

		filterDeck: function(e) {
			var gameDeck = [];

			var DECK_SIZE = 25;

			Math.seedrandom(this.ui.input.val());

			for (var i = 0; i < DECK_SIZE; i++) {
				var index = Math.floor(Math.random() * this.words_list.length);
				gameDeck.push(this.words_list[index]);
			}

			this.onDeckCreated(gameDeck);
		},

		onDeckCreated: function(deck) {
			this.triggerMethod("show:deck", deck);
		},

		enableSpymaster: function() {
			this.triggerMethod("enable:spymaster");
		}

	});

	exports.HeaderView = HeaderView;
});