"use strict";
import { firebaseDb } from '../../app/AppFirebase';
export const SET_CARD = 'card.set';

function createCard(cardInfos, username) {
  const { amount, design, code, duration, account, timestamp, recipient } = cardInfos;

  const firebaseRootRef = firebaseDb.ref();
  const cardRef = firebaseRootRef.child(username+'/card');

  cardRef.push({
    amount: parseFloat(amount),
    design,
    code,
    duration,
    account,
    timestamp,
    recipient
  });
}

function debitAccount(cardInfos, username) {
  const { amount, account } = cardInfos;

  const firebaseRootRef = firebaseDb.ref();
  const accountRef = firebaseRootRef.child(username+'/accounts');

  accountRef.once('value', (snapshot) => {
    let accounts = snapshot.val();

    Object.keys(accounts).map((key, index) => {
      let obj = accounts[key];

      if (obj.label === account) {
        const userKey = key;
        let userAccount = obj;
        userAccount.balance -= amount;

        firebaseRootRef.child(`${username}/accounts/${userKey}`).set(userAccount);
      } else if (obj.label === 'Mes comptes') {
        const newTotal = obj.balance -= amount;

        firebaseRootRef.child(`${username}/accounts/0`).update({
          balance: newTotal
        });
      }
    });
  })
}

export function processCard(cardInfos, username) {
  createCard(cardInfos, username);
  debitAccount(cardInfos, username);

  return {
    type: SET_CARD
  }
};
