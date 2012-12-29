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

	 var pagerModel = new PagerModel({
		 pagerUrl: "/bookrepository/api/pager",
		 collectionUrl: "/bookrepository/api/books",
		 collection: books
	 });

	 var pagerView = new PagerView({
		 model: pagerModel,
		 el: document.getElementById("pager")
	});

	 modelDialog = new ModelDialog({
		 dialogTemplate: document.getElementById("bookTemplate").innerHTML
	 });

	 window.showModel = function(no) {
		 var foundBooks = books.where({ no: no });
		 modelDialog.render(foundBooks[0].toJSON());
	 }

	 var errorView = new ErrorView({
		 el: document.getElementById("error"),
		 models: [pagerView.model, books]
	 });

	 pagerModel.refresh(1);
});