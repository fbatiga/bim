"use strict";

import { handleActions } from 'redux-actions';
import { ACCOUNT_REQUEST, ACCOUNT_SUCCESS, ACCOUNT_FAILURE, ACCOUNT_FILTER_DEBIT, ACCOUNT_FILTER_CREDIT , ACCOUNT_FILTER_ALL } from './AccountAction';
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
            id: 'bnp',
            label: 'BNP',
            balance: -1129,
            type: "external"
        },
        {
            id: 'bim',
            label: 'BIM',
            balance: 1129,
            type: "internal"
        },
        {
            id: 'barclays',
            label: "Barclay's",
            balance: -1129,
            type: "external"
        },

    ], currentMonth: 6
};


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
},

[ACCOUNT_SUCCESS]
:
(state, action) => {
    return {
    ...
    state, loading
    :
    false, start
    :
    action.result
};
},

[ACCOUNT_FAILURE]
:
(state, action) => {
    console.error(action.error.stack);
    return {
    ...
    state, loading
    :
    false, start
    :
    false, loginError
    :
    action.error
};
}

},
initialState
)
;

export default AccountReducer;
