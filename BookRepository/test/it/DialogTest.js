test("integrateComponents01", function(){
  function SelectDataSourceModel(elem) {
    this.element = elem;
    var me = this;
  }
  SelectDataSourceModel.prototype = DialogModel.create();
  SelectDataSourceModel.prototype.getContent = function() {
    var cloneNode = this.element.cloneNode(true);
    cloneNode.hidden = false;
    
    var me = this;
    var nextButton = cloneNode.querySelector(".view1Next");
    nextButton.addEventListener("click", function() {
      var datasource = cloneNode.querySelector(".datasource");
      me.context.attributeMap["SelectedDataSource"] = datasource.value;
      me.context.goNext("VIEW2");
    });
    
    return cloneNode;
  }
  
  function ConfirmDialogModel(elem) {
    this.element = elem;
    var me = this;
  }
  ConfirmDialogModel.prototype = DialogModel.create();
  ConfirmDialogModel.prototype.getContent = function() {
    var cloneNode = this.element.cloneNode(true);
    cloneNode.hidden = false;
    
    var me = this;
    
    var confirmButton = cloneNode.querySelector(".confirm");
    confirmButton.addEventListener("click", function() {
      alert("confirmed!");
      var dialog = me.context.dialog;
      dialog.close();
    });
    
    var backButton = cloneNode.querySelector(".back");
    backButton.addEventListener("click", function() {
      me.context.goBack();
    });

    var dialog = me.context.dialog;
    var selectedDatasource = cloneNode.querySelector(".selectedDatasource");
    selectedDatasource.innerHTML = me.context.attributeMap["SelectedDataSource"];
    
    return cloneNode;
  }
  
  var defs = [];
  (function() {
    var model = new SelectDataSourceModel(document.getElementById("view1"));
    var def = ModelDefinition.create("VIEW1", [], model);
    defs.push(def);
  })();
  (function(){
    var model = new ConfirmDialogModel(document.getElementById("view2"));
    var def = ModelDefinition.create("VIEW2", ["VIEW1"], model);
    defs.push(def);
  })();

  var target = Dialog.create(document.getElementById("dialog"), defs);
  target.start("VIEW1");
});

