/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"TA_logistik/TA_Add2DB/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});