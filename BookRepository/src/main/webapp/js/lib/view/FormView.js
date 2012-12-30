var FormView = Backbone.View.extend({

   initialize: function(arg) {
        this.model = arg.model;
        this.listenTo(this.model, "sync", this.renderSelections);

        this.selections = arg.el.querySelectorAll("select");
        this.nameToSelectionMap = {};
        for ( var i = 0 ; i < this.selections.length ;  i ++ ) {
            var selection = this.selections[i];
            this.nameToSelectionMap[selection.name] = selection;
        }
        this.submitButton = arg.el.querySelector("input[type=submit]");
        this.disableInput();

        var me = this;
        this.submitButton.addEventListener("onclick", function(event) {
            event.preventDefault();
            me.disableInput();
            me.model.send(me.el);
        });
   },

   disableInput: function() {
        for ( var i = 0 ; i < this.selections.length ; i ++ ) {
            this.selections[i].disabled = true;
        }
        this.submitButton.disabled = true;
   },

  enableInput: function() {
        for ( var i = 0 ; i < this.selections.length ; i ++ ) {
            this.selections[i].disabled = false;
        }
       this.submitButton.disabled = false;
  },

   renderSelections: function() {
      var selections = this.model.get("selections");
      for ( var i = 0 ; i < selections.length ; i ++ ) {
        var json = selections[i];
        var selection = this.nameToSelectionMap[json.key];
        this.refreshOptions(selection, json.list);
      }
      this.enableInput();
   },

   refreshOptions: function(selection, options) {
        selection.innerHTML = "";
        for ( var i = 0 ; i < options.length ; i ++ ) {
            var option = new Option(options[i]);
            selection.appendChild(option);
        }
   }
});