'use strict';

import Component from 'tiny-component';
import './b-page-test-result.less';
import values from 'lodash/values';

export default Component(({ params: { test: { answers, questionsIds } }, db: { questionsById } }) => {
  const errors = questionsIds.reduce((errors, quetionId, index) => {
    const question = questionsById[quetionId];

    if (!answers[index]) {
      errors.push({ index, question, isAnswered: false });

      return errors;
    }

    const correctAnswer = question.answers.sort().map(String);

    const currentAnswer = answers[index].sort().map(String);

    if (currentAnswer.join(',') !== correctAnswer.join(',')) {
      errors.push({ index, question, isAnswered: true });
    }

    return errors;
  }, []);

  return `
    <div class="b-page-test-result">
      <div class="b-page-test-result__fail-h1">Результаты теста:</div>
      <div class="b-page-test-result__fail-h2">
        Количество правильных ответов: 
        <span class="b-page-test-result__fail-h2-results ${errors.length ? '-error' : ''}">
          ${questionsIds.length - errors.length} / ${questionsIds.length}
        </span>
      </div>
      ${!errors.length ? '' : `
        <div class="b-page-test-result__fail-h3">Перечень вопросов на которые Вы ответили неправильно:</div>
        <div class="b-page-test-result__errors-wr">
          <div class="b-page-test-result__errors">
            ${errors.map(({ question, index, isAnswered }) => `
              <div class="b-page-test-result__error ${isAnswered ? 'b-page-test-result__error--answered' : 'b-page-test-result__error--skiped'}">
                <div class="b-page-test-result__error-number">${index + 1}</div>
                <div class="b-page-test-result__error-text">${question.question}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `}
      <!--<br/>
      <div class="b-page-test-result__reload-btn-wr text-center">
        <button type="button" class="b-page-test-result__reload-btn btn btn-lg btn-success" onclick="window.location.reload()">Попробовать еще раз</button>
        <button type="button" class="b-page-test-result__reload-btn btn btn-lg btn-success" onclick="window.location.reload()">Попробовать еще раз</button>
      </div>-->
    </div>
  `
},
({}, {}) => {

});
