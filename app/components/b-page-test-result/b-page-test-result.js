'use strict';

import Component from 'tiny-component';
import './b-page-test-result.less';

export default Component(({ store: { test: { errors, questions } }}, $cmp) =>
`
<div class="b-page-test-result">
  <div class="b-page-test-result__fail-h1">Результаты теста:</div>
  <div class="b-page-test-result__fail-h2">
    Количество правильных ответов: 
    <span class="b-page-test-result__fail-h2-results ${errors.length ? '-error' : ''}">
      ${questions.length - errors.length} / ${questions.length}
    </span>
  </div>
  ${!errors.length ? '' : `
    <div class="b-page-test-result__fail-h3">Перечень вопросов на которые Вы ответили неправильно:</div>
    <div class="b-page-test-result__errors-wr">
      <div class="b-page-test-result__errors">
        ${errors.map((index) => `
          <div class="b-page-test-result__error">
            <div class="b-page-test-result__error-number">${index+1}</div>
            <div class="b-page-test-result__error-text">${questions[index].question}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `}
  <br/>
  <div class="b-page-test-result__reload-btn-wr text-center">
    <button type="button" class="b-page-test-result__reload-btn btn btn-lg btn-success" onclick="window.location.reload()">Попробовать еще раз</button>
  </div>
</div>
`,
({}, {}) => {

});
