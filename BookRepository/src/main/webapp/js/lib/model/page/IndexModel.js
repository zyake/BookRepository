 var IndexModel = Backbone.Model.extend({

    URL: {
         SHOW_BOOK_TEMPLATE: "resource/ShowBook.template",
         REGISTER_BOOK_TEMPLATE: "resource/SubmitBook.template",
         TABLE_ROW_TEMPLATE: "resource/TableRow.template"
    },

    initialize: function() {
        var me = this;
        this.resourceManager = ResourceManager.get();
        this.repository = new IndexComponentConfigurator().configure();
        this.resourceManager.fetch(this.URL.TABLE_ROW_TEMPLATE,
            function(url, resource) {
                 me.repository.get("collectionTable", { resource: resource });
                 me.repository.get("pagerView")
                 me.repository.get("pagerModel").refresh();
            },
            function(url, xhr) {
                me.repository.get("errorView").handle(null, xhr);
        });
     },

    showModel: function(no) {
         var me = this;
         this.resourceManager.fetch(
             this.URL.SHOW_BOOK_TEMPLATE,
             function(url, resource) {
                 var foundBooks =  me.repository.get("pagerModel").collection.where({ no: no });
                 var modelDialog = me.repository.get("modelDialog", { resource: resource });
                 modelDialog.show({ model: foundBooks[0].toJSON() });
             } ,
             function(url, xhr) {
                 me.repository.get("errorView").handle(null, xhr);
         });
    },

    showRegisterDialog: function() {
        var me = this;
        this.resourceManager.fetch(
             this.URL.REGISTER_BOOK_TEMPLATE,
             function(url, resource) {
                 var registerForm = _.template(resource)({ title: "Register" });
                 var registerDialog = me.repository.get("registerDialog", { resource: registerForm });
                 registerDialog.show();
             },
             function(url, xhr) {
                 me.repository.get("errorView").handle(null, xhr);
         });
    },

    showModificationDialog: function(no) {
         var me = this;
         this.resourceManager.fetch(
              this.URL.REGISTER_BOOK_TEMPLATE,
              function(url, resource) {
                  var updateForm = _.template(resource)({ title: "Update" });

                  var targetModel = me.repository.get("bookCollection").where({ no: no })[0];
                  var targetJson = targetModel.toJSON();

                  var updateDialog = me.repository.get("updateDialog", { resource: updateForm });
                  var targetForm = updateDialog.formView.el

                  updateDialog.model.on("sync", function() { FormUtils.get().mapToForm(targetJson, targetForm); });
                  updateDialog.show();
              },
              function(url, xhr) {
                  me.repository.get("errorView").handle(null, xhr);
          });
    }
 });