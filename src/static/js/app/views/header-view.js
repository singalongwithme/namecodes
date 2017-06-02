define(function(require, exports, module){
	var $ = require("jquery");
	var backbone = require("backbone");
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
			reset_btn: ".js-reset-btn",
			red_score: ".js-red-score",
			blue_score: ".js-blue-score"
		},

		events: {
			"keyup @ui.input": "filterDeck",
			"click @ui.spymaster": "enableSpymaster",
			"click @ui.reset_btn": "reset",
			"update:score": "updateScore"
		},

		templateHelpers: function() {
			return { 
				score: this.options.score,
				deck_is_shown: this.deck_is_shown 
			}
		},

		initialize: function() {
			var copy = Object.assign({}, this.options.score);

			this.words_list = this.options.words_list;
			this.score = copy;
			this.is_spymaster = false;

			backbone.on("update:score", this.onUpdateScore, this);

			_.bindAll(this, "filterDeck");
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
			this.resetScore();
		},

		onDeckCreated: function(deck) {
			this.triggerMethod("show:deck", deck);
		},

		enableSpymaster: function() {
			this.is_spymaster = !this.is_spymaster;
			this.triggerMethod("enable:spymaster");
		},

		onUpdateScore: function(el) {
			if (this.is_spymaster) {
				return;
			}

			var color = $(el).attr("data-color");
			if (color === "blue") {
				this.ui.blue_score.text(--this.score.blue);
			} else if (color === "red") {
				this.ui.red_score.text(--this.score.red);
			} else if (color === "black") {
				alert("game is over!");
				this.reset();
			}
		},

		reset: function() {
			this.resetHeader();
			backbone.trigger("reset:deck");
		},

		resetScore: function() {
			this.ui.blue_score.text(this.options.score.blue);
			this.ui.red_score.text(this.options.score.red);
			this.score = Object.assign({}, this.options.score);
		},

		resetHeader: function() {
			this.resetScore();
			this.ui.input.val('');
			this.filterDeck();
		}

	});

	exports.HeaderView = HeaderView;
});