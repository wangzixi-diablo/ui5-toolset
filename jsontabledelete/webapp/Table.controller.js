sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.tabledelete.Table", {
		onInit: function() {
			var oTable = this.byId("jerrytable");
			this.data = {
				Products : [ 
				            { Name : 'Jerry 产品1' , Size : 'XXL'},
				            { Name : 'Jerry 产品2' , Size : 'XXS'}
				            ]	
			};
			this.jModel = new sap.ui.model.json.JSONModel();
			this.jModel.setData(this.data);
			oTable.setModel(this.jModel);	
		},
		addRow : function(oArg){
			this.data.Products.push({Name : '', Size : ''});
			this.jModel.refresh();
		},
		deleteRow: function(oEvent){
			var deleteRecord = oEvent.getSource().getBindingContext().getObject();
			for( var i = 0;i < this.data.Products.length; i++){
				if( this.data.Products[i] === deleteRecord ){
					this.data.Products.splice(i,1); 
					this.jModel.refresh();
					return;
				}
			}
		}
	});
});