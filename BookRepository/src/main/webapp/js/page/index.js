$(function() {
	 var books = new BookCollection();
     var pagerModel = new PagerModel({
         pagerUrl: "/bookrepository/api/pager",
         collectionUrl: "/bookrepository/api/books",
         collection: books
     });

     var pagerView = new PagerView({
         model: pagerModel,
         el: document.getElementById("pager")
    });

     var modelDialog = null;
     window.showModel = function(no) {
        ResourceManager.get().fetch("resource/ShowBook.template", function(url, resource) {
            if ( modelDialog == null ) {
                  modelDialog  = new ModelDialog({
                     el: document.body,
                     dialogTemplate: resource
                 });
            }
         var foundBooks = books.where({ no: no });
         modelDialog.show({ model: foundBooks[0].toJSON() });
        } , function(url, xhr) { errorView.handle(null, xhr); });
    }

    var formModel = new FormModel({ submitUrl: "/bookrepository/api/register" });
    var registerDialog = null;
    window.showRegisterDialog = function() {
        ResourceManager.get().fetch("resource/RegisterBook.template", function(url, resource) {
            if ( registerDialog == null ) {
                registerDialog = new RegisterDialog({
                    el: document.body,
                    registerFormTemplate: resource,
                    model: formModel
                  });
                registerDialog.model.on("submit.success", function() { alert("register success!"); });
            }
            registerDialog.show();
        }, function(url, xhr) { errorView.handle(null, xhr); });
    }
     var errorView = new ErrorView({
         el: document.getElementById("error"),
         models: [pagerView.model, books, formModel]
     });

     ResourceManager.get().fetch("resource/TableRow.template", function(url, resource) {
         var collectionTable = new CollectionTable({
             rowTemplate: resource,
             collection: books,
             el: document.getElementById("collectionTable")
         });
        pagerModel.refresh();
     }, function(url, xhr) {
        errorView.handle(null, xhr);
     });
});