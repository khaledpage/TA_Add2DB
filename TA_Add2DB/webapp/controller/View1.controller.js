// var global = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/odata/v2/ODataModel", "sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, JSONModel, ODataModel, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("TA_logistik.TA_Add2DB.controller.View1", {
		onInit: function () {

			var input = this.getView().byId("inputID");
			input.addEventDelegate({
				onfocusin: function () {
					//alert("focus");
					input.setValue(parseInt(Date.now() / 100000, 10).toString());
				}
			});

			var testData = [];
			var oModel = new sap.ui.model.json.JSONModel({
				Users: testData
			});
			var oModel2 = new sap.ui.model.json.JSONModel({
				Packets: testData
			});

			this.getView().byId("packItem").setModel(oModel);
			this.getView().byId("AddPaket").setModel(oModel2);

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

			// console.log(itemData);
			var itemRow = {
				ID: (parseInt(ID, 10)),
				name: Name,
				vorname: Vorname,
				postzahl: Postzhal,
				adresse: Adresse,
				email: Email,
				teleNummer: TeleNummer
			};
			var oModel = this.getView().byId("packItem").getModel();
			// var oModel = sap.ui.getCore().getModel();
			// console.log(oModel);
			var itemData = oModel.getProperty("/Users");
			// tabelle aktualisieren
			itemData.push(itemRow);
			oModel.setData({
				Users: itemData
			});

			// Hochladen
			var oModelG = this.getView().getModel();

			oModelG.create("/Users", itemRow, {
				success: function (oData, oResponse) {
					// Success
					sap.m.MessageToast.show(" Created Successfully");

					this.getView().byId("inputID").setValue("");
					this.getView().byId("inputName").setValue("");
					this.getView().byId("inputVorname").setValue("");
					this.getView().byId("inputPLZ").setValue("");
					this.getView().byId("inputAdresse").setValue("");
					this.getView().byId("inputEmail").setValue("");
					this.getView().byId("inputTele").setValue("");
				},
				error: function (oError) {
					// Error
					sap.m.MessageToast.show("Fehler -> Console");
					console.log(oError);

				}
			});

		},

		handleListItemPress: function (oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ID");

			oRouter.navTo("Detail", {
				productId: selectedProductId
			});
		},

		onAddPacket: function () {

			var ID = this.getView().byId("PaketinputID").getValue();
			var status = this.getView().byId("inputStatus").getValue();
			var stock = this.getView().byId("inputNotizen").getValue();
			var note = this.getView().byId("inputLager").getValue();
			var user_ID = this.getView().byId("inputKundenId").getValue();

			var itemRow = {
				ID: parseInt(ID, 10),
				status: status,
				stock: stock,
				note: note,
				user_ID: parseInt(user_ID, 10)

			};
			var itemRowItems = {
				Barcode: parseInt(ID, 10),
				status: status,
				stock: stock,
				note: note,
				user_ID: parseInt(user_ID, 10)

			};

			var oModel = this.getView().byId("AddPaket").getModel();
			// var oModel = sap.ui.getCore().getModel();
			console.log(oModel);
			var itemData = oModel.getProperty("/Packets");
			console.log(itemData);
			// tabelle aktualisieren
			itemData.push(itemRowItems);
			oModel.setData({
				Packets: itemData
			});

			// Hochladen
			var oModelG = this.getView().getModel();

			oModelG.create("/Packets", itemRow, {
				success: function (oData, oResponse) {
					// Success
					sap.m.MessageToast.show(" Created Successfully");

					this.getView().byId("PaketinputID").setValue("");
					this.getView().byId("inputStatus").setValue("");
					this.getView().byId("inputNotizen").setValue("");
					this.getView().byId("inputLager").setValue("");
					this.getView().byId("inputKundenId").setValue("");

				},
				error: function (oError) {
					// Error
					sap.m.MessageToast.show("Fehler -> Console");
					console.log(oError);

				}
			});

		},
		handleSearch: function (evt) {
			MessageToast.show("searching.......");
			// create model filter
			var filters = [];
			var query = this.getView().byId("searchbox").getValue();
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("List");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},
			handleSearchKunde: function (evt) {
			MessageToast.show("searching.......");
			// create model filter
			var filters = [];
			var query = this.getView().byId("searchboxKunde").getValue();
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("kundeTabelle");
			var binding = list.getBinding("items");
			binding.filter(filters);
		}
,
			handleSearchPacktes: function (evt) {
		
			// create model filter
			var filters = [];
			var query = this.getView().byId("searchboxPacktes").getValue();
				MessageToast.show("searching for : " + query);
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ,query);
				filters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("Pakete");
			var binding = list.getBinding("items");
			binding.filter(filters);
		}
		// setFilter: function (oContext) {
		// 	global = oContext.getSource().getText();
		// },
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