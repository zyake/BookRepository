 var Dialog = Backbone.View.extend({

	 initialize:  function(arg) {
        this.dialog = this.createDialog();
        this.cover = this.createCover();
        this.el.appendChild(this.cover);
        this.el.appendChild(this.dialog);
	 },

     createDialog: function() {
         var dialog = document.createElement("DIV");
         dialog.style.display = "none";

         return dialog;
     },

     createCover: function() {
         var cover = document.createElement("DIV");
         cover.className = "cover";
         cover.style.display = "none";

         return cover;
     },

     createCloseButton: function(dialog) {
         var closeButton = dialog.querySelector(".close");
         var me = this;
         closeButton.addEventListener("click", function(){ me.close(); });

          return closeButton;
     },

     close: function() {
        this.cover.style.display = "none";
        this.dialog.style.display = "none";
     },

     show: function(arg) {
        this.retrieveContent(arg);
        this.createCloseButton(this.dialog);
        this.cover.style.display = "block";
        this.dialog.style.display = "block";
     },

     /**
      * サブクラスで実装するダイアログのコンテンツ取得メソッド
      */
     retrieveContent: function(arg) {
     }
 });