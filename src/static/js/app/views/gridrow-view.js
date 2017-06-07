define(function(require, exports, module) {

var backbone = require("backbone");
var marionette = require("marionette");
var _ = require("underscore");

var CardView = require("./card-view").CardView;

var GridRowView = marionette.CompositeView.extend({

	template: ".js-card-container",

	itemView: CardView,

	itemViewContainer: "div.row",

	initialize: function() {
		this.collection = new backbone.Collection(_.toArray(this.model.attributes));
	}
	
});

exports.GridRowView = GridRowView;

});