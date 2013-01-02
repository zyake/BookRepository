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

	 var modelDialog = new ModelDialog({
	     el: document.body,
		 dialogTemplate: document.getElementById("bookTemplate").innerHTML
	 });
	 window.showModel = function(no) {
		 var foundBooks = books.where({ no: no });
		 modelDialog.show({ model: foundBooks[0].toJSON() });
	 }

    var registerDialog = new RegisterDialog({
        el: document.body,
        registerFormTemplate: document.getElementById("registerTemplate").innerHTML,
        model: new FormModel({ submitUrl: "/bookrepository/api/register" })
      });
    window.showRegisterDialog = function() {
        registerDialog.show();
    }
    registerDialog.model.on("submit.success", function() { alert("register success!"); });

	 var errorView = new ErrorView({
		 el: document.getElementById("error"),
		 models: [pagerView.model, books, registerDialog.model]
	 });

	 pagerModel.refresh();
});