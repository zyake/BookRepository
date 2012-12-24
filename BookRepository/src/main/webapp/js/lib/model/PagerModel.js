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
