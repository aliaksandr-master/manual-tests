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
		var num = Number(this.el(selector).val().trim());

		if (!/^\d+$/.test(num) || num < min || num > max) {
			throw new Error(message.replace('%min%', min).replace('%max%', max).replace('%num%', num));
		}

		return num;
	},

	update: function (e) {
		var variant;
		var count;
		var error;

		try {
			// variant = this._prepareValue(
			// 	'#test-variant',
			// 	0,
			// 	this.model.variants,
			// 	'Вариант не должен быть меньше %min% и больше %max%'
			// );
			variant = Math.floor(_.random(0, this.model.variants-1));
			count = this._prepareValue(
				'#test-question-count',
				1,
				Math.floor(this.model.allQuestions.length / this.model.variants),
				'Количество вопросов не должно быть меньше чем %min% и больше чем %max%, %num%'
			);
			error = this._prepareValue(
				'#test-errors',
				0,
				count,
				'Количество ошибок не должно быть меньше чем %min% и больше чем %max%'
			);
		} catch (e) {
			alert(e.message);
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
