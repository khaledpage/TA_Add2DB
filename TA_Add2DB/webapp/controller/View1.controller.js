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
					input.setValue(parseInt(((Date.now() / 10000000) % 1) * 100000000, 10).toString());
				}
			});

			var testData = [];
			var testData2 = [];
			var oModel = new sap.ui.model.json.JSONModel({
				Users: testData
			});
			var oModel2 = new sap.ui.model.json.JSONModel({
				Packets: testData2
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

			var oModel = this.getView().byId("packItem").getModel();
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

			// Hochladen
			var oModelG = this.getView().getModel();

			oModelG.create("/Users", itemRow, {
				success: function (oData, oResponse) {
					// Success
					sap.m.MessageToast.show(" Created Successfully");

					oModelG.read("/Users(" + itemRow.ID + ")", {
						success: function (oData2, oResponse2) {
							console.log(oData2)

							var itemData = oModel.getProperty("/Users");
							// tabelle aktualisieren
							itemData.push(oData2);
							oModel.setData({
								Users: itemData
							});
						},
						error: function (oError) {
							// Error Handling Here
						}

					});

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

			var oModel = this.getView().byId("AddPaket").getModel();
			// var oModel = sap.ui.getCore().getModel();

			// Hochladen
			var oModelG = this.getView().getModel();

			oModelG.create("/Packets", itemRow, {
				success: function (oData, oResponse) {
					// Success
					sap.m.MessageToast.show(" Created Successfully");

					oModelG.read("/Packets(" + itemRow.ID + ")", {
						success: function (oData2, oResponse2) {
							console.log(oData2)

							var itemData = oModel.getProperty("/Packets");

							console.log(itemData);

							// tabelle aktualisieren
							itemData.push(oData2);
							console.log(itemData);
							oModel.setData({
								Packets: itemData
							});
						},
						error: function (oError) {
							// Error Handling Here
						}

					});

					// this.getView().byId("PaketinputID").setValue("");
					// this.getView().byId("inputStatus").setValue("");
					// this.getView().byId("inputNotizen").setValue("");
					// this.getView().byId("inputLager").setValue("");
					// this.getView().byId("inputKundenId").setValue("");

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
		},
		handleSearchPacktes: function (evt) {

			// create model filter
			var filters = [];
			var query = this.getView().byId("searchboxPacktes").getValue();
			MessageToast.show("searching for : " + query);
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, query);
				filters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("Pakete");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},
		ondeletePakets: function () {

		},
		ondeleteKunde: function () {
				var oTable = this.getView().byId("kundeTabelle");
				var oModel = oTable.getModel();
				// var aRows = oModel.getData().data;
				var aContexts = oTable.getSelectedContexts();

				for (var i = aContexts.length - 1; i >= 0; i--) {
					console.log(aContexts[i].sPath);
					var path = aContexts[i].sPath;
					oModel.remove(path, {
						success: function () {
							MessageToast.show(path + " wurde gelöscht");
						},
						error: function (oError) {
							MessageToast.show("Fehelr beim Löschen");
							console.log(oError);
						}
					});
				}
				/*
				for (var i = aContexts.length - 1; i >= 0; i--) {
					// Selected Row
					var oThisObj = aContexts[i].getObject();

					// $.map() is used for changing the values of an array.
					// Here we are trying to find the index of the selected row
					// refer - http://api.jquery.com/jquery.map/
					var index = $.map(aRows, function (obj, index) {

						if (obj === oThisObj) {
							return index;
						}
					});

					// The splice() method adds/removes items to/from an array
					// Here we are deleting the selected index row
					// https://www.w3schools.com/jsref/jsref_splice.asp

					aRows.splice(index, 1);

					// Set the Model with the Updated Data after Deletion
					oModel2.setData({
						data: aRows
					});
		

					// Reset table selection in UI5
					oTable.removeSelections(true);
					
					
					
					
				}*/
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