sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/odata/v2/ODataModel"
], function (Controller, JSONModel, ODataModel) {
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
			console.log(itemData);
			var itemRow = {
				ID: parseInt(ID,10),
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
			var oMetadata = oModelG.getServiceMetadata();

			console.log(oMetadata);
			// oModel.create("/Users", itemRow);
			jQuery.sap.require("sap.ui.commons.MessageBox");
			oModelG.create('/Users', itemRow, null, function () {
				sap.ui.commons.MessageBox.show(
					// sap.ui.commons.MessageBox.alert("Success!");
				);
			}, function () {
				sap.ui.commons.MessageBox.alert("Error!");
			});

		}

	});
});