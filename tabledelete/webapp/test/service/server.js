// @ts-nocheck
sap.ui.define(["sap/ui/core/util/MockServer"], function (MockServer) {
	"use strict";
	return {
		init: function () {
			var oMockServer = new MockServer({
				rootUri: "/here/goes/your/serviceUrl/"
			});
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 1000
			});
			oMockServer.attachAfter(sap.ui.core.util.MockServer.HTTPMETHOD.GET, function(oEvent) {
				var aData = oEvent.getParameter("oFilteredData").results;
				for( var i = 0; i < aData.length; i++){
					aData[i].Name = aData[i].Name + ".";
				}}
			);
			var sPath = jQuery.sap.getModulePath("sap.ui.demo.tabledelete.test.service");
			oMockServer.simulate(sPath + "/metadata.xml", sPath);
			oMockServer.start();
		}
	};
});