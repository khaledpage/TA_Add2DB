sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("TA_logistik.TA_Add2DB.controller.View1", {
/*		onInit: function () {
var oModel = new JSONModel();
this.getView().byId("packItem").setModel(oModel);
		},
		onAdd: function() {
			// Get the values of the header input fields
			var Name = this.getView().byId("inputName").getValue();
			var Vorname = this.getView().byId("inputVorname").getValue();
			var Postzhal = this.getView().byId("inputPLZ").getValue();
			var Adresse = this.getView().byId("inputAdresse").getValue();
			var Email = this.getView().byId("inputEmail").getValue();
			var TeleNummer = this.getView().byId("inputTele").getValue();
		
			
 var oModel = this.getView().byId("packItem").getModel();
var itemData = oModel.getProperty("/data");

			var itemRow = {
				name: Name,
				vorname: Vorname,
				postzahl: Postzhal,
				adresse: Adresse,
				email:Email,
				teleNummer:TeleNummer
				};
				itemData.push(itemRow);
		}
		*/
		
		
	});
});