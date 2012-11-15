/**
 * 正常系
 */
test("goNext01", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY2", ["KEY1"], DialogModel.create())];
  var capturedContext;
  defs[1].model.start = function(context) {
    capturedContext = context;
    AssertUtils.assertInstanceof(DialogContext, context);
    ok(true);
  }
  defs[1].model.getContent = function() {
    ok(true);
    var elem = document.createElement("DIV");
    
    return elem;
  }
  var elem = document.createElement("DIV");
  var dialog =  Dialog.create(elem, defs);
  dialog.start("KEY2");
  
  equal(1, capturedContext.routes.length);
  equal("KEY2", capturedContext.routes[0]);
  expect(4);
});

/**
 * 正常系
 */
test("goBack01", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY2", ["KEY1"], DialogModel.create())];
  var capturedContext;
  defs[1].model.start = function(context) {
    capturedContext = context;
    AssertUtils.assertInstanceof(DialogContext, context);
    ok(true);
  }
  defs[1].model.getContent = function() {
    ok(true);
    var elem = document.createElement("DIV");
    
    return elem;
  }
  var elem = document.createElement("DIV");
  var dialog = Dialog.create(elem, defs);
  dialog.start("KEY2");
  capturedContext.routes.push("KEY1");
  capturedContext.goBack();
  
  equal(1, capturedContext.routes.length);
  equal("KEY2", capturedContext.routes[0]);
});