sap.ui.define(['sap/ui/core/mvc/Controller',
               'com/rg/sd/sr/utill/lifeSaver'
],
    function(Controller,lifeSaver){
        return Controller.extend("com.rg.sd.sr.controller.BaseController",{

            formatter: lifeSaver,
            search: lifeSaver

        });

      
    });