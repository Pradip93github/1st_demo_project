sap.ui.define(['sap/ui/model/Filter',
	          'sap/ui/model/FilterOperator'],
    function (Filter,FilterOperator) {

        return {

            checkState: function (oStatus) {
                
                switch (oStatus) {
                    case "Available":
                        return "Success" ;
                        break;
                    case "Out of Stock":
                        return "Warning" ;
                        break;

                    case "Discontinued":
                        return "Error" ;
                        break;

                    case "Unavailable":
                        return "Information";
                        break;
                    default:
                        break;
                }
            },


            onSearch: function(oSearchObj){
                 debugger;
                // var sQuery = oSearchObj.getSource().getValue();
                var sQuery = oSearchObj.getParameter("query");
                // var sQuery1 = '1000';
                    var filterName = new Filter("PRODUCT_ID", FilterOperator.Contains, sQuery);
                    // var filterName1 = new Filter("CATEGORY", FilterOperator.Contains, sQuery1);
                    
                    // var filterStatus = new Filter("type", FilterOperator.Contains, sQuery);
                    //  var aFilters = [filterName,filterName1];
                    // var oFilter = new Filter({
                    //     filters: aFilters,
                    //     and: false
                    // }); 

                // update list binding
                var oList = this.getView().byId("idListItem");
                var oBinding = oList.getBinding("items");
                oBinding.filter(filterName);
              
            },   

        };




    });