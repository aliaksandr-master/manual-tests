'use strict';

import symbol from '../lib/symbol';
import { setObject } from '../lib/localstorage';

export const EVENT_CHANGE_PAGE_CONTENT = symbol('EVENT_CHANGE_PAGE_CONTENT');
export const PAGE_LOGIN = symbol('PAGE_LOGIN');
export const PAGE_DEFAULT = symbol('PAGE_DEFAULT');
export const PAGE_TEST_START = symbol('PAGE_TEST_START');
export const PAGE_TEST_QUESTION = symbol('PAGE_TEST_QUESTION');
export const PAGE_TEST_RESULT = symbol('PAGE_TEST_RESULT');

export const changePage = (pageId, params) => ({ pageId, params });

export const EVENT_AUTH = symbol('EVENT_AUTH');


export const authAction = ({ first_name, last_name, group_number }) => {
  setObject('auth', { first_name, last_name, group_number });
  return { first_name, last_name, group_number };
};
