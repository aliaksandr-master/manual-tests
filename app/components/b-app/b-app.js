'use strict';

import Component, { renderToDom } from 'tiny-component';
import iterate from '../../lib/dom/iterate';
import bPageDefault from '../b-page-default/b-page-default';
import bPageLogin from '../b-page-login/b-page-login';
import bPageTestQuestion from '../b-page-test-question/b-page-test-question';
import bPageTestResult from '../b-page-test-result/b-page-test-result';
import bPageTestStart from '../b-page-test-start/b-page-test-start';
import './b-app.less';
import {
  EVENT_CHANGE_PAGE_CONTENT,
  EVENT_AUTH,
  PAGE_LOGIN,
  PAGE_DEFAULT,
  PAGE_TEST_START,
  PAGE_TEST_QUESTION,
  PAGE_TEST_RESULT
} from '../../config/actions'

const pagesRoutes = {
  [PAGE_LOGIN]: () => bPageLogin,
  [PAGE_TEST_START]: () => bPageTestStart,
  [PAGE_TEST_QUESTION]: () => bPageTestQuestion,
  [PAGE_TEST_RESULT]: () => bPageTestResult,
  [PAGE_DEFAULT]: () => bPageDefault
};

const applyContentComponent = (child, slotElement, routeId, data = {}) => {
  if (!Object.keys(pagesRoutes).includes(routeId)) {
    throw new Error(`invalid route id "${routeId}"`);
  }

  const componentBuilder = pagesRoutes[routeId]();

  const component = child(componentBuilder, data);

  iterate(slotElement.childNodes, (child) => {
    if (child.$component) {
      child.$component.destroy();
    } else {
      slotElement.removeChild(child);
    }
  });

  return renderToDom(component, slotElement);
};

export default Component(({}, $cmp) =>
`<div class="b-app">
  <div class="b-app__content" id="b-app__content"></div>
</div>`,
({ store }, { el, events, child }) => {
  const content = document.getElementById('b-app__content');

  let contentComponent = applyContentComponent(child, content, PAGE_TEST_START, { store });

  events.on(EVENT_CHANGE_PAGE_CONTENT, ({ pageId, params }) => {
    contentComponent.destroy();
    contentComponent = applyContentComponent(child, content, pageId, { store, params });

    console.log(store);
  });

  events.on(EVENT_AUTH, (auth) => {
    store.auth = auth;
  });
});
