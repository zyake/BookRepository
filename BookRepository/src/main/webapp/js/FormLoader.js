/**
 * import AssertUtils.js
 * import ElementLoader.js
 */

FormLoaderState = { NoSend: 0, Sending: 1, Finished: 2, Failed: 3 };

/**
 * Formの入力項目を読み込むためのローダ。
 */
function FormLoader(form, loaders) {
	AssertUtils.assertInstanceof(HTMLFormElement, form);
	AssertUtils.assertInstanceof(Array, loaders);
	
	this.state = FormLoaderState.NoSend;
	this.form = form;
	this.disableInputs();
	this.loaders = loaders;
	this.completionListener = [];
	this.failureListener = [];
	this.completionCount = 0;
	var me = this;
	this.loaders.forEach(
	  function(loader) { 
		  AssertUtils.assertInstanceof(ElementLoader, loader);
		  loader.successedListener.push(me);
			loader.failedListener.push(me);
	});
	
	this.disableInputs();
}

FormLoader.prototype.fetch = function() {
	this.state = FormLoaderState.NoSend;
	
	this.disableInputs();
	
	this.loaders.forEach(function(loader) {
	  loader.fetch();
	}, this);
	
	var alreadyFinished = this.state == FormLoaderState.Finished;
	if ( alreadyFinished ) {
		return;
	}
	
	this.state = FormLoaderState.Sending;
}

FormLoader.prototype.loadCompleted =  function(loader) {
	this.completionCount ++;
	var completedAllLoaders = this.loaders.length == this.completionCount;
	if ( completedAllLoaders ) {
	  this.eanbleInputs();

	  this.completionCount = 0;
		this.completionListener.forEach(
		    function(listener) { listener.notifyCompletion(this); }, this);

		this.state = FormLoaderState.Finished;
	}
}

FormLoader.prototype.errorOccured = function(failedLoader) {
	this.completionCount = 0;
	this.loaders.forEach(function(loader) { loader.abort(); });
	
	this.failureListener.forEach(
      function(listener) { listener.notifyError(this); }, this);
	
	this.state = FormLoaderState.Failed;
}

FormLoader.prototype.disableInputs = function() {
  for ( var i = 0 ; i <  this.form.elements.length ; i ++) {
    var elem = this.form.elements[i];
    elem.disabled = true;
  }
}

FormLoader.prototype.eanbleInputs = function() {
  for ( var i = 0 ; i <  this.form.elements.length ; i ++) {
    var elem = this.form.elements[i];
    elem.disabled = false;
  }
}