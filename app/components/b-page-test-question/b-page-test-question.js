'use strict';

import Component from 'tiny-component';
import './b-page-test-question.less';
import iterate from '../../lib/dom/iterate';
import dom from '../../lib/component-dom';
import values from 'lodash/values';
import shuffle from 'lodash/shuffle';
import { PAGE_TEST_QUESTION, PAGE_TEST_RESULT, EVENT_CHANGE_PAGE_CONTENT, changePage } from '../../config/actions';


const CLASS_SUBMIT_DISABLED = 'b-page-test-question__submit--disabled';

export default Component(({ params: { test: { questionIndex, questionsIds } }, db: { questionsById } }) => {
  const currentQuestion = questionsById[questionsIds[questionIndex]];

  const keys = shuffle(Object.keys(currentQuestion.choices)).map(Number);

  console.log(
    keys
      .map((key, index) => currentQuestion.answers.includes(key) ? index + 1 : null)
      .filter(Boolean),
    currentQuestion
  );

  return `
    <form class="b-page-test-question" onsubmit="return false;">
      <div class="b-page-test-question__question">${currentQuestion.question}</div>
      <div class="b-page-test-question__answers">
        ${keys.map((key, index) => `
          <div class="b-page-test-question__answer">
            <div class="b-page-test-question__answer-number">${index+1}</div>
            <div class="b-page-test-question__answer-toggle-wr">
              <input class="b-page-test-question__answer-toggle" name="answer-${index}" value="${key}" type="checkbox" id="b-test__answer-toggle--${index}"/>
              <label class="b-page-test-question__answer-toggle-label" for="b-test__answer-toggle--${index}">${currentQuestion.choices[key]}</label>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="b-page-test-question__submit-wr clearfix">
        <div class="b-page-test-question__counter">
          ${questionIndex + 1}/${questionsIds.length}
        </div>
        <button class="b-page-test-question__submit ${CLASS_SUBMIT_DISABLED} btn-success btn btn-lg" id="b-page-test-question__submit" type="submit">Ответить</button>
      </div>
    </form>
  `;
},
({ params: { test: { answers, questionIndex } }, db: { maxQuestions } }, { el, events }) => {
  const { on, serialize } = dom(el, events);

  const submit = el.querySelector('#b-page-test-question__submit');

  const change = () => {
    const data = values(serialize('.b-page-test-question__answer-toggle:checked'));

    if (data.length) {
      submit.classList.remove(CLASS_SUBMIT_DISABLED);
    } else {
      submit.classList.add(CLASS_SUBMIT_DISABLED);
    }
  };

  on(document, 'keypress', ({ which }) => {
    const start = 48;

    if (which > start && which <= start + 9) {
      const number = which - start - 1;

      iterate(el.querySelector(`#b-test__answer-toggle--${number}`), (element) => {
        element.checked = !element.checked;
      });

      change();
    }
  });

  iterate(el.querySelector('#b-page-test-question__submit'), (element) => {
    element.focus();
  });

  on('.b-page-test-question__answer-toggle', 'change', change);

  on(submit, 'click', () => {
    const nextQuestion = questionIndex + 1;

    const data = values(serialize('.b-page-test-question__answer-toggle:checked'));

    if (!data.length) {
      return;
    }

    answers.push(data);

    if (nextQuestion === maxQuestions) {
      events.$emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_TEST_RESULT));
      return;
    }

    events.$emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_TEST_QUESTION, nextQuestion));
  });
});
