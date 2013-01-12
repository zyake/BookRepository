 var SubmitDialog = Dialog.extend({

    initialize: function(arg) {
        Dialog.prototype.initialize.apply(this, arg);
        this.dialog.innerHTML = arg.registerFormTemplate;
        var form = this.dialog.querySelector("#registerForm");
        this.formView = this.createFormView(this.model, form);
    },

    retrieveContent: function(arg) {
        this.model.fetch({url: this.model.get("url") });
    },

    createFormView: function(model, el) {
        return new FormView({ model: model, el: el });
    }
 });
