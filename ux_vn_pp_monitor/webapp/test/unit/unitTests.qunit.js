/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"vn/pp/ux_vn_pp_monitor/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});