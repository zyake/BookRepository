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

      var formModel = new FormModel({
        submitUrl: "/bookrepository/api/register",
        el: registerForm
      });
      var registerForm = new FormView({
        el: document.getElementById("registerForm"),
        model: formModel
      });

    var registerDialog = document.getElementById("registerDialog");
    window.closeRegisterDialog = function() {
        registerDialog.style.display = "none";
    }
    window.showRegisterDialog = function() {
        registerDialog.style.display = "block";
        formModel.fetch({ url: "/bookrepository/api/register" });
    }

	 var errorView = new ErrorView({
		 el: document.getElementById("error"),
		 models: [pagerView.model, books, formModel]
	 });

	 pagerModel.refresh();
});