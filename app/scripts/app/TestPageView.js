"use strict";

window.TestPageView = window.PageView.extend({
	events: {
		'click #test-submit': 'submit'
	},

	template: window.getTemplate('test'),

	render: function () {
		window.TestPageView.__super__.render.apply(this, arguments);
		this.el('#test-submit').focus();
	},

	submit: function () {
		var serialized = this.el('form').serializeArray();
		var answered = [];
		_.each(serialized, function (obj) {
			answered.push(obj.value);
		});

		answered = answered.sort();

		this.model.userAnswers[this.model.currentNumber] = answered;

		if (answered.join() !== this.model.truth.sort().join()) {
			this.model.errors.push(this.model.currentNumber);
		}

		this.done();
	}
});
