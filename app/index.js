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
          .then((content) =>
            content
              .split('\n').filter(Boolean)
              .map((line) => line.split(/\s+/).filter(Boolean).pop())
              .map((content) => new Buffer(content, 'base64').toString('utf8'))
              .map((content) => {
                try {
                  content = JSON.parse(content);
                } catch (er) {
                  content = null;
                }

                return content;
              })
              .filter(Boolean)
          )
      )
    ))
    .then((results) => results.reduce((result, qArr) => result.concat(qArr), []))
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

  renderToDom(bApp(data), document.body, {
    onRender: () => {
      const preloader = document.getElementById('preloader');

      preloader.parentNode.removeChild(preloader);
    }
  });
});

