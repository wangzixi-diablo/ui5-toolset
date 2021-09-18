sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.tabledelete.Table", {
		onInit: function() {
			var oTable = this.byId("ins");
			var sServiceUrl = "/here/goes/your/serviceUrl/";
			oTable.oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			oTable.setModel(oTable.oModel);
		},
		addRow : function(oArg){
			var oTable = this.byId("ins");

			var oData = {
				ProductId: "999",
				Name: "myProduct"
			};
			oTable.oModel.create("/Products", oData, {success: (oEvent)=> console.log("ok: ", oEvent), error: 
			(oEvent) => console.log('fail: ', oEvent)});
		},

		deleteRow: function(oEvent){
			var oTable = this.byId("ins");
			oTable.oModel.remove(`/Products('999')`, {success: (oEvent)=> console.log("ok: ", oEvent), error: 
			(oEvent) => console.log('fail: ', oEvent)});
		}
	});
});