/*eslint linebreak-style: ["error", "unix"]*/
sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			// Jerry 2017-05-20 9:32AM 
			/*var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;*/
			var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
			});
			deviceModel.setDefaultBindingMode("OneWay");
			return deviceModel;
		}
	};
});