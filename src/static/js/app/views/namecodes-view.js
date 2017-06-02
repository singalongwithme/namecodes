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

			$.get("data.json")
				.done(onGetWordsSuccess.bind(this))
				.fail(onGetWordsFail);

			function onGetWordsSuccess(words) {
				var score = {
					blue: 9,
					red: 8
				}

				this.words_list = words.data;

				this.showChildView("header", new HeaderView({ words_list: this.words_list, score: score }));
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

			var BLUE_LIMIT = 9;
			var RED_LIMIT = 8;
			var BLACK_LIMIT = 1;
			var WHITE_LIMIT = 7;

			var colors = {
				'blue': BLUE_LIMIT,
				'red': RED_LIMIT,
				'black': BLACK_LIMIT,
				'white': WHITE_LIMIT
			}

			var keys = [];

			for (key in colors) {
				for (var i = 0; i < colors[key]; i++) {
					keys.push(key);
				}
			}

			var mapped = _.map(list, function(value, index) {
				var random_index = Math.floor(Math.random() * keys.length);
				var color_key = keys[random_index];

				keys.splice(random_index, 1);

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