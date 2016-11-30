'use strict';

import Component, { renderToDom } from 'tiny-component';
import bPageDefault from '../b-page-default/b-page-default';
import bPageLogin from '../b-page-login/b-page-login';
import './b-app.less';
import { EVENT_CHANGE_PAGE_CONTENT, EVENT_AUTH, PAGE_LOGIN, PAGE_DEFAULT } from '../../config/actions'

const pagesRoutes = {
  [PAGE_LOGIN]: bPageLogin,
  [PAGE_DEFAULT]: bPageDefault
};

const applyContentComponent = (elementParent, events, routeId, data = {}) => {
  if (!Object.keys(pagesRoutes).includes(routeId)) {
    throw new Error(`invalid route id "${routeId}"`);
  }

  const componentBuilder = pagesRoutes[routeId];

  const component = componentBuilder(data, { $$ee: events });

  elementParent.innerHTML = component.toString();

  component.init();

  return component;
};

export default Component(({}, $cmp) =>
`<div class="b-app">
  <div id="b-app__content"></div>
</div>`,
({ store }, { el, events }) => {
  const content = document.getElementById('b-app__content');

  let contentComponent = applyContentComponent(content, events, PAGE_LOGIN, { store });

  events.on(EVENT_CHANGE_PAGE_CONTENT, ({ pageId }) => {
    contentComponent.destroy();
    contentComponent = applyContentComponent(content, events, pageId, { store });

    console.log(store);
  });

  events.on(EVENT_AUTH, (auth) => {
    store.auth = auth;
  });
});
