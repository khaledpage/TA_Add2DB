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
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf TA_logistik.TA_Add2DB.view.Detail
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf TA_logistik.TA_Add2DB.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf TA_logistik.TA_Add2DB.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});