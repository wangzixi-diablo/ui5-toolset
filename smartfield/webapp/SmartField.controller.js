sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.smartControls.SmartField", {
		onInit: function() {
			this.getView().bindElement("/Products('4711')");
		},
		onPrintTriggered : function(){
			var sCtrlString = "width=500px,height=600px";
			var oWin = window.open("","PrintWindow", sCtrlString);
			oWin.document.write("<h1>Hello</h1>");
			oWin.print();
		  }
	});

});