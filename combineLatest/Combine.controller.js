sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.CombineLatest.Combine", {
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			var myData = {"field_for_text": "Jerry"};

			oModel.setData(myData);
			debugger;
			this.getView().setModel(oModel);
		}
	});
});