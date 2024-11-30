sap.ui.define(['com/rg/sd/sr/controller/BaseController',
               'sap/ui/core/routing/History',
               'sap/ui/model/json/JSONModel',
               'sap/m/MessageBox',
               'sap/m/MessageToast'
],
    function(BaseController,History,JSONModel,MessageBox,MessageToast){
        return BaseController.extend("com.rg.sd.sr.controller.Add",{

           onInit:function(){
            this.Router = this.getOwnerComponent().getRouter();
            this.Router.getRoute("add").attachMatched(this.hurcules, this);
            // create default model
            this.localModel = new JSONModel();
            this.localModel.setData({
                "prodData": { 
                           "PRODUCT_ID": " ",
                            "TYPE_CODE": " ",
                            "CATEGORY": "Notebooks",
                            "NAME": "",
                            "SUPPLIER_ID": "0100000051",
                            "SUPPLIER_NAME": "TECUM",
                            "TAX_TARIF_CODE": "1",
                            "WEIGHT_UNIT": "KG",
                            "PRICE": "1679.000",
                            "CURRENCY_CODE": "ARS"
                }
            });

            this.getView().setModel(this.localModel, "prod" );
           },


           hurcules:function(oEvent){
            this.selectMode("Create");
           },

           mode:"Create",
           selectMode: function(sMode){
            this.mode = sMode;
            if (this.mode === "Create") {
                this.getView().byId("idSave").setText("Save");
                this.getView().byId("idProd").setEnabled(true);
                this.getView().byId("idDelete").setEnabled(false);
                
            } else {
                this.getView().byId("idSave").setText("Update");
                this.getView().byId("idProd").setEnabled(false);
                this.getView().byId("idDelete").setEnabled(true);
            }

           },

           imageUrl: function(sProd){
            var oSource = this.getView().byId("idImage");
            oSource.setSrc("/sap/opu/odata/sap/ZEPM_PRODUCT_SUPPLIER_SRV/ProductImgSet('"+ sProd +"')/$value" );

           },

           onEnterProdID: function(oData){
            
            var eData = oData.getParameter("value");
            var oModel = this.getView().getModel();
            var that = this;
            oModel.read("/ZPRODUCTSet('" + eData + "')" ,{
                success: function(lData){
                   that.localModel.setProperty("/prodData",lData);
                   that.imageUrl(eData);
                   that.selectMode("Update")
                },
                error: function(eData){
                    that.selectMode("Create");
                    MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].message);
                },
            });

           },

           onClear: function(){
            this.localModel.setProperty("/prodData",{
                             "PRODUCT_ID": " ",
                            "TYPE_CODE": " ",
                            "CATEGORY": "Notebooks",
                            "NAME": "",
                            "SUPPLIER_ID": "0100000051",
                            "SUPPLIER_NAME": "TECUM",
                            "TAX_TARIF_CODE": "1",
                            "WEIGHT_UNIT": "KG",
                            "PRICE": "1679.000",
                            "CURRENCY_CODE": "ARS"
            });
            this.selectMode("Create");
            this.getView().byId("idImage").setSrc("");
           },

           onCreate: function(){
             
            var payload =  this.localModel.getProperty("/prodData");
            if (payload.PRODUCT_ID === " ") {
                MessageBox.error("Please enter product id");
                return;
            };
            var odataModel = this.getView().getModel();
               
            if (this.mode === "Create") {

                odataModel.create("/ZPRODUCTSet", payload, {
                    success: function(data){
                       MessageToast.show("Product create sucessfully: " + data);
                    },
                    error: function(eData){
                    MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].messages);
                    },
                });
                
            } else {
                
                var proData = this.getView().byId("idProd").getValue();
                  odataModel.update("/ZPRODUCTSet('" + proData + "')", payload, {
                    success:function(sData){
                       MessageToast.show("Update Successfully");
                    },
                    error:function(eData){
                     MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].message);
                    }
                });
            }
            
           },

           getMostExpProd: function(){
            var oCatData = this.getView().byId("idCatg").getSelectedKey();
            var oModel = this.getView().getModel();
               var that = this;
                oModel.callFunction("/GetMostExpensiveProduct",{
                    urlParameters:{
                        "I_CATEGORY" : oCatData,
                    },
                    success: function(lData){
                        that.localModel.setProperty("/prodData",lData);
                        that.PRODUCT_ID = lData.PRODUCT_ID;
                        that.selectMode("Update");
                        that.imageUrl(that.PRODUCT_ID);
                    },
                    error: function(eData){
                        that.selectMode("Update")
                        MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].message);
                    },
                });
           },

           onDelete:function(){
            var prodData = this.getView().byId("idProd").getValue();
            var oModel = this.getView().getModel();
            var that = this;
            if ( !!prodData ) {
                oModel.remove("/ZPRODUCTSet('" + prodData + "')",{
                    success:function(sData){
                        that.onClear();
                        that.selectMode("Create");
                        MessageToast.show("Successfully deleted the record");
                    },
                    error:function(eData){
                        that.selectMode("Update");
                        MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].message);
                    },
                });
            } 
           },


           onBack: function(){
            const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
           },

           
        });

});