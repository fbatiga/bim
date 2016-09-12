"use strict";

export const ACCOUNT_FILTER_ALL = 'account.filter.all';
export const ACCOUNT_FILTER_CREDIT = 'account.filter.credit';
export const ACCOUNT_FILTER_DEBIT = 'account.filter.debit';
export const ACCOUNT_FILTER_CATEGORY = 'account.filter.category';
export const ACCOUNT_FILTER_MONTH = 'account.filter.month';
export const ACCOUNT_ADD_TRANSACTION = 'account.add.transaction';

export function filterByCredit(action) {
    return {
        type: ACCOUNT_FILTER_CREDIT
    };
}

export function filterByDebit(action) {
  return {
  	    type: ACCOUNT_FILTER_DEBIT
  };
}

export function filterByCategory(cat) {
  return {
  	    type: ACCOUNT_FILTER_CATEGORY,
      params: {category: cat}
  };
}

export function clearFilter(action) {
  return {
  	    type: ACCOUNT_FILTER_ALL
  };
}


export function addTransaction(transaction) {
  return {
  	    type: ACCOUNT_ADD_TRANSACTION,
  	    transaction
  };
}


