    /**
     * 文字列型に対するテスト
     */
  	test( "assertInstanceof01", function() {
  		AssertUtils.assertInstanceof(String, new String("test"));
  		expect(0);
	});
    
    /**
     * 数値型に対するテスト
     */
  	test( "assertInstanceof02", function() {
  		AssertUtils.assertInstanceof(Number, new Number(1));
  		expect(0);
	});
    
    /**
     * Date型に対するテスト
     */
  	test( "assertInstanceof03", function() {
  		AssertUtils.assertInstanceof(Date, new Date());
  		expect(0);
	});
    
    /**
     * function型に対するテスト
     */
  	test( "assertInstanceof04", function() {
  		AssertUtils.assertInstanceof(Function, function(){});
  		expect(0);
	});
    
    /**
     * HTML要素型に対するテスト
     */
  	test( "assertInstanceof05", function() {
  		AssertUtils.assertInstanceof(Object, document.createElement("INPUT"));
  		expect(0);
	});
    
    /**
     * 配列型に対するテスト
     */
  	test( "assertInstanceof06", function() {
  		AssertUtils.assertInstanceof(Array, []);
  		expect(0);
	});
    
    
    /**
     * 文字列型に対するテスト
     */
  	test( "assertTypeof01", function() {
  		AssertUtils.assertTypeof("string", "test");
  		expect(0);
	});
    
    /**
     * 数値型に対するテスト
     */
  	test( "assertTypeof02", function() {
  		AssertUtils.assertTypeof("number", 1);
  		expect(0);
	});
    
    /**
     * Date型に対するテスト
     */
  	test( "assertTypeof03", function() {
  		AssertUtils.assertTypeof("object", new Date());
  		expect(0);
	});
    
    /**
     * function型に対するテスト
     */
  	test( "assertTypeof04", function() {
  		AssertUtils.assertTypeof("function", function(){});
  		expect(0);
	});
    
    /**
     * HTML要素型に対するテスト
     */
  	test( "assertTypeof05", function() {
  		AssertUtils.assertTypeof("object", document.createElement("INPUT"));
  		expect(0);
	});
    
    /**
     * HTML要素型に対するテスト
     */
  	test( "assertTy", function() {
  		AssertUtils.assertTag("INPUT", document.createElement("INPUT"));
  		expect(0);
	});