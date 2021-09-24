sap.ui.define([
    'sap/ui/Device'
    ], function(Device) {
    "use strict";

    return {
        initPageSettings : function(oView) {
            // Hide Settings Panel for phone
            if (Device.system.phone) {
                var oSettingsPanel = oView.byId('settingsPanel');
                if (oSettingsPanel){
                    oSettingsPanel.setExpanded(false);
                }
            }

            // try to load sap.suite.ui.commons for using ChartContainer
            // sap.suite.ui.commons is available in sapui5-sdk-dist but not in demokit
            var libraries = sap.ui.getVersionInfo().libraries || [];
            var bSuiteAvailable = libraries.some(function(lib){
                return lib.name.indexOf("sap.suite.ui.commons") > -1;
            });
            if (bSuiteAvailable) {
                jQuery.sap.require("sap/suite/ui/commons/ChartContainer");
                var vizframe = oView.byId("idVizFrame");
                var oChartContainerContent = new sap.suite.ui.commons.ChartContainerContent({
                    icon : "sap-icon://line-chart",
                    title : "vizFrame Line Chart Sample",
                    content : [ vizframe ]
                });
                var oChartContainer = new sap.suite.ui.commons.ChartContainer({
                    content : [ oChartContainerContent ]
                });
                oChartContainer.setShowFullScreen(true);
                oChartContainer.setAutoAdjustHeight(true);
                oView.byId('chartFixFlex').setFlexContent(oChartContainer);
            }
        }
    };
});