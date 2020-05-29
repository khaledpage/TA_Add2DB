sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("TA_logistik.TA_Add2DB.controller.View1", {
		onInit: function () {

		},
		onAdd: function() {
			// Get the values of the header input fields
			var ComCode = this.getView().byId("inputName").getValue();
			var Plant = this.getView().byId("inputVorname").getValue();
			if (ComCode == "" && Plant == "") {
			alert("Company Code and Plant cannot be blank");
			}
			alert(ComCode);
		}
		
		
		
	});
});