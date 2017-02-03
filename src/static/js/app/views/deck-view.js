define(function(require, exports, module) {

var marionette = require("marionette");
var _ = require("underscore");

var CardView = require("./card-view").CardView;

var DeckView = marionette.CollectionView.extend({

	className: "js-cards-container card-container",

	childView: CardView,

	// adds onto render, instead of rewriting
	// need to call super if want to use render:

	initialize: function() {
	},

	onRender: function() {
	}
});

exports.DeckView = DeckView;

});