"use string";

(function () {
	var questions = [];

	window.addQuestions = function (arr) {
		questions = questions.concat(arr);
	};

	window.getQuestions = function () {
		return questions;
	};

})();
