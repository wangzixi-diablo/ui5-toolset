// @ts-nocheck
sap.ui.jsview("jerrylist.view.App", {

	getControllerName: function () {
		return "jerrylist.view.App";
	},

	heavyFunction(){
		const N = 10000;

		for( var i = 0; i < N; i++){
			var node = document.createElement("div");
			document.body.appendChild(node);
		}		
		var result = [];
		/*for( var j =0; j < N; j++){
			for( var k =0; k < N; k++){
				result.push(k);
			}
		}*/
	},
	createContent: function (oController) {
		
		this.heavyFunction();
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		this.app = new sap.m.SplitApp();
		
		// load the master page
		var master = sap.ui.xmlview("Master", "jerrylist.view.Master");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		// load the empty page
		var empty = sap.ui.xmlview("Empty", "jerrylist.view.Empty");
		this.app.addPage(empty, false);
		
		return this.app;
	}
});