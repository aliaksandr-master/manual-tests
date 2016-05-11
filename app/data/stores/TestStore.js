'use strict';

angular
  .module('mt.data')

  /*@ngInject*/
  .factory('TestStore', ($window) => {
    const TestStore = {};

    TestStore.getActiveTests = () =>
      $window.mtApi.getActiveTests();

    TestStore.remove = (test) =>
      $window.mtApi.removeTest(test._id);

    TestStore.update = (test) =>
      $window.mtApi.updateTest(test._id, test.name, test.count, test.tags);

    TestStore.create = (test) =>
      $window.mtApi.createTest(test.name, test.count, test.tags);

    TestStore.getById = (testId) =>
      $window.mtApi.getTestById(testId);

    return TestStore;
  });
