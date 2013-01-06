$(function() {
    var indexModel = new IndexModel();

     window.showModel = function(no) {
        indexModel.showModel(no);
    }

    window.showRegisterDialog = function() {
        indexModel.showRegisterDialog();
    }
});