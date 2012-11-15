/**
 * imports AssertUtils.js
 * imports DialogModel.js
 */

function ModelDefinition() {
}

ModelDefinition.prototype.initialize = function(modelKey,depends, model) {
  AssertUtils.assertTypeof("string", modelKey);
  AssertUtils.assertInstanceof(Array, depends);
  AssertUtils.assertInstanceof(DialogModel, model);
  
  this.key = modelKey;
  this.model = model;
  this.depends = depends;
}

ModelDefinition.create = function(modelKey,depends, model) {
  AssertUtils.assertTypeof("string", modelKey);
  AssertUtils.assertInstanceof(Array, depends);
  AssertUtils.assertInstanceof(DialogModel, model);
  
  var modelDef = new ModelDefinition();
  modelDef.initialize(modelKey, depends, model);
  
  return modelDef;
}