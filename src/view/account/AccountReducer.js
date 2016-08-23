"use strict";

import { handleActions } from 'redux-actions';
import { ACCOUNT_REQUEST, ACCOUNT_SUCCESS, ACCOUNT_FAILURE, ACCOUNT_FILTER_DEBIT, ACCOUNT_FILTER_CREDIT , ACCOUNT_FILTER_ALL } from './AccountAction';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import momentfr from 'moment/locale/fr';


const initialState = {
    categories: [
        {label: 'TOUT', categoryId: "all", color: 'white'},
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
    previousMonthBalance: 1000,
    transactions: [
        {
            label: 'LE VILLAGE',
            amount: -1129,
            type: "debit",
            category: "sante",
            timestamp: new Date() + ""
        },
        {
            label: 'CAISSE D’ÉPARGNE LOUVRE',
            amount: 1000,
            type: "credit",
            category: 'sante',
            timestamp: new Date() + ""
        },
        {
            label: 'LA FNAC TERNES',
            amount: 900,
            type: "credit",
            category: 'logement',
            timestamp: new Date() + ""
        },
        {
            label: 'BNPPARIBAS GUY MOQUET',
            amount: -199,
            type: "debit",
            category: 'retraits',
            timestamp: new Date() + ""
        },
        {
            label: 'PIROUETTE',
            amount: -1.5,
            type: "debit",
            category: 'impots',
            timestamp: new Date() + ""
        },
        {
            label: 'H&M',
            amount: -349,
            type: "debit",
            category: 'bar-restaurants',
            timestamp: new Date() + ""
        },
        {
            label: 'BIANCO',
            amount: -109.40,
            type: "debit",
            category: 'sorties',
            timestamp: new Date() + ""
        },
        {
            label: 'text faoir ',
            amount: 800,
            type: "credit",
            category: 'abonnements',
            timestamp: new Date() + ""
        },
        {
            label: 'Salaire mi mai',
            amount: 3000,
            type: "credit",
            category: 'banque',
            timestamp: new Date() + ""
        },
        {
            label: 'Frais de gestion ',
            amount: -18,
            type: "debit",
            category: 'banque',
            timestamp: new Date() + ""
        },
        {
            label: 'Prêt de Faou',
            amount: 89,
            type: "credit",
            category: 'banque',
            timestamp: new Date() + ""
        },
        {
            label: 'virement de yy',
            amount: -100,
            type: "debit",
            category: 'sorties',
            timestamp: new Date() + ""
        },
        {
            label: 'RATP navigo',
            amount: -10,
            type: "debit",
            category: 'retraits',
            timestamp: new Date() + ""
        },
        {
            label: 'Franprix',
            amount: -9,
            type: "debit",
            category: 'sorties',
            timestamp: new Date() + ""
        },
        {
            label: 'virement de faouzane',
            amount: 13,
            type: "credit",
            category: "logement",
            timestamp: new Date() + ""
        }
    ], currentMonth: 6
};

let categories = {};
initialState.categories.map((value) => {
    categories[value.categoryId] = value;
});

moment.locale('fr');
initialState.transactions = initialState.transactions.map((elm, idx) => {
    elm.category = categories[elm.category];
    // elm.createdAt = moment(elm.timestamp).format('DD MM YYYY [à] h:mm');
    elm.createdAt = moment(elm.timestamp).calendar();
    return elm;
});
initialState.originalTransactions = initialState.transactions;

const AccountReducer = handleActions({

    [ACCOUNT_REQUEST]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [ACCOUNT_FILTER_CREDIT]: (state, action) => {
        var out = state.originalTransactions.filter((elm) => {
            return elm.type === 'credit';
        });
        state.dataSource = ds.cloneWithRows(out);
        console.log(state);
        return Object.assign({}, state, {loading: false});
    },
    [ACCOUNT_FILTER_DEBIT]: (state, action) => {
        var out = state.originalTransactions.filter((elm) => {
            return elm.type === 'debit';
        });
        state.dataSource = ds.cloneWithRows(out);
        return Object.assign({}, state, {loading: false});
    },
    [ACCOUNT_FILTER_ALL]: (state, action) => {
        var out = state.originalTransactions;
        state.dataSource = ds.cloneWithRows(out);
    }
},
initialState
)
;

export default AccountReducer;
