/**
 * imports backbone.js;
 * imports jquery.js;
 * imports underscore.js;
 */
$(function(){
	var Book = Backbone.Model.extend({
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
		},
		initialize: function() {
		}
	});
	var Books = Backbone.Collection.extend({model: Book});
	var books = new Books();

	 var TestView = Backbone.View.extend({
		 el: document.getElementById("view"),
		 initialize: function() {
			 this.listenTo(books, "sync", this.render);
		 },
		 render: function() {
			 var html = "loaded!<ul>";
			 books.each(function(book) {
				 var  no = book.get("no");
				 html += "<li>" + no + "</li>";
			 });
			 this.el.innerHTML = html + "</ul>";
		 }
	 });

	 var view = new TestView();
	 var request = { startIndex: 0, fetchSize: 10 };
	books.fetch({
		url: "books",
		data: request
	});
});