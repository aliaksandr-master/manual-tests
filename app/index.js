'use strict';

import { renderToDom } from 'tiny-component';
import bApp from './components/b-app/b-app';
import { getObject } from './lib/localstorage';
import { getTestData } from './lib/request';
import resolve from './lib/resolve';
import groupBy from 'lodash/groupBy';
import './index.less';

resolve({
  auth: () => getObject('auth', { first_name: '', last_name: '', group_number: 0 }),
  test: () => getTestData()
})
.then(resolve.nested({
  questionsByTag: ({ test: { questions } }) =>
    groupBy(questions, (question) =>
      String(question.tag).trim()
    )
}))
.then(({ test, auth, questionsByTag }) => {
  const data = {
    test: test.meta,
    maxTime: test.meta.duration, // 30min
    maxQuestions: test.meta.count,
    auth,
    questions: test.questions,
    questionsByTag,
    questionsById: test.questions.reduce((questions, question) => {
      questions[question.id] = question;

      return questions;
    }, {}),
    tags: Object.keys(questionsByTag)
  };

  renderToDom(bApp(data), document.body, {
    onRender: () => {
      const preloader = document.getElementById('preloader');

      preloader.parentNode.removeChild(preloader);
    }
  });
});

