 var ModelDialog = Dialog.extend({

	 initialize:  function(arg) {
	    Dialog.prototype.initialize.apply(this, arg);
		this.dialogTemplate = _.template(arg.dialogTemplate);
	 },

	 retrieveContent: function(arg) {
		 var content = this.dialogTemplate(arg.model);
         this.dialog.innerHTML = content;
	 }
 });