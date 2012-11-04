  	/**
  	 * 正常系
  	 * 1件分のレコードをマッピングできること
  	 */
  	test( "MapToElement01", function() {
  		// 準備
  		var json = [
  		      { label: "LABEL1", value: "VALUE1"}
  		];
  		var select = document.createElement("SELECT");

  		// テストの実行
  		var target = new SelectJsonMapper();
  		target.mapToElement(json, select);
  		
  		// 結果の確認
  		equal(select.options.length,1, "Optionの数");
  		
  		var option1 = select.options[0];
  		equal(option1.label, "LABEL1", "label");
  		equal(option1.value, "VALUE1", "value");
  		equal(option1.selected, true, "selected");
	});
  	
  	/**
  	 * 正常系
  	 * 3件分のレコードをマッピングできること
  	 */
  	test( "MapToElement02", function() {
  		// 準備
  		var json = [
  		      { label: "LABEL1", value: "VALUE1" },
  		      { label: "LABEL2", value: "VALUE2" },
  		      { label: "LABEL3", value: "VALUE3", selected: true }
  		];
  		var select = document.createElement("SELECT");

  		// テストの実行
  		var target = new SelectJsonMapper();
  		target.mapToElement(json, select);
  		
  		// 結果の確認
  		equal(select.options.length,3, "Optionの数");
  		
  		(function() {
	  		var option = select.options[0];
	  		equal(option.label, "LABEL1", "label");
	  		equal(option.value, "VALUE1", "value");
	  		equal(option.selected, false, "selected");
  		})();
  		
  		(function() {
	  		var option = select.options[1];
	  		equal(option.label, "LABEL2", "label");
	  		equal(option.value, "VALUE2", "value");
	  		equal(option.selected, false, "selected");
  		})();

  		(function() {
	  		var option = select.options[2];
	  		equal(option.label, "LABEL3", "label");
	  		equal(option.value, "VALUE3", "value");
	  		equal(option.selected, true, "selected");
  		})();
	});
  	
  	/**
  	 * 異常系
  	 * 第1引数が配列以外
  	 */
  	test("MapToElement03", function() {
  		var select = document.createElement("SELECT");
  		var target = new SelectJsonMapper();
  		try {
  			target.mapToElement(function(){}, select);
  			throw "failed";
  		} catch(ex) {
  			expect(0);
  		}
  	});
  	
  	
  	/**
  	 * 異常系
  	 * 第2引数がSELECT要素以外
  	 */
  	test("MapToElement04", function() {
  		var input = document.createElement("INPUT");
  		var target = new SelectJsonMapper();
  		try {
  			target.mapToElement([], input);
  			throw "failed";
  		} catch(ex) {
  			expect(0);
  		}
  	});