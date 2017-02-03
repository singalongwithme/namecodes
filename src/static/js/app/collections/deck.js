define(function(require, exports, module) {
	var backbone = require("backbone");
	var Card = require("../models/card").Card;

	var Deck = backbone.Collection.extend({

		model: Card

	});

	exports.Deck = Deck;
});