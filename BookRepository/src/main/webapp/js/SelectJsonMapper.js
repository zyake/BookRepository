/**
 * imports AssertUtils.js
 * imports AbstractJsonMappers.js
 */

/**
 * JSONオブジェクトから、SELECT要素を作成するためのファクトリ。
 * 期待するJsonオブジェクトの形式は以下の通りとする。
 * 
 * [ { label: LABEL1, value: VALUE1, selected: SELECTED}, ....]
 * @returns
 */
function SelectJsonMapper() {
}

SelectJsonMapper.prototype = new AbstractJsonMapper();

SelectJsonMapper.prototype.mapToElement = function(json, addTo) {
	AssertUtils.assertInstanceof(Array, json);
	AssertUtils.Instanceof(HTMLSelectElement, addTo);
	
	for ( var i = 0 ; i < json.length ; i ++ ) {
		var option = json[i];
		var optElem = new Option();
		optElem.label = option.label;
		optElem.value = option.value;
		optElem.selected = option.selected;
		
		addTo.options.add(optElem);
	}
}