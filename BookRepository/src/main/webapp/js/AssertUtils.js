/**
 * 引数のアサーションに使用するためのユーティリティ。
 */
function AssertUtils() {
}

/**
 * Objectの型が期待されたものかどうかを判定する。
 */
AssertUtils.assertInstanceof = function(expected, actual) {
	var isNotMatched =  !(actual instanceof expected);
	if ( isNotMatched ) {
		throw "instance type not matched: expected=" + expected + ", actual=" + typeof(actual);
	}
}

/**
 * typeof演算の結果が期待されたものかどうかを判定する。
 */
AssertUtils.assertTypeof = function(expected, actual) {
	var isNotMatched =  !(typeof actual == expected);
	if ( isNotMatched ) {
		throw "type not matched: expected=" + expected + ", actual=" + typeof(actual);
	}
}