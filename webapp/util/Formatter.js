jQuery.sap.declare("jerrylist.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

jerrylist.util.Formatter = {
	
	_statusStateMap : {
		"P" : "Success",
		"N" : "Warning"
	},

	statusText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},
	
	statusState :  function (value) {
		var map = jerrylist.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},
	
	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"});
			var formattedValue = oDateFormat.format(new Date(value));
			console.warn("formatted date: " + formattedValue);
			return formattedValue;
		} else {
			return value;
		}
	},
	quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	}
	
};