'use strict';

import Component from 'tiny-component';
import './b-page-test-start.less';
import dom from '../../lib/component-dom';
import iterate from '../../lib/dom/iterate';
import { PAGE_TEST_QUESTION, EVENT_CHANGE_PAGE_CONTENT, changePage } from '../../config/actions';

export default Component(({ db: { questions, maxQuestions, tags } }) =>
`
<div class="b-page-test-start">
  <form onsubmit="return false;">
    <div class="text-center">
      <div class="clearfix" style="max-width: 350px; margin: 0 auto;">
        <h2>Тестирование</h2>
        <p>${maxQuestions} вопросов по ${ tags.length } темам</p>
        <p class="b-page-test-start__info">Всего вопросов в системе: ${questions.length}</p>
      </div>
    </div>
    <input autofocus="autofocus" autocomplete="off" type="password" placeholder="Password" name="password" class="form-control b-page-test-start__password" />
    <div class="text-center" style="margin-top: 20px">
      <button id="b-page-test-start__start" class="btn btn-success btn-lg">Приступить к тестированию</button>
    </div>
  </form>
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

  console.log(pass);

  on('#b-page-test-start__start', 'click', () => {
    const data = serialize('[name]');

    if (data.password !== pass) {
      window.alert('Неверный пароль!');
      return;
    }

    events.$emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_TEST_QUESTION, 0));
  });
});
