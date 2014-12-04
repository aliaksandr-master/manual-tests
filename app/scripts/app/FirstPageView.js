"use strict";

window.FirstPageView = window.PageView.extend({
	events: {
		'change #test-variant': 'updateTestVariant'
	},
	template: window.getTemplate('main'),
	updateTestVariant: function (e) {
		var VAR_EXP = /^(\d+)(?:Q(\d+))?(?:E(\d+))?$/i,
			variantString = this.el('input').val().replace(/^\s*|\s*$/, '');

		if (!VAR_EXP.test(variantString)) {
			alert('Неверный формат');
			return;
		}

		var that = this;

		var vr = {};
		String(variantString).replace(VAR_EXP, function (w, variant, count, errors) {
			vr.variant = +variant;
			vr.errors = errors ? +errors : that.model.defaultVariant.errors;
			vr.count = count ? +count : that.model.defaultVariant.count ;
		});

		if (vr.variant < this.model.minVariants || vr.variant > this.model.maxVariants) {
			alert('Неверный вариант');
			return;
		}

		this.model.variant = variantString;
		this.model._variant = vr;
		this.done();
	}
});
