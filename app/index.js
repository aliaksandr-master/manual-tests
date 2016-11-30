'use strict';

import { renderToDom } from 'tiny-component';
import bApp from './components/b-app/b-app';
import { getObject } from './lib/localstorage';

const data = {
  store: {
    auth: getObject('auth') || {
      first_name: '',
      last_name: '',
      group_number: 0
    },
    test: {
      questions: []
    }
  }
};

console.log(data);

const component = bApp(data);

renderToDom(component, document.body);
