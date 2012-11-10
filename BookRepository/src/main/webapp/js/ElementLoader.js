/**
 * import AssertUtils.js
 * import AbstractJsonMapper.js
 */

/**
 * HTMLを動的に読み込むためのローダ。
 * 
 * @param element 読み込み先のHTML要素
 * @param mapper JSONをHTML要素にマッピングするためのマッパ
 * @param url JSONの取得元のURL
 */
function ElementLoader(element, mapper, url) {
	AssertUtils.assertInstanceof(AbstractJsonMapper, mapper);
	AssertUtils.assertTypeof("string", url);
	
	this.element = element;
	this.mapper = mapper;
	this.successedListener = [];
	this.failedListener = [];
	this.url = url;
}

/**
 * 読み込みが正常に完了した文字列をJSONとして評価し、
 * HTML要素にマッピングする。
 */
ElementLoader.prototype.loadCompleted = function() {
	var json = eval("(" + this.xhr.responseText + ")");
	this.mapper.mapToElement(json, this.element);
	
	this.successedListener.forEach(
	    function(listener) { listener.loadCompleted(this); }, this);
}

ElementLoader.prototype.errorOccured = function() {
  this.failedListener.forEach(
      function(listener) { listener.errorOccured(this); }, this);
}

ElementLoader.prototype.fetch = function() {
	var existsXhr = this.xhr != null;
	if ( existsXhr ) {
		var isAvailable = 
			this.xhr.state == XMLHttpRequest.UNSENT || this.xhr.state == XMLHttpRequest.DONE;
		if( !isAvailable ) {
			return false;
		}
	} 
	
	this.xhr = new XMLHttpRequest();
	this.xhr.open("GET", this.url, true);
	var me = this;
	this.xhr.addEventListener("load", function() {me.loadCompleted()});
	this.xhr.addEventListener("error",function() {me.errorOccured()});
	this.xhr.send();
	
	return true;
}

ElementLoader.prototype.abort = function() {
	var beforeSending = this.xhr == null;
	if ( beforeSending ) {
		return false;
	}
	
	var isNotAvailable = XMLHttpRequest.UNSENT || this.xhr.state == XMLHttpRequest.DONE;
	if ( isNotAvailable ) {
		return false;
	}
	
	this.xhr.abort();
}