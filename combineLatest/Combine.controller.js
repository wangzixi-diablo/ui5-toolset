sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.CombineLatest.Combine", {

		initDataModel:function(){
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oData = {"red": 0, "black": 0, "total": 0};

			this.oModel.setData(this.oData);
			this.getView().setModel(this.oModel);
		},
		onInit: function() {
			this.initDataModel();
		},

		updateButtonCounter: function(oEvent){
			oEvent.getSource().getText() === "Red" ?
				this.oData.red++: this.oData.black++;
			this.oData.total++;
			this.oModel.checkUpdate();
		},
		
		onPress: function(oEvent){
			this.updateButtonCounter(oEvent);
		}
	});
});