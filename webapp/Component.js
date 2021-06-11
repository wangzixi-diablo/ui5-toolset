/*eslint linebreak-style: ["error", "unix"]*/
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"jerrylist/model/models",
	"sap/m/Button"
], function(UIComponent, Device, models, Button) {
	"use strict";

	var JerryButton = Button.extend("sap.m.custom.JerryButton", {
      metadata: {
         properties: {
            application: {
               type: "object",
               group: "Data",
               defaultValue: null
            }
         },
         aggregations: {
            groups: {
               type: "sap.client.m.settings.SettingsGroup",
               multiple: false,
               singularName: "group"
            },
            content: {
               type: "sap.ui.core.Control",
               multiple: true
            }
         }
      },
      renderer: {}
   });

	return UIComponent.extend("jerrylist.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			var oModel = new sap.ui.model.json.JSONModel(
        jQuery.sap.getModulePath("jerrylist.model","/mock.json"));
			this.setModel(oModel);
		}
	});
});