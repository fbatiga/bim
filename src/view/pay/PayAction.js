"use strict";
import { firebaseDb } from '../../app/AppFirebase';

export const PAY_INIT = 'transfer.init';
export const PAY_REQUEST = 'transfer.request';
export const PAY_SUCCESS = 'transfer.success';
export const PAY_FAILURE = 'transfer.failure';
export const PAY_PROCESS = 'transfer.process';

export function init(action) {
  return {
  	type: PAY_INIT
  };
}

function updateUserAccountBalance(user, label, amount, type) {
  const firebaseRootRef = firebaseDb.ref();
  const firebaseAccountsRef = firebaseRootRef.child(`${user}/accounts`);
  let userAccount = {};
  let userKey = '';

  firebaseAccountsRef.once('value', (snapshot) => {
		let accounts = snapshot.val();

    if (accounts === null) {
      let defaultBalance = 0;
      const newTotal = (type === 'debit' ? defaultBalance -= amount : defaultBalance += amount);
      const defaultAccounts = [
        {
         id: 'TOUT',
         label: 'Mes comptes',
         balance: newTotal,
         type: 'external'
       },
       {
         id: 'Bim',
         label: 'BIM',
         balance: newTotal,
         type: 'internal'
       }
     ];

     firebaseAccountsRef.set(defaultAccounts);
    } else {
      Object.keys(accounts).map((key, index) => {
        let obj = accounts[key];

        if (obj.label === label) {
          userKey = key;
          userAccount = obj;
          type === 'debit' ? userAccount.balance -= amount : userAccount.balance += amount;

          firebaseRootRef.child(`${user}/accounts/${userKey}`).set(userAccount);
        } else if (obj.label === 'Mes comptes') {
          const newTotal = (type === 'debit' ? obj.balance -= amount : obj.balance += amount);

          firebaseRootRef.child(`${user}/accounts/0`).update({
            balance: newTotal
          });
        }
      });
    }
	});
}

function saveTransactions(transferInfos) {
  const { recipient, recipientId, originator, amount, account, name, qr } = transferInfos;

  const firebaseRootRef = firebaseDb.ref();
  const originatorRef = firebaseRootRef.child(`${originator}/transactions`);
  const recipientRef = firebaseRootRef.child(`${recipientId}/transactions`);

  if (!qr) {
    recipientRef.push({
    	label: name,
    	amount: parseFloat(amount),
    	type: "credit",
    	category: 'credit',
    	timestamp: Date.now(),
    	originator: originator
    });
  }

  originatorRef.push({
  	label: `${name} (${recipient})`,
  	amount: parseFloat(amount),
  	type: "debit",
  	category: 'retraits',
  	timestamp: Date.now(),
  	recipient: recipient,
  	account: account,
  	recipientId: recipientId
  });
}

function updateAccounts(transferInfos) {
  const { recipient, recipientId, originator, amount, account, qr } = transferInfos;

  if (qr) {
    updateUserAccountBalance(originator, account, amount, 'debit');
  } else {
    updateUserAccountBalance(recipientId, 'BIM', amount, 'credit');
    updateUserAccountBalance(originator, account, amount, 'debit');
  }
}

export function processTransfer(transferInfos) {
  saveTransactions(transferInfos);
  updateAccounts(transferInfos);

  return {
    type: PAY_PROCESS
  }
}
