'use strict';

import { renderToDom } from 'tiny-component';
import bApp from './components/b-app/b-app';
import { getObject } from './lib/localstorage';
import { getJSON } from './lib/request';
import resolve from './lib/resolve';



resolve({
  auth: () => getObject('auth'),
  questions: () => getJSON('/data/questions.json')
}).then(({ questions }) => {
  const data = {
    store: {
      auth: getObject('auth') || {
        first_name: '',
        last_name: '',
        group_number: 0
      },
      test: {
        questions
      }
    }
  };

  renderToDom(bApp(data), document.body);
});

