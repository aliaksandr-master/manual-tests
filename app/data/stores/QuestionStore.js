'use strict';

angular
  .module('mt.data')

  /*@ngInject*/
  .factory('QuestionStore', ($window) => {
    const QuestionStore = {};

    QuestionStore.QUESTION_TYPE = $window.mtApi.QUESTION_TYPE;

    QuestionStore.questionTypes = () => [
      { _id: $window.mtApi.QUESTION_TYPE.SIMPLE, name: 'Simple' }
    ];

    QuestionStore.defaultQuestion = () => ({
      type: $window.mtApi.QUESTION_TYPE.SIMPLE,
      question: '',
      variants: [],
      answers: [],
      tags: []
    });

    QuestionStore.getById = (questionId) =>
      $window.mtApi.getQuestionById(questionId);

    QuestionStore.getAllActiveQuestions = () =>
      $window.mtApi.getAllActiveQuestions();

    QuestionStore.create = (question) =>
      $window.mtApi.createQuestion(question.type, question.question, question.variants, question.answers, question.tags);

    QuestionStore.update = (question) =>
      $window.mtApi.updateQuestion(question._id, question.type, question.question, question.variants, question.answers, question.tags);

    return QuestionStore;
  });
