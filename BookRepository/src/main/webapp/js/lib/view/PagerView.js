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
			 url: "books"
		});

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