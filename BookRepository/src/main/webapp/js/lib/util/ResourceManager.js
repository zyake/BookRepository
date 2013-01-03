function ResourceManager() {
}

(function(){
    var instance = null;
    ResourceManager.get = function() {
        if ( instance == null ) {
            instance = new ResourceManager();
            instance.initialize();
        }

        return instance;
    }
})();

ResourceManager.prototype.initialize = function() {
    this.resourceCache = {};
    this.cacheEnabled = true;
}

ResourceManager.prototype.fetch = function(url, successCallback, failureCallback) {
    var cacheAvailable = this.cacheEnabled && this.resourceCache[url] != null;
    if ( cacheAvailable ) {
        var resource = this.resourceCache[url];
        successCallback(url, resource);
        return true;
    }

    var xhr = this.createXhr(url, successCallback, failureCallback);
    xhr.open("GET", url, true);
    xhr.send();

    return false;
}

ResourceManager.prototype.createXhr = function(url, successCallback, failureCallback) {
    var me = this;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
        if ( me.cacheEnabled ) {
            me.resourceCache[url] = xhr.responseText;
        }
        successCallback(url, xhr.responseText);
    });

    xhr.addEventListener("error", function() {
        failureCallback(url, xhr);
    });

    return xhr;
 }