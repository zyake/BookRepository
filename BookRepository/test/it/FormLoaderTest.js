/**
 * 正常系
 */
asyncTest("fetch01", function() {
  var selectMapper = new SelectJsonMapper();
  var sleepSelectMapper = new SelectJsonMapper();
  sleepSelectMapper.target = selectMapper;
  sleepSelectMapper.mapToElement = function(json, addTo) {
    for ( var i = 0 ; i < 9999 ; i ++ ) {
      for ( var j = 0 ; j < 99999 ; j ++ ) {
      }
    }
    this.target.mapToElement(json, addTo);
  }
  
  var loaders = [
          new ElementLoader(
                document.getElementById("select1"), 
                sleepSelectMapper,
                "resources/SelectElements.json"),
          new ElementLoader(
                document.getElementById("select2"),
                sleepSelectMapper,
                "resources/SelectElements2.json")];
  var formElem = document.getElementById("AjaxForm1");
  var formLoader = new FormLoader(formElem, loaders);
  
  formLoader.completionListener.push({
    notifyCompletion: function() {
      var notificator = document.getElementById("notificator");
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