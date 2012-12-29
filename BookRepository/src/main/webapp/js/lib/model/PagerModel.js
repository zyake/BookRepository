var PagerModel = Backbone.Model.extend({

	initialize: function(arg) {
		this.collection = arg.collection;
		this.collectionUrl = arg.collectionUrl;
		this.pagerUrl = arg.pagerUrl;
	 },

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
	},

	canGoBack: function() {
		 var currentIndex = this.get("currentIndex");
		 var canGoBack = currentIndex > 1;

		 return canGoBack;
	},

	canGoNext: function() {
		 var currentIndex = this.get("currentIndex");
		 var amountPageSize = this.getAmountPageSize();
		 var reachToEnd = currentIndex == amountPageSize;

		 return !reachToEnd;
	},

	refresh: function() {
		var currentIndex = this.get("currentIndex");
		 var maxPerPageSize = this.get("maxPerPageSize");
		 this.collection.fetch({
			 data: { size: maxPerPageSize, index: currentIndex },
			 url: this.collectionUrl
		});

		 var serverItemSize = this.get("serverItemSize");
		 this.fetch({
			 data: {
				 serverItemSize: serverItemSize,
				 currentIndex: currentIndex,
				 maxPerPageSize: maxPerPageSize
		 	},
			url: this.pagerUrl
		});
	}
});
