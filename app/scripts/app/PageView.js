"use strict";

window.PageView = window.View.extend({

	el: (function () {
		var $el;
		return function (search) {
			if ($el == null) {
				$el = $(document.getElementById('page-container'));
			}

			return search == null ? $el : $el.find(search);
		};
	})(),
	removeEl: function () {
		this.el().empty();
	}
});
