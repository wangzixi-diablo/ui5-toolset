sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/demo/CombineLatest/lib/vconsole-min"
], function(Controller, VConsole) {
	"use strict";

	return Controller.extend("sap.ui.demo.CombineLatest.Combine", {

		initDataModel:function(){
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oData = {"red": 0, "black": 0, "total": 0};

			this.oModel.setData(this.oData);
			this.getView().setModel(this.oModel);
		},

		initVConsole: function(){
			var vConsole = new window.VConsole();
        	console.log('Hello world');
		},
		onInit: function() {
			this.initVConsole();
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