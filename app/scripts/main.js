"use strict";

$(function () {
	if (!Object.create) {
		Object.create = function (data) {
			var Surrogate = function () {};
			Surrogate.prototype = data;
			return new Surrogate();
		};
	}

	var random = function (from, to, without) {
		var v = Math.floor(Math.random() * to) + from;
		if (_.contains(without, v)) {
			return random(from, to, without);
		}
		return v;
	};

	var randomValuesArray = function (from, to) {
		var arr = [];
		for (var i = from; i < to; i ++) {
			arr.push(random(from, to, arr));
		}
		return arr;
	};

	var test = {
		minVariants: 1,
		maxVariants: 5,
		allQuestions: window.getQuestions(),
		questions: [],
		errors: [],
		defaultVariant: {
			errors: 0,
			count: 10
		},
		userAnswers: []
	};

	test.defaultVariant.count = window.Math.floor(test.allQuestions.length / test.maxVariants);

	window.FirstPageView.create(test, function (test) {
		var countPerVariant = window.Math.floor(test.allQuestions.length / test.maxVariants);
		var start = countPerVariant * (test._variant.variant - test.minVariants);
		test.questions = test.allQuestions.splice(start, test._variant.count);

		window.console && console.log(test.questions.length + '/' + test.allQuestions.length, '[' + start + ',' + (start + test._variant.count) + ']', test._variant);

		var prev = null;
		_.each(test.questions, function (question, index) {
			var currentTest = Object.create(test);

			_.extend(currentTest, question);
			currentTest.currentNumber = index;
			currentTest.counter = index+1;
			currentTest.total = test.questions.length;


			if (!prev) {
				prev = $.when(true);
			}

			prev = prev.then(function () {
				var deferred = $.Deferred();

				var keys = _.keys(currentTest.answers);
				currentTest.sequence = _.map(randomValuesArray(0, keys.length), function (num) {
					return currentTest.answers[keys[num]];
				});

				console.log(currentTest.sequence);
				window.TestPageView.create(currentTest, function () {
					deferred.resolve();
				});

				return deferred.promise();
			});
		});

		prev.then(function () {
			window.ResultPageView.create(test);
			console.log(test);
		});
	});

	$(document).on('keypress', function (e) {
		var start = 48;
		if (e.which > start && e.which <= start + 9) {
			var number = e.which - start;
			$('form').trigger('toggle-answer', number);
		}
	});
});

