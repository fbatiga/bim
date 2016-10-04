'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {firebaseDb} from  '../../app/AppFirebase';
import {connect} from 'react-redux';
import {init} from './PayAction';
import { Actions } from 'react-native-router-flux';

import AmountSelectionStep from '../common/step/AmountSelectionStep';
import AccountsSelectionStep from '../common/step/AccountsSelectionStep';
import RecipientSelectionStep from '../common/step/RecipientSelectionStep';
import QrCodeStep from '../common/step/QrCodeStep';
import TitleSelectionStep from '../common/step/TitleSelectionStep';
import ConfirmationStep from '../common/step/ConfirmationStep';
import SuccessStep from '../common/step/SuccessStep';
import PointsStep from '../common/step/PointsStep';

import AppGuideline from '../../app/AppGuideline';
import AppAsset from '../../app/AppAsset';
import { processTransfer } from './PayAction';

class PayView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: null,
			transferAccount: '',
			transferRecipient: '',
			transferRecipientId: '',
			qrCode : false,
			transferLabel : '',
			step: 0
		};
	}

	back() {
		if (this.state.step == 0) {
			Actions.pop();
		} else {
			this.setState({
				step: this.state.step - 1
			});
		}
	}

	componentDidUpdate() {
		if (this.state.step == this.steps.length-2) {
			setTimeout(function() {
				this.setState({
					step: this.state.step + 1
				});
			}.bind(this),2000);
		}
		if (this.state.step == this.steps.length-1) {
			setTimeout(function(){Actions.account()},1500);
		}
	}

	render() {
		console.log('step', this.state.step);
		console.log('state', this.state);

		let Title = 'PAYER';

		this.steps = [
			<AmountSelectionStep
				title={Title}
				subtitle={'Somme à verser :'}
				amount={this.state.amount}
				confirm={this.confirmAmount.bind(this)}
			/>,
			<AccountsSelectionStep
				title={Title}
				subtitle={'Compte à débiter :'}
				accounts={this.props.firebaseAccounts}
				back={this.back.bind(this)}
				confirm={this.confirmAccount.bind(this)}
			/>,
			<RecipientSelectionStep
				title={Title}
				back={this.back.bind(this)}
				subtitle={'Destinataire :'}
				bimOnly={true}
				qrCode={this.qrCode.bind(this)}
				contact={this.props.contact}
				confirm={this.confirmRecipient.bind(this)}
			/>,
			<TitleSelectionStep
				title={Title}
				subtitle={'Nommer ce B!M'}
				name={this.state.transferLabel}
				back={this.back.bind(this)}
				confirm={this.confirmTitle.bind(this)}
			/>
		];

		if (this.state.qrCode == true) {
			this.steps.push(
				<QrCodeStep
					title={Title}
					subtitle={'QR Code à scanner :'}
					back={this.back.bind(this)}
					confirm={this.confirmPay.bind(this)} />
			);
		} else {
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

		this.steps.push(
			<SuccessStep title={Title} subtitle='B!M envoyé !' />,
			<PointsStep title={Title} />
		);

		return this.steps[this.state.step];
	}

	confirmAmount(amount) {
		amount = parseFloat(amount);

		if (!amount) {
			alert('Merci de saisir un montant');
		} else {
			this.setState({
				amount: amount,
				step: this.state.step + 1
			});
		}
	}

	confirmAccount(account) {
		this.setState({
			transferAccount: account,
			step: this.state.step + 1
		});
	}

	confirmRecipient(recipient) {
		let name = [];

		console.log(recipient);

		if (recipient.familyName != undefined) {
			name.push(recipient.familyName);
		}

		if(recipient.givenName != undefined){
			name.push(recipient.givenName);
		}

		this.setState({
			transferRecipient: name.join(' '),
			transferRecipientId: recipient.username,
			qrCode: false,
			step: this.state.step + 1
		});
	}

	qrCode(){
		this.setState({
			transferRecipient: 'QR Code',
			qrCode: true,
			step: this.state.step + 1
		});
	}

	confirmTitle(title) {
		this.setState({
			transferLabel: title,
			step: this.state.step + 1
		});
	}

	confirmPay() {
		this.setState({
			step: this.state.step + 1
		});

		const transferInfos = {
			recipient: this.state.transferRecipient,
			recipientId: this.state.transferRecipientId,
			originator: this.props.login.username,
			amount: this.state.amount,
			account: this.state.transferAccount,
			name: this.state.transferLabel,
			qr: this.state.qrCode
		}

		this.props.processTransfer(transferInfos);
	}
}

function mapStateToProps(state) {
	return {
		pay: state.pay,
		contact: state.contact,
		login: state.login,
		firebaseAccounts: state.overview.firebaseAccounts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		processTransfer: (transferInfos) => {
			dispatch(processTransfer(transferInfos));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PayView);
