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
      renderer: {}/*,
      constructor: function(oRef) {
         this.application = oRef.application;
         Button.apply(this, arguments);
      }*/
   });

   var oApplication = {
   	"Jerry": "i042416"
   }; 
/*
   JerryButton.prototype.constructor = function(oRef){
		console.log("I am here");
		debugger;
	}; 
	*/


  var AnotherButton = function(oRef){
		console.log("I am here");
	}; 

  AnotherButton.prototype = Object.create(Button.prototype);
  AnotherButton.prototype.constructor = function(){
  }

  var oJerryButton = new AnotherButton({ application: oApplication } );
	return UIComponent.extend("jerrylist.Component", {
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			var oModel = new sap.ui.model.json.JSONModel(
        jQuery.sap.getModulePath("jerrylist.model","/mock.json"));
			this.setModel(oModel);
		}
	});
});