/**
 * import AssertUtils.js
 * import AbstractJsonMapper.js
 */

/**
 * HTMLを動的に読み込むためのローダ。
 */
function ElementLoader(element, mapper) {
	AssertUtils.assertInstanceof(AbstractJsonMapper, mapper);
	
	this.element = element;
	this.mapper = mapper;
	this.successedListener = [];
	this.failedListener = [];
}

/**
 * 読み込みが正常に完了した文字列をJSONとして評価し、
 * HTML要素にマッピングする。
 */
ElementLoader.prototype.loadCompleted = function() {
	var json = eval("(" + this.xhr.responseText + ")");
	this.mapper.mapToElement(json, this.element);
	
	for ( var key in this.successedListener ) {
		var listener = this.successedListener[key];
		listener.loadCompleted(this.xhr);
	}
}

ElementLoader.prototype.errorOccured = function() {
	for ( var key in this.failedListener ) {
		var listener = this.failedListener[key];
		listener.errorOccured(this.xhr);
	}
}

ElementLoader.prototype.fetch = function(url) {
	var existsXhr = this.xhr != null;
	if ( existsXhr ) {
		var isAvailable = 
			this.xhr.state == XMLHttpRequest.UNSENT || this.xhr.state == XMLHttpRequest.DONE;
		if( !isAvailable ) {
			return false;
		}
	} 
	
	this.url = url;
	this.xhr = new XMLHttpRequest();
	this.xhr.open("GET", url, true);
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