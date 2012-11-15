/**
 * 正常系
 */
test("constructor01", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY2", ["KEY1"], DialogModel.create())];
  var elem = document.createElement("DIV");
  var target = Dialog.create(elem, defs);
  
  equal(defs[0].model, target.modelMap["KEY1"]);
  equal(defs[1].model, target.modelMap["KEY2"]);
});

/**
 * 異常系
 * 依存関係が見つからない
 */
test("constructor02", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY3", [], DialogModel.create())];
  var elem = document.createElement("DIV");
  try {
    var target = Dialog.create(elem, defs);
  } catch(ex) {
    ok(true);
    return;
  }
  throw "fail";
});

/**
 * 異常系
 * キーが重複
 */
test("constructor03", function(){
  var defs = [
        ModelDefinition.create("KEY1", [], DialogModel.create()),
        ModelDefinition.create("KEY1", [], DialogModel.create())];
  var elem = document.createElement("DIV");
  try {
    var target = Dialog.create(elem, defs);
  } catch(ex) {
    ok(true);
    return;
  }
  throw "fail";
});

/**
 * 正常系
 */
test("show01", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY2", ["KEY1"], DialogModel.create())];
  var elem = document.createElement("DIV");
  elem.style.visibility = "hidden";
  var target = Dialog.create(elem, defs);
  
  target.show();
  
  equal("visible", elem.style.visibility);
});


/**
 * 正常系
 */
test("hide01", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY2", ["KEY1"], DialogModel.create())];
  var elem = document.createElement("DIV");
  elem.style.visibility = "visible";
  var target = Dialog.create(elem, defs);
  
  target.hide();
  
  equal("hidden", elem.style.visibility);
});

/**
 * 正常系
 */
test("setContent01", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY2", ["KEY1"], DialogModel.create())];
  var elem = document.createElement("SPAN");
  elem.innerHTML = "<DIV></DIV><DIV></DIV><DIV></DIV>";
  var target = Dialog.create(elem, defs);
  //
  var content = document.createElement("DIV");
  content.innerHTML = "<SPAN style='color:red;'>test</SPAN>";
  
  target.setContent(content);
  
  ok(target.element.firstChild instanceof HTMLDivElement);
});

/**
 * 正常系
 */
test("start01", function(){
  var defs = [
        ModelDefinition.create("KEY1", ["KEY2"], DialogModel.create()),
        ModelDefinition.create("KEY2", ["KEY1"], DialogModel.create())];
  
  var elem = document.createElement("SPAN");
  elem.innerHTML = "<DIV></DIV><DIV></DIV><DIV></DIV>";
  var target = Dialog.create(elem, defs);
  target.createContext = function() {
    return {
      goNext: function(key) {
        ok(true);
      }
    };
  };
  
  target.start("KEY1");
  
  expect(1);
});