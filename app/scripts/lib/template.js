"use strict";

var getTemplate = (function () {
	var _JST;
	return function (templateName) {
		if (_JST != null) {
			return _JST[templateName];
		}

		_JST = {};
		$('script[type="text/x-ejs-template"]').each(function () {
			_JST[this.id.replace('tpl-', '')] = _.template(this.innerHTML);
		});

		return _JST[templateName];
	};
})();
