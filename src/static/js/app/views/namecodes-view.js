define(function(require, exports, module) {
	var $ = require("jquery");
	var marionette = require('marionette');
	var _ = require("underscore");
	var app = require("app/app");

	var NamecodesTemplate = require("hbs!../templates/namecodes");
	var HeaderView = require("./header-view").HeaderView;
	var Deck = require("../collections/deck").Deck;
	var DeckView = require("./deck-view").DeckView;

	var Namecodes = marionette.LayoutView.extend({
		
		className: "contact row",

		template: NamecodesTemplate,

		ui: {
			deck: ".js-deck"
		},

		regions: {
			header: ".js-header",
			deck: ".js-deck",
			footer: ".js-footer"
		},

		childEvents: {
			"show:deck": "onChildShowDeck",
			"enable:spymaster": "onEnableSpymaster"
		},


		initialize: function() {
			this.app = app;

			this.getWordsList();
		},

		getWordsList: function() {

			// _.bindAll(this, "onGetWordsSuccess");

			$.get("data.json")
				.done(onGetWordsSuccess.bind(this))
				.fail(onGetWordsFail);

			function onGetWordsSuccess(words) {
				this.words_list = words.data;

				this.showChildView("header", new HeaderView({ words_list: this.words_list }));
			}

			function onGetWordsFail(words) {
				alert('failed to get words from data.json');
			}
		},

		onChildShowDeck: function(childView, list) {
			var deck = this.mapFilteredDeck(list);

			this.showChildView("deck", new DeckView({ collection: deck }));
		},

		mapFilteredDeck: function(list) {

			var BLUE_LIMIT = 8;
			var RED_LIMIT = 7;
			var BLACK_LIMIT = 1;
			var WHITE_LIMIT = 9;

			var colors = {
				'blue': {
					limit: BLUE_LIMIT
				},
				'red': {
					limit: RED_LIMIT
				},
				'black': {
					limit: BLACK_LIMIT
				},
				'white': {
					limit: WHITE_LIMIT
				}
			}

			var keys = Object.keys(colors);

			var mapped = _.map(list, function(value, index) {
				var random_index = Math.floor(Math.random() * keys.length);
				var color_key = keys[random_index];
				var color = colors[color_key];

				color['limit'] -= 1;

				if (color['limit'] === 0) {
					keys.splice(random_index, 1);
				}

				return { 
					word: value,
					color: color_key
				};
			});

			return new Deck(mapped);
		},

		onEnableSpymaster: function(e) {
			this.ui.deck.toggleClass("is-spymaster");
		}
		
	});

	exports.Namecodes = Namecodes;
});