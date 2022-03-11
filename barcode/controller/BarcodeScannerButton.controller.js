sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	function (Controller, MessageToast) {
		"use strict";
		var prefixId;
		var oScanResultText;

		return Controller.extend("sap.ui5.walkthrough.controller.BarcodeScannerButton", {
			onInit: function () {
				prefixId = this.createId();
				if (prefixId){
					prefixId = prefixId.split("--")[0] + "--";
				} else {
					prefixId = "";
				}
				oScanResultText = sap.ui.getCore().byId(prefixId + 'sampleBarcodeScannerResult');
			},

			onScanSuccess: function(oEvent) {
				if (oEvent.getParameter("cancelled")) {
					MessageToast.show("Scan cancelled", { duration:1000 });
				} else {
					if (oEvent.getParameter("text")) {
						oScanResultText.setText(oEvent.getParameter("text"));
					} else {
						oScanResultText.setText('');
					}
				}
			},

			onScanError: function(oEvent) {
				MessageToast.show("Scan failed: " + oEvent, { duration:1000 });
			},

			onScanLiveupdate: function(oEvent) {
			},

			onAfterRendering: function() {
				// Reset the scan result
				var oScanButton = sap.ui.getCore().byId(prefixId + 'sampleBarcodeScannerButton');
				if (oScanButton) {
					$(oScanButton.getDomRef()).on("click", function(){
						oScanResultText.setText('');
					});
				}
			}
		});
	});
