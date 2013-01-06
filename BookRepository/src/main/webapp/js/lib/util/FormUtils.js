function FormUtils() {
}

(function() {
    var instance = null;
    FormUtils.get = function() {
        if ( instance == null ) {
            instance = new FormUtils();
        }

        return instance;
    }
})();

/**
 * オブジェクトのプロパティをFormElement.elementsの各要素に設定する。
 */
FormUtils.prototype.mapToForm = function(object, form) {
    for ( var key in object ) {
        var input = form[key];
        // Chromeで実行したところ、input要素が存在しない場合、
        // 何故か空文字が返されてしまうので、苦肉の策。
        var inputNotFound = ! (input instanceof HTMLElement);
        if ( inputNotFound ) {
            throw new Error("target input not found: name=" + key);
        }
        input.value = object[key];
    }
}