 var ErrorView = Backbone.View.extend({

 	initialize: function(args) {
		this.models = args.models;
		var me = this;
		this.models.forEach(function(model) {
			 me.listenTo(model, "error", me.handle);});
 	},

 	handle: function(model, xhr) {
 		var errorResponse = JSON.parse(xhr.responseText);
 		var errorElem = document.createElement("DIV");
 		var errorLine = "action: " + errorResponse.action + ", message: " + errorResponse.message;
 		errorElem.innerHTML = errorLine;
 		this.el.appendChild(errorElem);
 		this.el.style.display = "block";
	}
 });