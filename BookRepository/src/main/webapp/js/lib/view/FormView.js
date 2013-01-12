var FormView = Backbone.View.extend({

   initialize: function(arg) {
        var me = this;
        this.model = arg.model;
        this.listenTo(this.model, "sync", this.renderSelections);
        this.listenTo(this.model, "submit.success", function() { me.enableInput(); });

        this.selections = this.el.querySelectorAll("select");

        this.submitButton = this.el.querySelector(".submit");
        this.submitButton.addEventListener("click", function(event) { me.submitForm(event); });

        this.disableInput();
   },

   submitForm: function(event) {
      var sendSuccessed = this.model.send(this.el);
      if ( ! sendSuccessed ) {
        return;
      }

       this.disableInput();
       event.preventDefault();
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
        var selection = this.el[json.key];
        this.refreshOptions(selection, json.list);
      }
      this.enableInput();
   },

   refreshOptions: function(selection, options) {
        selection.innerHTML = "";
        for ( var i = 0 ; i < options.length ; i ++ ) {
            var option = new Option(options[i], options[i]);
            selection.appendChild(option);
        }
        selection.selectedIndex = 0;
   }
});