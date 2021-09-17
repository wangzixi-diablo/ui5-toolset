sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.tabledelete.Table", {
		onInit: function() {
			var oTable = this.byId("ins");
			var sServiceUrl = "/here/goes/your/serviceUrl/";
		//Adding service to the odata model
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		//Setting model to the table
			oTable.setModel(oModel);
		}
	});

});