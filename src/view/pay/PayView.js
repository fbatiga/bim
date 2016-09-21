'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {firebaseDb} from  '../../app/AppFirebase';
import {connect} from 'react-redux';
import {init} from './PayAction';
import { Actions } from 'react-native-router-flux';

import AmountSelectionStep from '../common/step/AmountSelectionStep';
import ConfirmationStep from '../common/step/ConfirmationStep';
import TitleSelectionStep from '../common/step/TitleSelectionStep';
import QrCodeStep from '../common/step/QrCodeStep';
import RecipientSelectionStep from '../common/step/RecipientSelectionStep';
import SuccessStep from '../common/step/SuccessStep';
import PointsStep from '../common/step/PointsStep';


import AppGuideline from '../../app/AppGuideline';
import AppAsset from '../../app/AppAsset';

class PayView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			amount: null,
			qrCode : false,
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
		if(this.state.step == this.steps.length-2){

			setTimeout(function(){

				this.setState({
					step: this.state.step + 1
				});

			}.bind(this),2000);
		}
		if(this.state.step == this.steps.length-1){
			setTimeout(function(){Actions.account()},1500);
		}
	}

	render() {

		let Title = 'PAYER';

		this.steps = [
			<AmountSelectionStep
				title={Title}
				subtitle={'Somme à verser'}
				amount={this.state.amount}
				confirm={this.confirmAmount.bind(this)}
			/>,
			<TitleSelectionStep
					title={Title}
					back={this.back.bind(this)}
					subtitle={'Nommer ce B!M'}
					confirm={this.confirmTitle.bind(this)} />,
			<RecipientSelectionStep
				title={Title}
				back={this.back.bind(this)}
				subtitle={'Destinataire :'}
				bimOnly={true}
				qrCode={this.qrCode.bind(this)}
				contact={this.props.contact}
				confirm={this.confirmRecipient.bind(this)} />
		];

		if(this.state.qrCode == true){

			this.steps.push(
				<QrCodeStep
					title={Title}
					subtitle={'QR Code à scanner :'}
					back={this.back.bind(this)}
					confirm={this.confirmPay.bind(this)} />
			);

		}else{

			this.steps.push(
				<ConfirmationStep
					title={Title}
					subtitle={'Confirmer le B!M'}
					amount={this.state.amount}
					back={this.back.bind(this)}
					transferLabel={this.state.transferLabel}
					transferRecipient={this.state.transferRecipient}
					confirm={this.confirmPay.bind(this)} />
			);

		}

		this.steps.push(<SuccessStep title={Title} subtitle='B!M envoyé !' />,
						<PointsStep title={Title} />);

		return this.steps[this.state.step];
	}



	qrCode(){
		this.setState({ transferRecipient: 'QR Code',  qrCode: true,step: this.state.step + 1});
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
		let name = [];
		if(recipient.familyName != undefined){
			name.push(recipient.familyName);
		}

		if(recipient.givenName != undefined){
			name.push(recipient.givenName);
		}

		this.setState({transferRecipient: name.join(' '), qrCode: false, step: this.state.step + 1});
	}

	confirmTitle(title) {
		this.setState({transferLabel: title, step: this.state.step + 1});
	}

	confirmPay() {
		this.setState({step: this.state.step + 1});
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
		pay: state.pay,
		contact: state.contact,
		login: state.login
	};
}

export default connect(mapStateToProps)(PayView);
