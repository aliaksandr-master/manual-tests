"use strict";

$(function () {
	var test = {
		minVariants: 1,
		maxVariants: 15,
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
			var Surrogate = function () {};
			Surrogate.prototype = test;
			var currentTest = new Surrogate();
			_.extend(currentTest, question);
			currentTest.currentNumber = index;

			if (!prev) {
				prev = $.when(true);
			}

			prev = prev.then(function () {
				var deferred = $.Deferred();

				window.TestPageView.create(currentTest, function () {
					deferred.resolve();
				});

				return deferred.promise();
			});
		});

		prev.then(function () {
			window.ResultPageView.create(test);
		});
	});
});

