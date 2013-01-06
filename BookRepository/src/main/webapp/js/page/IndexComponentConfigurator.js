function IndexComponentConfigurator() {
}

IndexComponentConfigurator.prototype.configure = function() {
    var URL = {
         PAGER: "/bookrepository/api/pager",
         COLLECTION: "/bookrepository/api/books",
         REGISTER_BOOK: "/bookrepository/api/register"
    };

    var compRepository = ComponentRepository.create();
    compRepository.addFactory("pagerModel", function(arg) {
         var pagerModel = new PagerModel({
             pagerUrl: URL.PAGER,
             collectionUrl: URL.COLLECTION,
             collection: new BookCollection()
         });

         return pagerModel;
    });

    compRepository.addFactory("pagerView", function(arg) {
         var pagerView = new PagerView({
             model: this.get("pagerModel"),
             el: document.getElementById("pager")
        });

        return pagerView;
    });

    compRepository.addFactory("errorView", function() {
        var errorView = new ErrorView({
             el: document.getElementById("error"),
             models: [this.get("pagerModel"), this.get("pagerModel").collection]
         });

         return errorView;
    });

    compRepository.addFactory("modelDialog", function(arg) {
          var modelDialog  = new ModelDialog({
             el: document.body,
             dialogTemplate: arg.resource
         });

         return modelDialog;
    });

    compRepository.addFactory("registerDialog", function(arg) {
        var registerDialog = new RegisterDialog({
            el: document.body,
            registerFormTemplate: arg.resource,
            model: new FormModel({ submitUrl: URL.REGISTER_BOOK })
          });
        this.get("errorView").addErrorListener(registerDialog.model);
        registerDialog.model.on("submit.success", function() { alert("register success!"); });

        return registerDialog;
    });

    compRepository.addFactory("collectionTable", function(arg) {
         var collectionTable = new CollectionTable({
             rowTemplate: arg.resource,
             collection: this.get("pagerModel").collection,
             el: document.getElementById("collectionTable")
         });

         return collectionTable;
    });

    return compRepository;
}