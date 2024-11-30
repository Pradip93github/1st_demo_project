sap.ui.define(['com/rg/sd/sr/controller/BaseController',
    'sap/ui/core/routing/History'
],
    function (BaseController, History) {
        return BaseController.extend("com.rg.sd.sr.controller.View3", {
            lvChartType: null,
            onInit: function () {
                this.oRuter = this.getOwnerComponent().getRouter();
                this.oRuter.getRoute("superman").attachMatched(this.micky,this);
            },

            micky:function(oEvent){
               debugger;
               var selectedId = oEvent.getParameter("arguments").supplierId;
               var sPath = 'fruit>/suppliers/' + selectedId;
               this.getView().bindElement(sPath);

            },

            onChange: function(ochartType){
                var oselectChart = ochartType.getCore().getSelectedKey();
                this.getView().byId("idVizFrame").setvizType(oselectChart);
            },

            onBackView3: function () {

                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.oRuter.navTo("spiderman", {}, true);
                }
            },

        });

    });