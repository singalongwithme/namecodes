define(function(require, exports, module) {
	var backbone = require("backbone");
	var _ = require("underscore");

	var Card = backbone.Model.extend({

		defaults: {
			word: "",
			color: "#000"
		}

	});

	exports.Card = Card;
});