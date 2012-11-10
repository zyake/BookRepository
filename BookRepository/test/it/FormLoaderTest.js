/**
 * 正常系
 */
asyncTest("fetch01", function() {
  var selectMapper = new SelectJsonMapper();
  
  var loaders = [
          new ElementLoader(
                document.getElementById("select1"), 
                selectMapper,
                "resources/SelectElements.json"),
          new ElementLoader(
                document.getElementById("select2"),
                selectMapper,
                "resources/SelectElements2.json")];
  var formElem = document.getElementById("AjaxForm1");
  var formLoader = new FormLoader(formElem, loaders);
  
  formLoader.completionListener.push({
    notifyCompletion: function() {
      var notificator = document.getElementById("notificator1");
      notificator.innerHTML= "<span style='color:blue;'>success!</span>";

      for ( var i = 0 ; i < formLoader.form.elements.length ; i ++ ) {
        var elem = formLoader.form.elements[i];
        equal(false, elem.disabled);
      }
    }
  });
  
  formLoader.fetch();
  
  start();
  
  for ( var i = 0 ; i < formLoader.form.elements.length ; i ++ ) {
    var elem = formLoader.form.elements[i];
    equal(true, elem.disabled);
  }
});

/**
 * 異常系
 */
asyncTest("fetch02", function() {
  var selectMapper = new SelectJsonMapper();
  
  var loaders = [
          new ElementLoader(
                document.getElementById("select21"), 
                selectMapper,
                "resources/FAILURE.json"),
          new ElementLoader(
                document.getElementById("select22"),
                selectMapper,
                "resources/SelectElements.json")];
  var formElem = document.getElementById("AjaxForm2");
  var formLoader = new FormLoader(formElem, loaders);
  
  formLoader.failureListener.push({
    notifyError: function() {
      var notificator = document.getElementById("notificator2");
      notificator.innerHTML= "<span style='color:red;'>failed!</span>";

      for ( var i = 0 ; i < formLoader.form.elements.length ; i ++ ) {
        var elem = formLoader.form.elements[i];
        equal(true, elem.disabled);
      }      
    }
  });
  
  formLoader.fetch();
  
  start();
  
  for ( var i = 0 ; i < formLoader.form.elements.length ; i ++ ) {
    var elem = formLoader.form.elements[i];
    equal(true, elem.disabled);
  }
});