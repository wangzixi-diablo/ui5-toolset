jQuery.sap.require("jerrylist.util.Formatter");
jQuery.sap.require("jerrylist.util.Grouper");
sap.ui.controller("jerrylist.view.Master", {

	handleListItemPress : function (evt) {
		console.error("Jerry clicks list item");
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	},
	
	handleSearch : function (evt) {
		
		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("SoId", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
		
		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	}
	, handleListSelect : function (evt) { 
		var context = evt.getParameter("listItem").getBindingContext(); 
		this.nav.to("Detail", context); 
	},

	handleGroup : function (evt) {
		console.error("Jerry: handleGroup automatically called?");
		// compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		var key = (item) ? item.getKey() : null;
		if ("GrossAmount" === key || "LifecycleStatus" === key) {
			jerrylist.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = jerrylist.util.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key, true, grouper));
		}
		var list = this.getView().byId("list");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	}
});