/**
 * imports AssertUtils.js
 * imports DialogModel.js
 */

function ModelDefinition(modelKey,depends, model) {
  AssertUtils.assertTypeof("string", modelKey);
  AssertUtils.assertInstanceof(Array, depends);
  AssertUtils.assertInstanceof(DialogModel, model);
  
  this.key = modelKey;
  this.model = model;
  this.depends = depends;
}