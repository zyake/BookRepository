/**
 * <p>
 * BackboneのコレクションオブジェクトをTableElement上に
 * 表示するためのビューの実装。
 * </p>
 *
 * コンストラクタ
 * <ul>
 *  <li>collection: 描画対象のBackboneのコレクションオブジェクト。</li>
 *  <li>rowTemplate: 行の描画に使用するunderscoreのTemplateオブジェクト。</li>
 *  <li>el: HTMLTableEment</li>
 * </ul>
 */
var CollectionTable = Backbone.View.extend({

	initialize: function(arg) {
		 this.listenTo(this.collection, "sync", this.render);
		 this.rowTemplate = _.template(arg.rowTemplate);
		 this.tbody = this.el.querySelector(".body");
	 },

	 render: function() {
		 var newTBodies = "";
		 var me = this;
		 this.collection.each(function(model) {
			 var newTBody = me.rowTemplate(model.toJSON());
			 newTBodies += newTBody;
		 });
		 this.tbody.innerHTML = newTBodies;
	 }
});