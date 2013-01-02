var FormView = Backbone.View.extend({

   initialize: function(arg) {
        var me = this;
        this.model = arg.model;
        this.listenTo(this.model, "sync", this.renderSelections);
        this.listenTo(this.model, "submit.success", function(){ me.enableInput(); })

        this.selections = arg.el.querySelectorAll("select");
        this.nameToSelectionMap = {};
        for ( var i = 0 ; i < this.selections.length ;  i ++ ) {
            var selection = this.selections[i];
            this.nameToSelectionMap[selection.name] = selection;
        }
        this.submitButton = arg.el.querySelector(".submit");
        this.disableInput();

        this.submitButton.addEventListener("click", function(event) {
           var sendSuccessed = me.model.send(me.el);
           if ( sendSuccessed ) {
                me.disableInput();
                event.preventDefault();
            }
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
        selection.selectedIndex = 0;
   }
});