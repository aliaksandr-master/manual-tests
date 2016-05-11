'use strict';

const appMdl = require('./app');

angular
  .module('mt.states.app.question-form', [
    appMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.question-form', {
      parent: 'app',
      url: '/question/:questionId/form',
      params: {
        questionId: 'new'
      },

      resolve: {
        _question (QuestionStore, $stateParams) {
          if ($stateParams.questionId !== 'new') {
            return QuestionStore.getById($stateParams.questionId);
          }

          return QuestionStore.defaultQuestion();
        }
      },

      views: {
        'app@app': {
          template: '<b-question-form data-question="appQuestionFormCtrl.question"></b-question-form>',
          controllerAs: 'appQuestionFormCtrl',

          /*@ngInject*/
          controller (_question) {
            const vm = this;

            vm.question = _question;
          }
        }
      }
    });
  });

module.exports = 'mt.states.app.question-form';
