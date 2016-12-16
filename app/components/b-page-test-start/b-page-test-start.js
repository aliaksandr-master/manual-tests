'use strict';

import Component from 'tiny-component';
import './b-page-test-start.less';
import dom from '../../lib/component-dom';
import iterate from '../../lib/dom/iterate';
import { PAGE_TEST_QUESTION, EVENT_CHANGE_PAGE_CONTENT, changePage } from '../../config/actions';

const passName = `sec${Date.now()}`;

export default Component(({ db: { questions, maxQuestions, tags } }) =>
`
<div class="b-page-test-start">
  <div style="margin: 0 auto; max-width: 600px;">
    <h4 style="margin: 0 0 5px;">Тест по дисциплине</h4>
    <h2 style="margin: 5px 0 15px;">«Тестирование, оценка программного обеспечения»</h2>
    <p class="b-page-test-start__info" style="margin: 15px auto 15px;">
      Время прохождения теста = 30 минут<br/>
      По истечении времени выполнения теста осуществляется автоматический переход к странице результатов.<br/> 
      Вопросы, на которые Вы не успели ответить, участвуют при подсчете итогового результата теста, при этом ответы на них классифицируются как неправильные.<br/><br/>
      Количество вопросов в тесте = ${maxQuestions} (по ${ tags.length } темам)<br/>
      Вопросы выбираются случайным образом из общего набора.<br/><br/>
      Вопрос может подразумевать несколько правильных вариантов ответа, что отражено в формулировке самого вопроса. Внимательно читайте текст вопроса!<br/>
      Если в ответе на вопрос с несколькими правильными вариантами ответов Вы отметили не все правильные варианты, данный ответ классифицируется как неправильный.<br/>
      Переход к следующему вопросу становится возможным только после того, как по текущему вопросу активирован хотя бы один чек-бокс с вариантом ответа.<br/>
      Пропуск вопросов с последующим возвратом к ним невозможен.<br/><br/>
      Результат в виде общего количества данных Вами правильных ответов приводится только в конце теста.<br/>
      Правильные ответы на вопросы, на которые Вы ответили неправильно, не отображаются.
    </p>
    
    <div class="b-page-test-start__controls text-center" style="margin-top: 20px">
      <input autofocus="autofocus" autocomplete="off" type="password" placeholder="Пароль" name="${passName}" class="form-control text-center b-page-test-start__password" />
      <button id="b-page-test-start__start" class="btn btn-block btn-primary btn-lg">Приступить к тестированию</button>
    </div>
  </div>
</div>
`,
({ store }, { el, events }) => {
  const { on, serialize } = dom(el, events);

  iterate(el.querySelector('#b-page-test-start__start'), (element) => {
    element.focus();
  });

  const date = new Date();
  const salt = date.getDate()+date.getMonth()+1;
  const pass = `${salt}tiramisu${String(salt).length}`;

  on('#b-page-test-start__start', 'click', () => {
    const data = serialize('[name]');

    if (data[passName] !== pass) {
      window.alert('Неверный пароль!');
      return;
    }

    events.$emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_TEST_QUESTION, 0));
  });
});
