'use strict';

require('./b-question-form.less');
const template = require('./b-question-form.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bQuestionForm', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bQuestionForm',

    scope: {
      question: '='
    },

    /*@ngInject*/
    controller (_, QuestionStore, $state) {
      const vm = this;

      vm.types = QuestionStore.questionTypes();

      vm.removeVariant = (index) => {
        vm.question.variants.splice(index, 1);

        vm.question.answers = _.without(vm.question.answers, index);
      };

      vm.isActive = (index) => {
        if (vm.question.type === QuestionStore.QUESTION_TYPE.SIMPLE) {
          return _.includes(vm.question.answers, index);
        }
        return _.includes(vm.question.answers, index);
      };

      vm.toggleVariantActive = (index) => {

      };

      vm.save = () => {
        if (vm.question._id) {
          QuestionStore.update(vm.question);
        } else {
          QuestionStore.create(vm.question);
        }

        $state.go('app.questions', {}, { reload: true });
      };
    }
  }));
