"use strict";

import { handleActions } from 'redux-actions';
import { OVERVIEW_OPEN, OVERVIEW_SET_ACCOUNTS } from './OverviewAction';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import momentfr from 'moment/locale/fr';


const initialState = {
    categories: [
        {label: 'TOUTES', categoryId: "all", color: 'white'},
        {label: 'BANQUE', categoryId: "banque", color: 'violet'},
        {label: 'ABONNEMENTS', categoryId: "abonnements", color: 'orange'},
        {label: 'BARS & RESTAURANT', categoryId: "bar-restaurants", color: 'cyan'},
        {label: 'IMPOTS & TAXES', categoryId: "impots", color: 'blue'},
        {label: 'LOGEMENT', categoryId: "logement", color: 'yellow'},
        {label: 'SANTÉ', categoryId: "sante", color: 'green'},
        {label: 'RETRAITS, CHÈQUES & TRANSFERT', categoryId: "retraits", color: 'lightviolet'},
        {label: 'SORTIE & LOISIRS', categoryId: "sorties", color: 'red'}
    ],
    balance: 2300,
    accounts: [
        {
            id: 'TOUT',
            label: 'Mes Comptes',
            balance: 2300,
            type: "external"
        },
        {
            id: 'Bim',
            label: 'BIM',
            balance: 1129,
            type: "internal"
        },{
            id: 'laposte',
            label: 'La Banque Postale',
            balance: -1429,
            type: "external"
        },
        {
            id: 'boursormama',
            label: "Boursorama",
            balance: -529,
            type: "external"
        },
        {
          id: 'jackpot',
          label: 'Cagnotte',
          balance: '0',
          type: 'jackpot'
        }

    ], currentMonth: 6
};


moment.locale('fr');

const OverviewReducer = handleActions({
  [OVERVIEW_OPEN]: (state, action) => {
    return Object.assign({}, state, {loading: true});
  },

  [OVERVIEW_SET_ACCOUNTS]: (state, action) => {
  	let accounts = [];

  	for(let i in action.accounts){
  		accounts.push(action.accounts[i])
  	}

    console.log('reducer accounts', accounts);

    return { ...state, firebaseAccounts: accounts};
  },
}, initialState);

export default OverviewReducer;
