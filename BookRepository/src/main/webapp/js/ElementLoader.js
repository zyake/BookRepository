/**
 * import AssertUtils.js
 * import XhrError.js
 * import MappingError.js
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
  AssertUtils.assertInstanceof(HTMLElement, element);
	AssertUtils.assertInstanceof(AbstractJsonMapper, mapper);
	AssertUtils.assertTypeof("string", url);
	
	/**
	 * リソースのマッピング先のHTML要素
	 */
	this.element = element;
	
	/**
	 * リソースをHTML要素へマッピングするAbstractMapperの実装。
	 */
	this.mapper = mapper;
	
	/**
	 * リソースの読み込みからHTML要素へのマッピングまで
	 * 成功したことを通知するリスナ関数。
	 * 
	 * @param src 要素を読み込んだElementLoaderのインスタンス
	 */
	this.successedListener = [];
	
	/**
	 * リソースの読み込み、もしくはHTML要素へのマッピングが
	 * 失敗したことを通知するリスナ関数。
	 * 
	 * @param src 要素を読み込んだElementLoaderのインスタンス
	 * @param reason 失敗した原因を通知するErrorオブジェクト
	 */
	this.failedListener = [];
	
	/**
	 * リソースの取得元URL
	 */
	this.url = url;
	
	/**
	 * XMLHttpRequestのレスポンスを受け取ったが、
	 * 処理を中断する必要がある場合のフラグ。
	 */
	this.aborted = false;
}

/**
 * 読み込みが正常に完了した文字列をJSONとして評価し、
 * HTML要素にマッピングする。
 * 項目のマッピングに成功した場合、successedListenerに通知する。
 * 項目のマッピングに失敗した場合、failedListenerに通知する。
 */
ElementLoader.prototype.loadCompleted = function(event) {
  if ( this.aborted ) {
    return;
  }
  
  try {
    var json = eval("(" + this.xhr.responseText + ")");
    this.mapper.mapToElement(json, this.element);
  } catch (err) {
    this.errorOccured(this, err);

    return;
  }
  
	this.successedListener.forEach(
	    function(listener) { listener.loadCompleted(this); }, this);
}

ElementLoader.prototype.errorOccured = function(event, err) {
  this.failedListener.forEach(
      function(listener) { listener.errorOccured(this, err); }, this);
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
	
	this.aborted = false;
	this.xhr = new XMLHttpRequest();
	this.xhr.open("GET", this.url, true);
	var me = this;
	this.xhr.addEventListener("load", function(event) { me.loadCompleted(event); });
	this.xhr.addEventListener("error",function(event) { 
	  var err = new XhrError("xml http request failed: " + me.url);
	  me.errorOccured(event, err); 
	});
	this.xhr.send();
	
	return true;
}

ElementLoader.prototype.abort = function() {
	var beforeSending = this.xhr == null;
	if ( beforeSending ) {
		return false;
	}
	
	var isNotAvailable = 
	  this.xhr.state == XMLHttpRequest.UNSENT || this.xhr.state == XMLHttpRequest.DONE;
	if ( isNotAvailable ) {
		return false;
	}
	
	this.xhr.abort();
	this.aborted = true;
}