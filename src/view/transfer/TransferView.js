'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {firebaseDb} from  '../../app/AppFirebase';
import {connect} from 'react-redux';
import {init} from './TransferAction';
import { Actions } from 'react-native-router-flux';

import AmountSelectionView from './components/AmountSelectionView.js';
import TransferConfirmView from './components/TransferConfirmView.js';
import TransferTitleInputView from './components/TransferTitleInputView.js';
import RecipientSelectionView from './components/RecipientSelectionView.js';
import TransferSuccessView from './components/TransferSuccessView.js';

import baseStyles from '../../styles/vars.js';
import asset from '../common/asset';
import TransferStyle from './TransferStyle';

class TransferView extends Component {

	constructor(props) {
		super(props);

		this.firebaseRootRef = firebaseDb.ref();
		this.transactionsRef = this.firebaseRootRef.child('alice/transactions');

		console.log('APP PROPS', props);
		this.state = {
			amount: null,
			transferLabel: this.props.mode === 'transfer' ? 'Nommer ce transfert' : 'Nommer ce B!M',
			transferRecipient: '',

			title: this.props.mode === 'transfer' ? 'TRANSFERT' : 'B!M',
			transferInputSubtitle: this.props.mode === 'transfer' ? 'Nommer ce transfert' : 'Nommer ce B!M',
			transferConfirmSubtitle: this.props.mode === 'transfer' ? 'Confirmer le transfert' : 'Confirmer le B!M',
			transferSuccessSubtitle: this.props.mode === 'transfer' ? 'Transfert effectué' : 'B!M envoyé',
			step: 0
		};
	}

	componentDidMount() {
		this.props.dispatch(init());
	}

	componentWillReceiveProps(nextProps) {

	}

	back(){
		if(this.state.step == 0){
			Actions.pop();
		}else{
			this.setState({
				step: this.state.step - 1
			});
		}
	}

	render() {
		console.log('STEP', this.state.step);
		switch (this.state.step) {
			case 0:
			default:
			return (<AmountSelectionView title={this.state.title}    back={this.back.bind(this)}  subtitle={'Somme à verser'} amount={this.state.amount} confirm={this.confirmAmount.bind(this)}/>);
			break;
			case 1:
			return (<RecipientSelectionView title={this.state.title} back={this.back.bind(this)}  subtitle={'Destinataire'} contacts={this.state.contacts} confirm={this.confirmRecipient.bind(this)} />);
			break;
			case 2:
			return (<TransferTitleInputView title={this.state.title} back={this.back.bind(this)}  subtitle={this.state.transferInputSubtitle}  confirm={this.confirmTitle.bind(this)} />);
			break;
			case 3:
			return (<TransferConfirmView
				title={this.state.title}
				subTitle={this.state.transferConfirmSubtitle}
				amount={this.state.amount}
				back={this.back.bind(this)}
				transferLabel={this.state.transferLabel}
				transferRecipient={this.state.transferRecipient}
				confirm={this.confirmTransfer.bind(this)} />);
			break;
			case 4:
			setTimeout(function(){Actions.account()},1500);
			return (<TransferSuccessView subTitle='B!M envoyé !' />);
			break;
		}
	}

	confirmAmount(amount) {
		this.state.step = this.state.step + 1;
		amount = parseFloat(amount);
		if (!amount) {
			alert('Merci de saisir un montant');
		}
		else {
			this.setState({amount: amount, step: this.state.step});
		}
	}

	confirmRecipient(recipient) {
		console.log(recipient);
		this.state.step = this.state.step + 1;
		let name = [];
		if(recipient.familyName != undefined){
			name.push(recipient.familyName);
		}

		if(recipient.givenName != undefined){
			name.push(recipient.givenName);
		}

		this.setState({transferRecipient: name.join(''), step: this.state.step});
	}

	confirmTitle(title) {
		console.log(title);
		this.state.step = this.state.step + 1;
		this.setState({transferLabel: title, step: this.state.step});
	}

	confirmTransfer() {
		this.state.step = this.state.step + 1;
		this.setState({step: this.state.step});
		var key = this.state.transferRecipient.replace(" ","_").toLowerCase();

		this.transactionsRef.push({
			label: this.state.transferLabel + ' (' + this.state.transferRecipient + ')',
			amount: parseFloat(this.state.amount),
			type: "debit",
			category: 'retraits',
			timestamp: Date.now(),
			recipient: this.state.transferRecipient,
			recipientId: key

		});


		this.recipentTransactionsRef = this.firebaseRootRef.child(key + '/transactions');

		this.recipentTransactionsRef.push(
		{
			label: this.state.transferLabel,
			amount: parseFloat(this.state.amount),
			type: "credit",
			category: 'retraits',
			timestamp: Date.now(),
			originator: 'alice'
		}
		);
	}

}

function mapStateToProps(state) {
	return {
		transfer: state.transfer
	};
}

export default connect(mapStateToProps)(TransferView);
