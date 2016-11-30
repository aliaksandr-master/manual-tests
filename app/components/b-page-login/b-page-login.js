'use strict';

import Component from 'tiny-component';
import './b-page-login.less';
import dom from '../../lib/component-dom';
import { PAGE_DEFAULT, EVENT_CHANGE_PAGE_CONTENT, EVENT_AUTH, changePage, authAction } from '../../config/actions';

export default Component(({ store: { auth: { first_name, last_name, group_number } } }, $cmp) =>
`<form class="b-page-login" onsubmit="return false;">
  <input name="first_name" required class="b-page-login__input form-control" type="text" value="${first_name || ''}" placeholder="Имя" />
  <input name="last_name" required class="b-page-login__input form-control" type="text" value="${last_name || ''}" placeholder="Фамилия" />
  <input name="group_number" required min="0" max="10000000" step="1" class="b-page-login__input form-control" type="number" value="${group_number || ''}" placeholder="Группа" />
  <button class="b-page-login__submit btn btn-lg" type="submit">Начать тестирование</button>
</form>`,
({ store }, { el, events }) => {
  const { on, serialize } = dom(el, events);

  on('.b-page-login__submit', 'click', () => {
    const auth = serialize('[name]');

    if (!String(auth.first_name).trim() || !String(auth.last_name).trim() || !auth.group_number) {
      return;
    }

    events.$emit(EVENT_AUTH, authAction(auth));
    events.$emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_DEFAULT));
  });
});
