sap.ui.define(['sap/ui/core/UIComponent'],
  function (UIComponent) {
    return UIComponent.extend("com.rg.sd.sr.Component", {

      metadata: {
        manifest: "json",
      },
      init: function () {
        //   UIComponent is the base class here we will call base class contractor
        //   super->constructor()------ABAP
        UIComponent.prototype.init.apply(this);
        
        // Router Initialization
        this.getRouter().initialize();

      },
       
      // View are declear in createContent now view will be configar in manifest.json using router
      // createContent: function () {
      //   var oRuteView = new sap.ui.view("idRouteView", {
      //     viewName: "com.rg.sd.sr.view.App",
      //     type: "XML"
      //   });

      //   var oView1 = new sap.ui.view("idView1", {
      //     viewName: "com.rg.sd.sr.view.View1",
      //     type: "XML"
      //   });

      //   var oView2 = new sap.ui.view("idView2", {
      //     viewName: "com.rg.sd.sr.view.View2",
      //     type: "XML"
      //   });
      //   // for App container control to ass pages syntax
      //   // oRuteView.byId("idAppCon").addPage(oView1).addPage(oView2);

      //   // for SplitApp container contron to add view
      //   oRuteView.byId("idAppCon").addMasterPage(oView1).addDetailPage(oView2);

      //   return oRuteView;
      // },

      destroy: function () { },

    });

  });
