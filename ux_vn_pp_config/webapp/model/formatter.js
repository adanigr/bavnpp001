sap.ui.define([], function () {
	"use strict";
	return {
		ValidateConfigWerks: function (aSelectedWerks) {
			return aSelectedWerks.length !== 0;
		},
		EnabledConfigType: function (sListAction, sSelectAction) {
			if (sListAction === sSelectAction) {
				return true;
			}
			return false;
		}
	};
});