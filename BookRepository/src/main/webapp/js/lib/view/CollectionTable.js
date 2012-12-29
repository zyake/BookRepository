var CollectionTable = Backbone.View.extend({

	initialize: function(arg) {
		 this.listenTo(this.collection, "sync", this.render);
		 this.rowTemplate = _.template(arg.rowTemplate);
		 this.tbody = this.el.querySelector(".body");
	 },

	 render: function() {
		 var newTBodies = "";
		 var me = this;
		 this.collection.each(function(model) {
			 var newTBody = me.rowTemplate(model.toJSON());
			 newTBodies += newTBody;
		 });
		 this.tbody.innerHTML = newTBodies;
	 }
});