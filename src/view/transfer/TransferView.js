'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {firebaseDb} from  '../../app/AppFirebase';
import {connect} from 'react-redux';
import {init} from './TransferAction';
import { Actions } from 'react-native-router-flux';

import AmountSelectionStep from '../common/step/AmountSelectionStep';
import ConfirmationStep from '../common/step/ConfirmationStep';
import TitleSelectionStep from '../common/step/TitleSelectionStep';
import RecipientSelectionStep from '../common/step/RecipientSelectionStep';
import SuccessStep from '../common/step/SuccessStep';

import AppGuideline from '../../app/AppGuideline';
import AppAsset from '../../app/AppAsset';

class TransferView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			amount: null,
			transferLabel : '',
			transferRecipient: '',
			step: 0
		};
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

	componentDidUpdate(){
		if(this.state.step == this.steps.length-1){
			setTimeout(function(){Actions.account()},1500);
		}
	}

	render() {


		let subtitle = {
			transferConfirmSubtitle:  'Confirmer le B!M',
			transferLabel:  'Nommer ce B!M',
			transferSuccessSubtitle:  'B!M envoyé',
		}


		if(this.props.mode === 'transfer' ){
			subtitle = {
				transferConfirmSubtitle:  'Confirmer le transfert',
				transferLabelSubtitle:  'Nommer ce transfert',
				transferSuccessSubtitle:  'Transfert effectué',
			};
		}

		console.log('STEP', this.state.step);

		let Title= (this.props.mode === 'transfer') ? 'TRANSFERT' : 'B!M';

		this.steps = [
		<AmountSelectionStep
		title={Title}
		back={this.back.bind(this)}
		subtitle={'Somme à verser'}
		amount={this.state.amount}
		confirm={this.confirmAmount.bind(this)}
		/>,
		<RecipientSelectionStep
		title={Title}
		back={this.back.bind(this)}
		subtitle={'Destinataire :'}
		contact={this.props.contact}
		confirm={this.confirmRecipient.bind(this)} />,
		<TitleSelectionStep
		title={Title}
		back={this.back.bind(this)}
		subtitle={subtitle.transferLabelSubtitle}
		confirm={this.confirmTitle.bind(this)} />,
		<ConfirmationStep
		title={Title}
		subTitle={subtitle.transferConfirmSubtitle}
		amount={this.state.amount}
		back={this.back.bind(this)}
		transferLabel={this.state.transferLabel}
		transferRecipient={this.state.transferRecipient}
		confirm={this.confirmTransfer.bind(this)} />,
		<SuccessStep subtitle={subtitle.transferSuccessSubtitle} />
		];

		return this.steps[this.state.step];

	}


	confirmAmount(amount) {
		amount = parseFloat(amount);
		if (!amount) {
			alert('Merci de saisir un montant');
		}
		else {
			this.setState({amount: amount, step: this.state.step + 1});
		}
	}

	confirmRecipient(recipient) {
		console.log(recipient);
		let name = [];
		if(recipient.familyName != undefined){
			name.push(recipient.familyName);
		}

		if(recipient.givenName != undefined){
			name.push(recipient.givenName);
		}

		this.setState({transferRecipient: name.join(' '), step: this.state.step+ 1});
	}

	confirmTitle(title) {
		console.log(title);
		this.setState({transferLabel: title, step: this.state.step+ 1});
	}

	confirmTransfer() {
		this.setState({step: this.state.step+ 1});
		var key = this.state.transferRecipient.split(' ')[0].toLowerCase();

		let firebaseRootRef = firebaseDb.ref();
		let transactionsRef = firebaseRootRef.child(this.props.login.username+'/transactions');

		transactionsRef.push({
			label: this.state.transferLabel + ' (' + this.state.transferRecipient + ')',
			amount: parseFloat(this.state.amount),
			type: "debit",
			category: 'retraits',
			timestamp: Date.now(),
			recipient: this.state.transferRecipient,
			recipientId: key

		});

		let recipentTransactionsRef = firebaseRootRef.child(key + '/transactions');

		recipentTransactionsRef.push(
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
		transfer: state.transfer,
		contact: state.contact,
		login: state.login
	};
}

export default connect(mapStateToProps)(TransferView);
