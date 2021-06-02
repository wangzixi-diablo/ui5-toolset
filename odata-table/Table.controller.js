// @ts-nocheck
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.jerry.odatatable.table",{

		counter: 0,
		onInit: function() {
			this._trigger = new sap.ui.core.IntervalTrigger(1  * 100 );
   			this._trigger.addListener(this.onRefreshTriggered, this);
		},
		onRefreshTriggered: function () {
			var oBinding = this.byId("producttable").getBinding("items");
			if( !!oBinding){
				oBinding.refresh();
				this.byId("counter").setText(this.counter++);
			}
		}
	});
});
