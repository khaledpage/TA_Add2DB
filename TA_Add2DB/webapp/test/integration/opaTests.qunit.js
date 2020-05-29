/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"TA_logistik/TA_Add2DB/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});