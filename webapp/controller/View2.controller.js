sap.ui.define(['com/rg/sd/sr/controller/BaseController',
              'sap/m/MessageBox',
              'sap/m/MessageToast',
              'sap/ui/core/Fragment',
              'sap/ui/model/Filter',
              'sap/ui/model/FilterOperator'
],
    function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator){
        return BaseController.extend("com.rg.sd.sr.controller.View2",{

            onInit:function(){
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("spiderman").attachMatched(this.harculas,this);
            },
            harculas:function(oEvent){
                debugger;
              var oIndex = oEvent.getParameter("arguments").fruitId;
              var sPath = '/' + oIndex;
              this.getView().bindElement(sPath,{
                expand: 'To_Supplier'
              });
            },
            onPressBack:function(){
                // this.getView().getParent().to("idView1");
                this.oRouter.navTo("startpage");
            },
            onSave:function(){
                var getResourceModel = this.getView().getModel("i18n");
                var oBandal = getResourceModel.getResourceBundle();
                var headerText = oBandal.getText("ConfrmMessageText");
                var successMessage = oBandal.getText("OkMessageText","8967233998");
                var cancelsMessage = oBandal.getText("CancelMessageText");

                MessageBox.confirm(headerText,{
                    title: "Confirmation",
                    onClose:function(oEvent){  
                       if (oEvent === 'OK') {
                        MessageToast.show(successMessage);
                       } else {
                        MessageBox.error(cancelsMessage);
                       };
                    },
                });

            },
            onCancel:function(){

            },
            
            callBackObj: null,
            onFiterPress:function(){
                
               var that = this;
                if (!this.callBackObj) {

                    Fragment.load({
                        name: "com.rg.sd.sr.fragments.popup",
                        id: "idFilterObj",
                        controller: this
                    }).then(function(oFragment){
                        
                        that.callBackObj = oFragment;
                        that.callBackObj.setTitle("Suppliers");
                        // give permission to fragment to access model
                        that.getView().addDependent(that.callBackObj);
                        // binding data
                        that.callBackObj.bindAggregation("items",{
                            path: 'fruit>/suppliers',
                            template : new sap.m.ObjectListItem({
                               title: '{fruit>name}',
                               intro: '{fruit>sinceWhen}',
                               number: '{fruit>contactNo}'
                            }),
                        });
                        that.callBackObj.open();
                    });
                    
                } else {

                    this.callBackObj.open();
                }
            },
            
            fieldIndex: null,
            callBackObj1: null,
            onF4Press: function(oEvent){

               this.fieldIndex =  oEvent.getSource();

                var that = this;
                if (!this.callBackObj1) {

                    Fragment.load({
                        name: "com.rg.sd.sr.fragments.popup",
                        id: "city",
                        controller: this
                       
                    }).then(function(oFragment){
                        
                        that.callBackObj1 = oFragment;
                        that.callBackObj1.setTitle("Cities");
                        that.callBackObj1.setMultiSelect(false);
                        // give permission to fragment to access model
                        that.getView().addDependent(that.callBackObj1);
                        // binding data
                        that.callBackObj1.bindAggregation("items",{
                            path: 'fruit>/cities',
                            template : new sap.m.ObjectListItem({
                               title: '{fruit>name}',
                               intro: '{fruit>famousFor}',
                               number: '{fruit>otherName}'
                            }),
                        });
                        that.callBackObj1.open();
                    });
                    
                } else {

                    this.callBackObj1.open();
                }
                
            },

            onPopupConfirm: function(oEvent){
                var oId = oEvent.getSource().getId();
                // if block for f4 help in city field
                if (oId.indexOf("city") != -1) {
                    var getSelectItem = oEvent.getParameter("selectedItem").getTitle();
                    this.fieldIndex.setValue(getSelectItem);
                  
                    // else block for multiselection in filter button
                } else {
                  var getSelectedItems =  oEvent.getParameter("selectedItems");
                  var aFilter =[];
                  for (let i = 0; i < getSelectedItems.length; i++) {
                    const element = getSelectedItems[i];
                    var sTitle = element.getTitle();
                    var filter = new Filter("name", FilterOperator.EQ, sTitle)
                    aFilter.push(filter);
                  }

                  var aFilters = new Filter({
                    filters: aFilter,
                    and: false
                  });
                  var oTableObject = this.getView().byId("idMtable");
                  var oBinding = oTableObject.getBinding("items");
                  oBinding.filter(aFilters,"Application");
                }
            },

            onSearchPopup: function(oEvent){
                
                var oSearchvalue = oEvent.getParameter("value");
                var oSfilter = new Filter("name", FilterOperator.Contains, oSearchvalue)
                var aFilter = [oSfilter];
                oEvent.getSource().getBinding("items").filter(aFilter,"Application");


            },

            onSupplierItemPress: function(oEvent){
                
                 var sPath =oEvent.getParameter("listItem").getBindingContextPath();
                 var oIndex = sPath.split("/")[sPath.split("/").length - 1];
                this.oRouter.navTo("superman",{
                    supplierId : oIndex,
                });
            },




        });

});