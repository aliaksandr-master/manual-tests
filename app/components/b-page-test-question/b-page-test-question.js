'use strict';

import Component from 'tiny-component';
import './b-page-test-question.less';
import iterate from '../../lib/dom/iterate';
import dom from '../../lib/component-dom';
import values from 'lodash/values';
import shuffle from 'lodash/shuffle';
import { PAGE_TEST_QUESTION, PAGE_TEST_RESULT, EVENT_CHANGE_PAGE_CONTENT, changePage } from '../../config/actions';


export default Component(({ params: { question }, store: { maxQuestions, test: { questions } } }, $cmp) => {
  const currentQuestion = questions[question];

  const answers = shuffle(values(currentQuestion.answers));

  console.log('верные ответы:', answers
    .map((answ, i) => ({ truth: answ.truth, number: i+1 }))
    .filter((answ) => answ.truth)
    .map((answ) => answ.number)
  );

  return `
    <form class="b-page-test-question" onsubmit="return false;">
      <div class="b-page-test-question__question">${currentQuestion.question}</div>
      <div class="b-page-test-question__answers">
        ${answers.map((answer, index) => `
          <div class="b-page-test-question__answer">
            <div class="b-page-test-question__answer-number">${index+1}</div>
            <div class="b-page-test-question__answer-toggle-wr">
              <input class="b-page-test-question__answer-toggle" name="answer-${index}" value="${answer.number}" type="checkbox" id="b-test__answer-toggle--${index}"/>
              <label class="b-page-test-question__answer-toggle-label" for="b-test__answer-toggle--${index}">${answer.text}</label>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="b-page-test-question__submit-wr clearfix">
        <div class="b-page-test-question__counter">
          ${question + 1}/${maxQuestions}
        </div>
        <button class="b-page-test-question__submit btn-success btn btn-lg" id="b-page-test-question__submit" type="submit">Ответить</button>
      </div>
    </form>
    `;
},
({ params: { question }, store: { maxQuestions, test: { answers, questions, errors } } }, { el, events }) => {
  const { on, serialize } = dom(el, events);
  const currentQuestion = questions[question];

  on(document, 'keypress', ({ which }) => {
    const start = 48;

    if (which > start && which <= start + 9) {
      const number = which - start - 1;

      iterate(el.querySelector(`#b-test__answer-toggle--${number}`), (element) => {
        element.checked = !element.checked;
      });
    }
  });

  iterate(el.querySelector('#b-page-test-question__submit'), (element) => {
    element.focus();
  });

  on('#b-page-test-question__submit', 'click', () => {
    const nextQuestion = question + 1;

    const data = values(serialize('.b-page-test-question__answer-toggle:checked')).sort().map(Number);

    const correctData = values(currentQuestion.answers)
      .filter((answ) => answ.truth)
      .map((answ) => answ.number)
      .map(String)
      .sort()
      .map(Number);

    answers.push(data);

    if (data.join(',') !== correctData.join(',')) {
      errors.push(question);
    }

    if (nextQuestion === maxQuestions) {
      events.$emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_TEST_RESULT));
      return;
    }

    events.$emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_TEST_QUESTION, { question: nextQuestion }));
  });
});
