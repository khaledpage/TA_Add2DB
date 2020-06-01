var global = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/odata/v2/ODataModel", "sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, JSONModel, ODataModel, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("TA_logistik.TA_Add2DB.controller.View1", {
		onInit: function () {
			// var oModel = new JSONModel();
			// this.getView().byId("packItem").setModel(oModel);

			/*	var testData = [];
				var oModel = new sap.ui.model.json.JSONModel({
					data: testData
				});
				this.getView().setModel(oModel);*/

			// 				var sUrl = "/mainService/odata/v2/CatalogService/";
			// var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			// 		console.log(oModel)	;

			var testData = [];
			var oModel = new sap.ui.model.json.JSONModel({
				Users: testData
			});
			// this.getView().setModel(oModel);
			this.getView().byId("packItem").setModel(oModel);

		},
		onAdd: function () {
			// Get the values of the header input fields
			var ID = this.getView().byId("inputID").getValue();
			var Name = this.getView().byId("inputName").getValue();
			var Vorname = this.getView().byId("inputVorname").getValue();
			var Postzhal = this.getView().byId("inputPLZ").getValue();
			var Adresse = this.getView().byId("inputAdresse").getValue();
			var Email = this.getView().byId("inputEmail").getValue();
			var TeleNummer = this.getView().byId("inputTele").getValue();

			var oModel = this.getView().byId("packItem").getModel();
			// var oModel = sap.ui.getCore().getModel();
			// console.log(oModel);
			var itemData = oModel.getProperty("/Users");
			// console.log(itemData);
			var itemRow = {
				ID: parseInt(ID, 10),
				name: Name,
				vorname: Vorname,
				postzahl: Postzhal,
				adresse: Adresse,
				email: Email,
				teleNummer: TeleNummer
			};
			// console.log(itemRow);
			itemData.push(itemRow);

			oModel.setData({
				Users: itemData
			});
			var oModelG = this.getView().getModel();
			// var oMetadata = oModelG.getServiceMetadata();
			// console.log(oMetadata);

			jQuery.sap.require("sap.ui.commons.MessageBox");
			oModelG.create('/Users', itemRow, null, function () {
				sap.ui.commons.MessageBox.show(
					// sap.ui.commons.MessageBox.alert("Success!");
					"Success!"
				);

			}, function (e) {
				sap.ui.commons.MessageBox.alert("Error!:" + e);

			});

		},
		setFilter: function (oContext) {
			global = oContext.getSource().getText();
			console.log(global);

			// var oModelG = this.getView().getModel();

			// var tf =	oModelG.read("/Packets", null, ["$filter=ID eq '2412341' "], false,
			// 		function (oData, response) {
			// 			//Sucess
			// 		},
			// 		function (oError) {}
			// 	);
			// 	console.log(tf);
		},
			handleListItemPress: function (oEvent) {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ID");
			console.log("clicked ID:"+selectedProductId);
			oRouter.navTo("Detail", {
				productId: selectedProductId
			});
		}
		// handelTableDetail: function (oContext) {
		// 	var oModelG = this.getView().getModel();
		// 	// var tf = oModelG.read("/Packets");
		// 	// console.log(tf);
		// 	// var oFilter = new sap.ui.model.Filter('ID',sap.ui.model.FilterOperator.EQ, global);

		// 	// oContext.getSource().bindRows({  
		// 	//                           path : '/Packets',
		// 	//                           filters : [oFilter]
		// 	//  });

		// 	// var list = oContext.getSource();
		// 	// 	var binding = list.getBinding("items");

		// 	// 			var filters = [];
		// 	// 				filters.push(oFilter);
		// 	// 	binding.filter(filters);
		// 	// 		// console.log(oContext.getSource().getBindingContext("Packets").getProperty("status")  );
		// }
		// getID: function (oContext) {
		// 		console.log("am called");
		// 		var filters = [];
		// 		var oFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, global);
		// 		var list = oContext.getSource();
		// 		var binding = list.getBinding("items");
		// 		filters.push(oFilter);
		// 		binding.filter(filters);

		// 	}
			// handleDetail: function (oContext) {
			// 	// create model filter
			// 	var filters = [];

		// 		var filter = new sap.ui.model.Filter("Packets", sap.ui.model.FilterOperator.Contains, global);
		// 		filters.push(filter);

		// 	// update list binding
		// 	var list = oContext.getSource();
		// 	var binding = list.getBinding("items");
		// 	binding.filter(filters);
		// }

	});
});