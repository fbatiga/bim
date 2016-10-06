"use strict";
import { handleActions } from 'redux-actions';
import {
	ACCOUNT_SET_TRANSACTIONS,
	ACCOUNT_FILTER_DEBIT,
	ACCOUNT_FILTER_CREDIT,
	ACCOUNT_FILTER_ALL,
	ACCOUNT_ADD_TRANSACTION } from './AccountAction';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import momentfr from 'moment/locale/fr';

moment.locale('fr');

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
			amount: 1129,
			type: "debit",
			category: "sante",
			timestamp: new Date() + ""
		},
		{
			label: 'Loyer',
			amount: 780,
			type: "credit",
			category: "logement",
			timestamp: new Date() + ""
		}
	],
	currentMonth: 6
};

let categories = {};
initialState.categories.map((value) => {
	categories[value.categoryId] = value;
});

initialState.originalTransactions = initialState.transactions.map((elm, idx) => {
	elm.category = categories[elm.category];
    elm.createdAt = moment(elm.timestamp).calendar();
    return elm;
});
// initialState.originalTransactions = initialState.transactions;

const AccountReducer = handleActions({

	[ACCOUNT_ADD_TRANSACTION]: (state, action) => {
		return {
			...state,
			transactions: [action.transaction].concat(state.originalTransactions)
		};
	},

	[ACCOUNT_SET_TRANSACTIONS]: (state, action) => {
		return {
			...state,
			transactions: action.transactions.concat(state.originalTransactions)
		};
	},

	// [ACCOUNT_FILTER_CREDIT]: (state, action) => {
	// 	const out = state.transactions.filter((elm) => {
	// 		return elm.type === 'credit';
	// 	});
	// 	state.dataSource = ds.cloneWithRows(out);
	//
	// 	return Object.assign({}, state, { loading: false });
	// },
	//
	// [ACCOUNT_FILTER_DEBIT]: (state, action) => {
	// 	const out = state.transactions.filter((elm) => {
	// 		return elm.type === 'debit';
	// 	});
	// 	state.dataSource = ds.cloneWithRows(out);
	//
	// 	return Object.assign({}, state, { loading: false });
	// },
	//
	// [ACCOUNT_FILTER_ALL]: (state, action) => {
	// 	const out = state.transactions;
	// 	state.dataSource = ds.cloneWithRows(out);
	//
	// 	return Object.assign({}, state, { loading: false });
	// }
}, initialState);

export default AccountReducer;
