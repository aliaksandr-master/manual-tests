"use strict";

window.FirstPageView = window.PageView.extend({
	events: {
		'click #start': 'update'
	},

	render: function () {
		var r = window.FirstPageView.__super__.render.apply(this, arguments);
		this.el('#test-variant').focus();
		return r;
	},

	template: window.getTemplate('main'),

	_prepareValue: function (selector, min, max, message) {
		var str = this.el(selector).val().replace(/^\s*|\s*$/, ''),
			num = Number(str);

		if (!/^\d+$/.test(num) || num < min || num > max) {
			alert(message.replace('%min%', min).replace('%max%', max));
			return false;
		}

		return num;
	},

	update: function (e) {
		var variant = this._prepareValue('#test-variant', this.model.minVariants, this.model.maxVariants, 'Вариант не должен быть меньше %min% и больше %max%');
		var count   = this._prepareValue('#test-question-count', 1, Math.floor(this.model.allQuestions.length / this.model.maxVariants), 'Количество вопросов не должно быть меньше чем %min% и больше чем %max%');
		var error   = this._prepareValue('#test-errors', 0, count, 'Количество ошибок не должно быть меньше чем %min% и больше чем %max%');

		if (error === false || count === false || variant === false) {
			return;
		}

		this.model.variant = variant;
		this.model._variant = {
			variant: variant,
			errors: error,
			count: count
		};

		alert('Возможно несколько вариантов ответа');

		this.done();
	}
});
