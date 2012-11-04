function MapperMock() {
	this.records = [];
}
MapperMock.prototype = new AbstractJsonMapper();
MapperMock.prototype.mapToElement = function(json, addTo) {
	var record = {
			name: "mapToElement",
			args: [json, addTo]
	};
	this.records.push(record);
}

asyncTest("fetch01", function() {
	// 事前準備
	var mapperMock = new MapperMock();
	var target = new ElementLoader(div, mapperMock);
	var listener = {
		completeState: false,
		loadCompleted: function() {
			start();
			equal(1, mapperMock.records.length);
			var record = mapperMock.records[0];
			equal("NAME1", record.args[0].name);
			equal("VALUE1", record.args[0].value);
		},
		errorOccured: function() {
			start();
			ok(false);
		}
	};
	var div = document.createElement("DIV");
	target.successedListener.push(listener);
	target.failedListener.push(listener);
	
	// テスト
	target.fetch("resources/test.js");
});