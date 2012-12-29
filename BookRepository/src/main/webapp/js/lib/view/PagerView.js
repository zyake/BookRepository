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
		 if ( !this.model.canGoBack() ) {
			 return;
		 }

		 var prevIndex = this.model.get("currentIndex") - 1;
		 this.model.refresh(prevIndex);
	 },

	 goNext: function() {
		 if ( !this.model.canGoNext() ) {
			 return;
		 }

		 var nextIndex = this.model.get("currentIndex") + 1;
		 this.model.refresh(nextIndex);
	 }
 });