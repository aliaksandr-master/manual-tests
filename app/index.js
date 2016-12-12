'use strict';

import { renderToDom } from 'tiny-component';
import bApp from './components/b-app/b-app';
import { getObject } from './lib/localstorage';
import { getFilesInDir, getFileContent } from './lib/request';
import resolve from './lib/resolve';
import groupBy from 'lodash/groupBy';
import symbol from './lib/symbol';
import './index.less';

const MAX_QUESTIONS_IN_TEST = 28;
const MAX_TIME = 30 * 60 * 1000;

resolve({
  auth: () => getObject('auth', { first_name: '', last_name: '', group_number: 0 }),
  questions: () => getFilesInDir('/data/*.dat4')
    .then((questionFiles) => Promise.all(
      questionFiles.map((questionFile) =>
        getFileContent(questionFile)
          .then((response) => response.text())
          .then((content) => {
            content = new Buffer(content, 'base64').toString('utf8');

            try {
              content = JSON.parse(content);
            } catch (er) {
              content = null;
            }

            return content;
          })
      )
    ))
    .then((questions) => questions.filter(Boolean))
})
.then(resolve.nested({
  questionsByTag: ({ questions }) =>
    groupBy(questions, (question) =>
      String(question.tag).trim()
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

