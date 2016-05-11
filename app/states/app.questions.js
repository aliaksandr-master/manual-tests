'use strict';

const appMdl = require('./app');

angular
  .module('mt.states.app.questions', [
    appMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.questions', {
      parent: 'app',
      url: '/questions',

      resolve: {
        /*@ngInject*/
        _questions (QuestionStore) {
          return QuestionStore.getAllActiveQuestions();
        }
      },

      views: {
        'app@app': {
          template: '<b-questions data-questions="appQuestionsCtrl.questions"></b-questions>',
          controllerAs: 'appQuestionsCtrl',

          /*@ngInject*/
          controller (_questions) {
            const vm = this;

            vm.questions = _questions;
          }
        }
      }
    });
  });

module.exports = 'mt.states.app.questions';
