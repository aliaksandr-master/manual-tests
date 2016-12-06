'use strict';

import { renderToDom } from 'tiny-component';
import bApp from './components/b-app/b-app';
import { getObject } from './lib/localstorage';
import { getJSON } from './lib/request';
import resolve from './lib/resolve';
import groupBy from 'lodash/groupBy';
import symbol from './lib/symbol';
import './index.less';

const MAX_QUESTIONS_IN_TEST = 28;
const MAX_TIME = 30 * 60 * 1000;
const DEFAULT_TAG = '@default@';

resolve({
  auth: () => getObject('auth', { first_name: '', last_name: '', group_number: 0 }),
  questions: () => getJSON('/data/questions.json')
    .then((questions) =>
      questions.map((question) => ({ ...question, id: symbol('question') }))
    )
})
.then(resolve.nested({
  questionsByTag: ({ questions }) =>
    groupBy(questions, (question) =>
      String(question.tags[0] || DEFAULT_TAG).trim()
    )
}))
.then(({ questions, auth, questionsByTag }) => {
  const data = {
    maxTime: MAX_TIME, // 30min
    maxQuestions: MAX_QUESTIONS_IN_TEST,
    auth,
    questions,
    questionsByTag,
    questionsById: questions.reduce((questions, question) => {
      questions[question.id] = question;

      return questions;
    }, {}),
    tags: Object.keys(questionsByTag)
  };

  renderToDom(bApp(data), document.body);
});

