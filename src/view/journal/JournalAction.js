"use strict";

export const JOURNAL_INIT = 'journal.init';
export const JOURNAL_REQUEST = 'journal.request';
export const JOURNAL_SUCCESS = 'journal.success';
export const JOURNAL_FAILURE = 'journal.failure';


export function init(action) {
  return {
  	    type: JOURNAL_INIT
  };
}
