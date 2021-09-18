sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.tabledelete.Table", {
		onInit: function() {
			var oTable = this.byId("jerrytable");
			var sServiceUrl = "/here/goes/your/serviceUrl/";
			oTable.oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			oTable.setModel(oTable.oModel);
		},
		addRow : function(oArg){
			var oTable = this.byId("jerrytable");
			var oNewProduct = {
				ProductId: "999",
				Name: "myProduct"
			};
			oTable.oModel.create("/Products", oNewProduct, {success: ()=> alert("new Product created ok."), error: 
			() => alert("Product creation failed.")});
		},

		deleteRow: function(oEvent){
			var oTable = this.byId("jerrytable");
			var oSelectedItem = oEvent.getSource().getBindingContext().getObject();
			oTable.oModel.remove(`/Products('${oSelectedItem.ProductId}')`, {success: ()=> alert(`Product ${oSelectedItem.ProductId} deleted ok.`), error: 
			() => alert(`Product ${oSelectedItem.ProductId} deleted failed.`)});
		}
	});
});