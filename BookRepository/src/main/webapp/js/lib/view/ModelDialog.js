 var ModelDialog = Backbone.View.extend({

	 initialize:  function(arg) {
		this.dialogTemplate = _.template(arg.dialogTemplate);
	 },

	 render: function(model) {
		 var cover = document.createElement("DIV");
		 cover.className = "cover";

		 var dialog = document.createElement("DIV");
		 dialog.className = "dialog";
		 dialog.innerHTML = this.dialogTemplate(model);
		 var closeButton = dialog.querySelector(".close");
		 closeButton.addEventListener("click", function() {
			 document.body.removeChild(dialog);
			 document.body.removeChild(cover);
		  });

		 document.body.appendChild(cover);
		 document.body.appendChild(dialog);
	 }
 });