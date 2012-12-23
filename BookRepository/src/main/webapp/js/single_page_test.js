/**
 * imports backbone.js;
 * imports jquery.js;
 * imports underscore.js;
 */
$(function(){
	var BookModel = Backbone.Model.extend({
		defaults: function() {
			return {
				no: null,
				name: "-",
				publisher: "-",
				parchaseDate: "-",
				genre: "-",
				rank: "-",
				readingState: "-",
				comment: ""
			};
		}
	});
	var BookCollection = Backbone.Collection.extend({model: BookModel});

	var PagerModel = Backbone.Model.extend({
		defaults: function() {
			return {
				serverItemSize: 0,
				maxPerPageSize: 10,
				currentIndex: 1
			}
		},
		getAmountPageSize: function() {
			 var amountPageSize =  Math.ceil(this.get("serverItemSize") / this.get("maxPerPageSize"));
			 return amountPageSize;
		}
	});

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

	 var PagerView = Backbone.View.extend({
		 events: {
			 "click .goBack": "goBack",
			 "click .goNext": "goNext"
		 },
		 initialize: function() {
			 this.listenTo(this.model, "sync", this.render);
			 this.pagerState = this.el.querySelector(".pagerState");
		 },
		 render: function() {
			 var amountPageSize = this.model.getAmountPageSize();
			 var currentIndex = this.model.get("currentIndex");
			 this.pagerState.innerHTML = currentIndex + "/" + amountPageSize;
		 },
		 goBack: function() {
			 var currentIndex = this.model.get("currentIndex");
			 var isStartIndex = currentIndex == 1;
			 if ( isStartIndex ) {
				 return;
			 }

			 var prevIndex = currentIndex - 1;
			 this.fetch(prevIndex);
		 },
		 goNext: function() {
			 var currentIndex = this.model.get("currentIndex");
			 var amountPageSize = this.model.getAmountPageSize();
			 var reachToEnd = currentIndex == amountPageSize;
			 if ( reachToEnd ) {
				 return;
			 }

			 var nextIndex = currentIndex + 1;
			 this.fetch(nextIndex);
		 },
		 fetch: function(index) {
			 var maxPerPageSize = this.model.get("maxPerPageSize");
			 this.collection.fetch({
				 data: { size: maxPerPageSize, index: index },
				 url: "books" });

			 var serverItemSize = this.model.get("serverItemSize");
			 this.model.fetch({
				 data: {
				 serverItemSize: serverItemSize,
				 currentIndex: index,
				 maxPerPageSize: maxPerPageSize
			 	},
				url: "pager"
			});
		 }
	 });

	 var ModelDialog= Backbone.View.extend({
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

	 var books = new BookCollection();

	 var collectionTable = new CollectionTable({
		 rowTemplate: document.getElementById("rowTemplate").innerHTML,
		 collection: books,
		 el: document.getElementById("collectionTable")
	 });

	 var pagerView = new PagerView({
		 model: new PagerModel(),
		 collection: books,
		 el: document.getElementById("pager")
	});

	 modelDialog = new ModelDialog({
		 dialogTemplate: document.getElementById("bookTemplate").innerHTML
	 });

	 window.showModel = function(no) {
		 var foundBooks = books.where({ no: no });
		 modelDialog.render(foundBooks[0].toJSON());
	 }

	 pagerView.fetch(1);
});