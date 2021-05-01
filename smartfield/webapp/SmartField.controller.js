sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.smartControls.SmartField", {
		onInit: function() {
			this.getView().bindElement("/Products('4711')");
			this.getView().byId("idPrice2").bindElement("/Services('4711')");
		}
	});

});