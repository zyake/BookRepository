var FormModel = Backbone.Model.extend({

    defaults: function() {
        return {
            selections: {}
        };
    },

    initialize: function(arg) {
        this.submitUrl = arg.submitUrl;
    },

    send: function(form) {
        var isValidForm = form.checkValidity();
        if ( !isValidForm ) {
            return false;
        }

        var me = this;
        var xhr = this.createXhr();
        xhr.open("POST", this.submitUrl);
        var formData = new FormData(form);
        xhr.send(formData);
        
        return true;
    },

    createXhr: function() {
        var me = this;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function() {
            me.trigger("submit.success");
        });

        xhr.addEventListener("error", function() {
            me.trigger("error", xhr);
        });

        return xhr;
    }
});