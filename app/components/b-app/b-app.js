'use strict';

import Component, { renderToDom } from 'tiny-component';
import componentDestroy from '../../lib/component-destroy';
import iterate from '../../lib/dom/iterate';
import symbol from '../../lib/symbol';
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
  PAGE_TEST_RESULT,
  changePage
} from '../../config/actions'

import once from 'lodash/once';


const timeIterator = (delay, iterator) => {
  let allowTick = true;
  const stemp = Date.now();
  const tick = (delay, iterator) => {
    if (!allowTick) {
      return;
    }
    window.requestAnimationFrame(() => {
      if (!allowTick) {
        return;
      }

      iterator(Date.now() - stemp);

      setTimeout(() => {
        tick(delay, iterator);
      }, delay);
    });
  };

  tick(delay, iterator);

  return once(() => {
    allowTick = false;
  });
};

const pagesRoutes = {
  [PAGE_LOGIN]: () => bPageLogin,
  [PAGE_TEST_START]: () => bPageTestStart,
  [PAGE_TEST_QUESTION]: () => bPageTestQuestion,
  [PAGE_TEST_RESULT]: () => bPageTestResult,
  [PAGE_DEFAULT]: () => bPageDefault
};

const TIME_IS_OVER = symbol('TIME_IS_OVER');
const START_TEST = symbol('START_TEST');
const FINISH_TEST = symbol('FINISH_TEST');

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
  <div class="b-app__footer">
    <div class="b-app__timer"></div>  
  </div>
</div>`,
({ store }, { el, events, child }) => {
  const cleanups = [];
  const content = document.getElementById('b-app__content');

  let contentComponent = applyContentComponent(child, content, PAGE_TEST_START, { store });

  events.on(EVENT_CHANGE_PAGE_CONTENT, ({ pageId, params }) => {
    contentComponent.destroy();
    contentComponent = applyContentComponent(child, content, pageId, { store, params });

    if (pageId === PAGE_TEST_QUESTION && params.question === 0) {
      events.emit(START_TEST);
    }

    if (pageId === PAGE_TEST_RESULT) {
      events.emit(FINISH_TEST);
    }

    console.log(store);
  });

  events.on(EVENT_AUTH, (auth) => {
    store.auth = auth;
  });

  const max = store.maxTime;
  let timer = el.querySelector('.b-app__timer');

  let stopTimer = () => {};

  events.on(START_TEST, () => {
    stopTimer = timeIterator(200, (diffMs) => {
      diffMs = max - diffMs;

      if (diffMs < 0) {
        timer.innerText = '';
        stopTimer();
        events.emit(TIME_IS_OVER);
        return;
      }

      const diffMin = Math.floor(diffMs / 60000);
      const diffSec = Math.ceil(diffMs / 1000 - diffMin * 60);

      timer.innerText = `${diffMin}:${diffSec < 10 ? `0${diffSec}` : diffSec}`;
    });

    cleanups.push(stopTimer);
    events.on(FINISH_TEST, stopTimer);
  });

  events.on(TIME_IS_OVER, () => {
    events.emit(EVENT_CHANGE_PAGE_CONTENT, changePage(PAGE_TEST_RESULT));
  });

  return componentDestroy(cleanups);
});
