var BookModel = Backbone.Model.extend({
	defaults: function() {
		return {
			no: null,
			name: "-",
			publisher: "-",
			parchaseDate: "-",
			genre: "-",
			rank: "-",
			readingState: "-",
			comment: ""
		};
	}
});

var BookCollection = Backbone.Collection.extend({model: BookModel});
