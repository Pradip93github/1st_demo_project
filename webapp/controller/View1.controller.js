sap.ui.define(['com/rg/sd/sr/controller/BaseController',
  'sap/m/Dialog',
  'sap/m/Image',
  'sap/m/Button',
  'sap/m/MessageToast'
],
  function (BaseController, Dialog, Image, Button, MessageToast) {
    return BaseController.extend("com.rg.sd.sr.controller.View1", {
      onInit: function () {
        // to call router object
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("spiderman").attachMatched(this.prince, this);
      },

     
      prince: function (oEvent) {
      //  this all code for previous record select on back button
        var oIndex = oEvent.getParameter("arguments").fruitId;
        var sPath = '/' + oIndex;
        var oSource = this.getView().byId("idListItem");

        var oItems = oSource.getItems();
        for (let i = 0; i < oItems.length; i++) {
          const element = oItems[i];

          if (element.getBindingContextPath() === sPath) {
            var oItemObject = element;
            break;
          }
        };
        oSource.setSelectedItem(oItemObject);
      },

      onAddItem:function(){
        this.oRouter.navTo("add");
      },

      onDeleteItem: function (oItem) {

        var onDeleteItem = oItem.getParameter("listItem");
        // this.getView().byId("idListItem").removeItem(onDeleteItem);
        oItem.getSource().removeItem(onDeleteItem);

      },

      onMultiSelect: function () {
        var oSelectedItems = this.getView().byId("idListItem").getSelectedItems();
        oSelectedItems.forEach(element => {
          this.getView().byId("idListItem").removeItem(element);
        });
      },

      onPress: function (myFruitId) {
        // this.getView().getParent().to("idView2");

        this.oRouter.navTo("spiderman", {
          fruitId: myFruitId,
        });

      },

      onPressItem: function (oEvt) {

        var selectItemPath = oEvt.getParameter("listItem").getBindingContextPath();


        // View2 object code coment here and declere it inside view2 controller
        // If we use App container control to call one view to other viewobject
        // var view2Obej = this.getView().getParent().getPages()[1];

        // if we use SplitApp container control to call ovewobject from one view
        // var view2Obej = this.getView().getParent().getParent().getDetailPage("idView2");
        //  view2Obej.bindElement(selectItemPath);

        var oIndex = selectItemPath.split("/")[selectItemPath.split("/").length - 1];
        fruitId = oIndex;
        this.onPress(fruitId);
      },


      onPressFdItem: function (oEvent) {
        MessageToast.show("Pressed on " + oEvent.getSource().getSender());
      },

      handlePress: function (evt) {
        var sSrc = evt.getSource().getTarget();
        var oDialog = new Dialog({
          content: new Image({
            src: sSrc,
          }),
          beginButton: new Button({
            text: 'Close',
            press: function () {
              oDialog.close(
              );
            }
          }),
          afterClose: function () {
            oDialog.destroy();
          }
        });
        oDialog.open();
      },



    });

  });