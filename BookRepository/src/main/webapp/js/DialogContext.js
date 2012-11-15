/**
 * imports AssertUtils.js
 * imports Dialog.js
 * imports DialogModel.js
 */

function DialogContext() {
}

DialogContext.prototype.initialize = function(dialog) {
  this.dialog = dialog;
  this.routes = [];
  this.attributeMap = [];
}

DialogContext.create = function(dialog) {
  AssertUtils.assertInstanceof(Dialog, dialog);
  
  var context = new DialogContext();
  context.initialize(dialog);
  
  return context;
}

DialogContext.prototype.goNext = function(modelKey) {
  AssertUtils.assertTypeof("string", modelKey);
  
  var nextModel = this.dialog.modelMap[modelKey];
  if ( nextModel == undefined ) {
    throw new ReferenceError("model not found: " + modelKey);
  }
  
  this.routes.push(modelKey);
  nextModel.start(this);
  var content = nextModel.getContent();
  this.dialog.setContent(content);
}

DialogContext.prototype.goBack = function() {
  var existsPrevModel = this.routes.length > 1;
  if ( !existsPrevModel ) {
    throw new ReferenceError("prev model not found");
  }
  
  var prevModelKey = this.routes[this.routes.length - 2];
  var prevModel = this.dialog.modelMap[prevModelKey];
  if ( prevModel == undefined ) {
    throw ReferenceError("prev model not found");
  }

  this.routes.length = this.routes.length - 1;

  prevModel.start(this);
  var content = prevModel.getContent();
  this.dialog.setContent(content);
}