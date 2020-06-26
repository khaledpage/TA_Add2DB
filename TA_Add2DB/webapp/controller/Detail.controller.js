sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("TA_logistik.TA_Add2DB.controller.Detail", {

	
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			//Parameter ermitteln
			var oArgs = oEvent.getParameter("arguments");
			// list abrufen
			var list = this.getView().byId("thelist");
			// Daten Quelle abrufen
			var binding = list.getBinding("items");
			// Filter erstellen und impelmentieren
			binding.filter([new sap.ui.model.Filter([
				new sap.ui.model.Filter("user_ID", sap.ui.model.FilterOperator.EQ, oArgs.productId)
			], false)]);
		},
		handleNavButtonPress: function (evt) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetView1");
			}
			

	});

});