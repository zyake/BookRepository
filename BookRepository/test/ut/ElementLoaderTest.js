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

/**
 * 正常系
 * 読み込み完了時
 */
asyncTest("fetch01", function() {
	// 事前準備
  var div = document.createElement("DIV");
	var mapperMock = new MapperMock();
	var target = ElementLoader.create(div, mapperMock, "../resources/test.js");
	var listener = {
		completeState: false,
		loadCompleted: function() {
			equal(1, mapperMock.records.length);
			var record = mapperMock.records[0];
			equal("NAME1", record.args[0].name);
			equal("VALUE1", record.args[0].value);
		},
		errorOccured: function() {
			ok(false, "errorOccured");
		}
	};
	var div = document.createElement("DIV");
	target.successedListener.push(listener);
	target.failedListener.push(listener);
	
	// テスト
	start();
	var result = target.fetch();
	equal(true, result);
	
	expect(4);
});

/**
 * 異常系
 * リソースが存在しない場合
 */
asyncTest("fetch02", function() {
	// 事前準備
  var div = document.createElement("DIV");
	var mapperMock = new MapperMock();
	var target = ElementLoader.create(div, mapperMock, "resources/NO_EXISTS");
	var listener = {
		completeState: false,
		loadCompleted: function() {
			ok(false, "loadCompleted");
		},
		errorOccured: function(loader, err) {
			ok(true, "errorOccured");
			equal(target, loader);
			ok(err instanceof XhrError);
		}
	};
	var div = document.createElement("DIV");
	target.successedListener.push(listener);
	target.failedListener.push(listener);
	
	// テスト
	start();
	var result = target.fetch();
	equal(true, result);
	
	expect(4);
});

/**
 * 異常系
 * すでにリクエストが送信済みの場合
 */
test("fetch03", function() {
	// 事前準備
	var div = document.createElement("DIV");
	var target = ElementLoader.create(div, new MapperMock(), "../resources/test.js");
	target.xhr = {state: XMLHttpRequest.SENDING};
	
	// テスト
	var result = target.fetch();
	equal(false, result);
});

/**
 * 異常系
 * JSONからHTML要素へのマッピングに失敗する場合
 */
asyncTest("fetch04", function() {
  // 事前準備
  var div = document.createElement("DIV");
  var mapperMock = new MapperMock();
  mapperMock.mapToElement = function() {
    throw new MappingError("mapping failed");
  }
  var target = ElementLoader.create(div, mapperMock, "../resources/test.js");
  var listener = {
    completeState: false,
    loadCompleted: function(loader) {
      ok(false, "loadCompleted");
    },
    errorOccured: function(loader, err) {
      ok(true, "errorOccured");
      equal(target, loader);
      ok(err instanceof MappingError);
    }
  };
  target.successedListener.push(listener);
  target.failedListener.push(listener);
  
  // テスト
  start();
  var result = target.fetch();
  equal(true, result);
  
  expect(4);
});