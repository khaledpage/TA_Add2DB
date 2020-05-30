sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
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
				ID: ID,
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
 
		

		}

	});
});