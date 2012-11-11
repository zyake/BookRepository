/**
 * 正常系
 */
test("constructor01", function(){
  var defs = [
        new ModelDefinition("KEY1", ["KEY2"], new DialogModel()),
        new ModelDefinition("KEY2", ["KEY1"], new DialogModel())];
  var elem = document.createElement("DIV");
  var target = new Dialog(elem, defs);
  
  equal(defs[0].model, target.modelMap["KEY1"]);
  equal(defs[1].model, target.modelMap["KEY2"]);
});

/**
 * 異常系
 * 依存関係が見つからない
 */
test("constructor02", function(){
  var defs = [
        new ModelDefinition("KEY1", ["KEY2"], new DialogModel()),
        new ModelDefinition("KEY3", [], new DialogModel())];
  var elem = document.createElement("DIV");
  try {
    var target = new Dialog(elem, defs);
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
        new ModelDefinition("KEY1", [], new DialogModel()),
        new ModelDefinition("KEY1", [], new DialogModel())];
  var elem = document.createElement("DIV");
  try {
    var target = new Dialog(elem, defs);
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
        new ModelDefinition("KEY1", ["KEY2"], new DialogModel()),
        new ModelDefinition("KEY2", ["KEY1"], new DialogModel())];
  var elem = document.createElement("DIV");
  elem.style.visibility = "hidden";
  var target = new Dialog(elem, defs);
  
  target.show();
  
  equal("visible", elem.style.visibility);
});


/**
 * 正常系
 */
test("hide01", function(){
  var defs = [
        new ModelDefinition("KEY1", ["KEY2"], new DialogModel()),
        new ModelDefinition("KEY2", ["KEY1"], new DialogModel())];
  var elem = document.createElement("DIV");
  elem.style.visibility = "visible";
  var target = new Dialog(elem, defs);
  
  target.hide();
  
  equal("hidden", elem.style.visibility);
});

/**
 * 正常系
 */
test("setContent01", function(){
  var defs = [
        new ModelDefinition("KEY1", ["KEY2"], new DialogModel()),
        new ModelDefinition("KEY2", ["KEY1"], new DialogModel())];
  var elem = document.createElement("SPAN");
  elem.innerHTML = "<DIV></DIV><DIV></DIV><DIV></DIV>";
  var target = new Dialog(elem, defs);
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
        new ModelDefinition("KEY1", ["KEY2"], new DialogModel()),
        new ModelDefinition("KEY2", ["KEY1"], new DialogModel())];
  
  var elem = document.createElement("SPAN");
  elem.innerHTML = "<DIV></DIV><DIV></DIV><DIV></DIV>";
  var target = new Dialog(elem, defs);
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