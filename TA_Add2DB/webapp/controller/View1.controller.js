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

			var ID = this.getView().byId("inputID");

			var Name = this.getView().byId("inputName");
			var Vorname = this.getView().byId("inputVorname");
			var Postzhal = this.getView().byId("inputPLZ");
			var Adresse = this.getView().byId("inputAdresse");
			var Email = this.getView().byId("inputEmail");
			var TeleNummer = this.getView().byId("inputTele");

			var oModel = this.getView().byId("packItem").getModel();
			// console.log(itemData);
			var itemRow = {
				ID: (parseInt(ID.getValue(), 10)),
				name: Name.getValue(),
				vorname: Vorname.getValue(),
				postzahl: Postzhal.getValue(),
				adresse: Adresse.getValue(),
				email: Email.getValue(),
				teleNummer: TeleNummer.getValue()
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

					ID.setValue("");
					Name.setValue("");
					Vorname.setValue("");
					Postzhal.setValue("");
					Adresse.setValue("");
					Email.setValue("");
					TeleNummer.setValue("");
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

			var ID = this.getView().byId("PaketinputID");
			var status = this.getView().byId("inputStatus");
			var stock = this.getView().byId("inputNotizen");
			var note = this.getView().byId("inputLager");
			var combobox = this.getView().byId("comboBoxKunde");

			var itemRow = {
				ID: parseInt(ID.getValue(), 10),
				status: status.getValue(),
				stock: stock.getValue(),
				note: note.getValue(),
				user_ID: parseInt(combobox.getSelectedKey(), 10)

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

					ID.setValue("");
					status.setValue("");
					stock.setValue("");
					note.setValue("");
					combobox.setValue("");
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