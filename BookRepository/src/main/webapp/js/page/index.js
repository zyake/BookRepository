/**
 * imports backbone.js;
 * imports jquery.js;
 * imports underscore.js;
 */
$(function() {
	 var books = new BookCollection();

	 var collectionTable = new CollectionTable({
		 rowTemplate: document.getElementById("rowTemplate").innerHTML,
		 collection: books,
		 el: document.getElementById("collectionTable")
	 });

	 var pagerView = new PagerView({
		 model: new PagerModel(),
		 collection: books,
		 el: document.getElementById("pager")
	});

	 modelDialog = new ModelDialog({
		 dialogTemplate: document.getElementById("bookTemplate").innerHTML
	 });

	 window.showModel = function(no) {
		 var foundBooks = books.where({ no: no });
		 modelDialog.render(foundBooks[0].toJSON());
	 }

	 pagerView.fetch(1);
});