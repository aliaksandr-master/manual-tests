"use strict";

$(function () {
	var allQuestions = window.getQuestions();
	var MAX_QUESTIONS_IN_TEST = 20;

	allQuestions = allQuestions.slice(0, Math.floor(allQuestions.length / MAX_QUESTIONS_IN_TEST)*MAX_QUESTIONS_IN_TEST);

	var test = {
		variants: Math.floor(allQuestions.length / MAX_QUESTIONS_IN_TEST),
		allQuestions: allQuestions,
		questions: [],
		errors: [],
		userAnswers: [],
		tags: []
	};

	var qByTag = {};
	_.each(test.allQuestions, function (q) {
		if (!q.tags || !q.tags.length) {
			return;
		}

		var tag = String(q.tags[0]).trim();

		if (_.isEmpty(qByTag[tag])) {
			qByTag[tag] = [];
		}

		qByTag[tag].push(q);
	});

	test.tags = _.keys(qByTag);

	var qByTagArr = _.sortBy(_.values(qByTag), function (v) {
		return v.length;
	});

	var variants = _.range(test.variants);

	var allQuestionsOrderedByTag = _.map(_.flatten(qByTagArr), function (q, i) {
		q.index = i;

		return q;
	});

	var qTagByVariants = _.map(variants, function (variant) {
		return _.filter(allQuestionsOrderedByTag, function (question, questionIndex) {
			var index = questionIndex;

			if (index / variants.length >= 1) {
				index = index - Math.floor(index / variants.length) * variants.length;
			}

			return index === variant;
		});
	});

	window.FirstPageView.create(test, function (test) {
		test.questions = qTagByVariants[test.variant].slice(0, test._variant.count);

		test.questions = _.shuffle(test.questions);

		window.console && console.log(
			test.variant,
			test.questions.length + '/' + test.allQuestions.length,
			'[' + test.questions.map(function (q) { return q.index }).join(', ') + ']'
		);

		var prev = null;
		_.each(test.questions, function (question, index) {
			var currentTest = _.create(test);

			_.extend(currentTest, question);
			currentTest.currentNumber = index;
			currentTest.counter = index+1;
			currentTest.total = test.questions.length;

			if (!prev) {
				prev = $.when(true);
			}

			prev = prev.then(function () {
				var deferred = $.Deferred();

				currentTest.sequence = _.shuffle(_.values(currentTest.answers));

				if (/test-debug/.test(window.location.hash)) {
					console.log(currentTest.answers);
					console.log('ответы:', currentTest.sequence
						.map(function (answ, i) { return { truth: answ.truth, number: i+1 }; })
						.filter(function (answ) { return answ.truth })
						.map(function (answ) { return answ.number })
					);
				}

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

	$(document).on('keypress', function (e) {
		var start = 48;
		if (e.which > start && e.which <= start + 9) {
			var number = e.which - start;
			$('form').trigger('toggle-answer', number);
		}
	});
});

