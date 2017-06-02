define(function(require, exports, module) {

var backbone = require("backbone");
var marionette = require("marionette");
var _ = require("underscore");

var CardView = require("./card-view").CardView;
var DeckTemplate = require("hbs!../templates/deck");

var DeckView = marionette.CompositeView.extend({

	className: "js-cards-container card-container",

	template: DeckTemplate,

	childView: CardView,

	initialize: function() {
	},

});

exports.DeckView = DeckView;

});