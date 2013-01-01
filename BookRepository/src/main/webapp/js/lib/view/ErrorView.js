 var ErrorView = Backbone.View.extend({

 	initialize: function(args) {
		this.models = args.models;
		var me = this;
		this.models.forEach(function(model) {
			 me.listenTo(model, "error", me.handle); });
 	},

 	handle: function(model, xhr) {
 		var errorElem = document.createElement("DIV");
        var errorLine = this.createErrorLine(xhr.responseText);
 		errorElem.innerHTML = errorLine;
 		this.el.appendChild(errorElem);
 		this.el.style.display = "block";
	},

	createErrorLine: function(text) {
	    try {
            var errorResponse = JSON.parse(text);
            var isFormErrorJSON = errorResponse instanceof Object && errorResponse.action && errorResponse.message;
            if ( isFormErrorJSON ) {
                var errorLine = "action: " + errorResponse.action + ", message: " + errorResponse.message;
                return errorLine;
            }

            return text;
 		} catch(ex) {
 		    var isIgnorable = ex instanceof SyntaxError;
 		    if ( isIgnorable ) {
 		        return text;
 		    }

 		    throw ex;
 		}
	}
 });