var BookModel = Backbone.Model.extend({
	defaults: function() {
		return {
			no: 0,
			revision: 0,
			name: "-",
			publisher: "-",
			purchaseDate: "-",
			genre: "-",
			rank: "-",
			readingState: "-",
			comment: ""
		};
	}
});

var BookCollection = Backbone.Collection.extend({model: BookModel});
