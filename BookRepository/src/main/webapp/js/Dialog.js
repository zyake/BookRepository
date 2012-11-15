/**
 * imports AssertUtils.js
 * imports DialogModel.js
 * imports DialogContext.js
 * imports DialogDefinition.js
 */

function Dialog() {
}

Dialog.prototype.initialize = function(elem, modelDefs) {
  this.element = elem;
  this.modelMap = [];
  
  // path1
  for ( var key = 0 ; key < modelDefs.length ; key ++ ) {
    var modelDef = modelDefs[key];
    var keyDuplicated = this.modelMap[modelDef.key] != undefined;
    if ( keyDuplicated ) {
      throw new Error("key was duplicated: " + modelDef.key);
    }
    
    this.modelMap[modelDef.key] = modelDef.model;
  }
  
  // path2(check dependencies)
  for ( var key = 0 ; key < modelDefs.length ; key ++ ) {
    var modelDef = modelDefs[key];
    var hasDependency = modelDef.depends != undefined;
    if ( !hasDependency ) {
      continue;
    }
    
    for ( var depKey = 0 ;  depKey < modelDef.depends.length ; depKey ++ ) {
      var dependency = modelDef.depends[depKey];
      
      var missingDependency = this.modelMap[dependency] == undefined;
      if ( missingDependency ) {
        throw new Error(
            "missing dependency: target=" + modelDef.key + ", depends=" + dependency);
      }
    } 
  }  
}

Dialog.create = function(elem, modelDefs) {
  AssertUtils.assertInstanceof(HTMLElement, elem);
  AssertUtils.assertInstanceof(Array, modelDefs);
  
  var dialog = new Dialog();
  dialog.initialize(elem, modelDefs);
  
  return dialog;
}

Dialog.prototype.show = function() {
  this.element.style.visibility = "visible";
}

Dialog.prototype.hide = function() {
  this.element.style.visibility = "hidden";
}

Dialog.prototype.setContent = function(content) {
  AssertUtils.assertInstanceof(Node, content);
  
  this.hide();

  for ( var key = 0 ; key < this.element.childNodes.length ; key ++ ) {
    var childNode = this.element.childNodes[key];
    this.element.removeChild(childNode);
  }
  
  this.element.appendChild(content);

  this.show();
}

Dialog.prototype.getContent = function() {
  return  this.element.firstChild;
}

Dialog.prototype.start = function(modelKey) {
  AssertUtils.assertTypeof("string", modelKey);
  
  var modelNotFound = this.modelMap[modelKey] == undefined;
  if ( modelNotFound ) {
    throw new Error("model not found: " + modelKey);
  }

  var emptyNode = document.createElement("DIV");
  this.setContent(emptyNode);
  
  var context = this.createContext();
  for ( var key in this.modelMap ) {
    var model = this.modelMap[key];
    model.init(context);
  }

  context.goNext(modelKey);
}

Dialog.prototype.close = function() {
  this.hide();
  
  for ( var key in this.modelMap ) {
    var model = this.modelMap[key];
    model.finish();
  }
}

Dialog.prototype.createContext = function() {
  return DialogContext.create(this);
}