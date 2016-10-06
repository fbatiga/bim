"use strict";
import { firebaseDb } from '../../app/AppFirebase';

export const ACCOUNT_FILTER_ALL = 'account.filter.all';
export const ACCOUNT_FILTER_CREDIT = 'account.filter.credit';
export const ACCOUNT_FILTER_DEBIT = 'account.filter.debit';
export const ACCOUNT_FILTER_CATEGORY = 'account.filter.category';
export const ACCOUNT_FILTER_MONTH = 'account.filter.month';
export const ACCOUNT_ADD_TRANSACTION = 'account.add.transaction';
export const ACCOUNT_SET_TRANSACTIONS = 'account.set.transactions';
export const GET_ACCOUNTS_INFOS = 'account.get.infos';
export const GET_TRANSACTIONS_BY_ACCOUNT = 'account.get.transactions';

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

export function setTransactions(transactions) {
  return {
    type: ACCOUNT_SET_TRANSACTIONS,
    transactions
  };
}

export function getAccountInfos(user, accountName) {
  const firebaseRootRef = firebaseDb.ref();
  const firebaseAccountsRef = firebaseRootRef.child(`${user}/accounts`);
  let accountInfos = {};

  firebaseAccountsRef.once('value', (snapshot) => {
    let accounts = snapshot.val();

    Object.keys(accounts).map((key, index) => {
      let obj = accounts[key];

      if (obj.label === accountName) {
        accountInfos = obj;
      }
    })
  });

  console.log('accountInfos', accountInfos);

  return {
    type: GET_ACCOUNTS_INFOS,
    accountInfos
  }
}

export function getTransactionsByAccount(user, accountName) {
  const firebaseRootRef = firebaseDb.ref();
  const firebaseTransactionsRef = firebaseRootRef.child(`${user}/transactions`);
  let accountTransactions = {};

  firebaseTransactionsRef.once('value', (snapshot) => {
    let transactions = snapshot.val();

    Object.keys(transactions).map((key, index) => {
      let obj = transactions[key];

      if (obj.account === accountName) {
        accountTransactions.push(obj);
      }
    })
  });

  console.log('accountTransactions', accountTransactions);

  return {
    type: GET_TRANSACTIONS_BY_ACCOUNT,
    accountTransactions
  }
}
