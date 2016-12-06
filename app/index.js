'use strict';

import { renderToDom } from 'tiny-component';
import bApp from './components/b-app/b-app';
import { getObject } from './lib/localstorage';
import { getJSON } from './lib/request';
import resolve from './lib/resolve';
import groupBy from 'lodash/groupBy';
import range from 'lodash/range';
import values from 'lodash/values';
import sortBy from 'lodash/sortBy';
import flatten from 'lodash/flatten';
import shuffle from 'lodash/shuffle';
import random from 'lodash/random';
import './index.less';

const MAX_QUESTIONS_IN_TEST = 20;
const DEFAULT_TAG = '@default@';

resolve({
  auth: () => getObject('auth', { first_name: '', last_name: '', group_number: 0 }),
  questions: () => getJSON('/data/questions.json')
    .then((questions) => questions.slice(0, Math.floor(questions.length / MAX_QUESTIONS_IN_TEST) * MAX_QUESTIONS_IN_TEST))
})
.then(resolve.nested({
  questionsByTag: ({ questions }) =>
    groupBy(questions, (question) =>
      String(question.tags[0] || DEFAULT_TAG).trim()
    )
}))
.then(resolve.nested({
  questionsByVariants: ({ questions, questionsByTag }) => {
    const allQuestionsOrderedByTag = flatten(sortBy(values(questionsByTag), 'length'));

    const variants = Math.floor(questions.length / MAX_QUESTIONS_IN_TEST);

    return range(variants)
      .map((variant) =>
        allQuestionsOrderedByTag.filter((question, questionIndex) => {
          let index = questionIndex;

          if ((index / variants) >= 1) {
            index = index - Math.floor(index / variants) * variants;
          }

          return String(index) === String(variant);
        })
      ).map((questions) => shuffle(questions))
  }
}))
.then(resolve.nested({
  test: ({ questionsByVariants }) => {
    const variant = Math.floor(random(0, Object.keys(questionsByVariants).length-1));

    return {
      variant,
      question: 0,
      questions: questionsByVariants[variant],
      errors: [],
      answers: []
    };
  }
}))
.then(({ questions, auth, test, questionsByTag, questionsByVariants }) => {
  const data = {
    store: {
      maxTime: 1 * 10 * 1000, // 30min
      maxQuestions: MAX_QUESTIONS_IN_TEST,
      auth,
      test,
      questions,
      questionsByTag,
      questionsByVariants,
      tags: Object.keys(questionsByTag),
      variants: Object.keys(questionsByVariants)
    }
  };

  window.console && console.log('INIT', data.store);

  window.console && console.log(`variant: ${test.variant} (${test.questions.length}/${questions.length})`);

  renderToDom(bApp(data), document.body);
});

