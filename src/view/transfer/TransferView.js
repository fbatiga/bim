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
import asset from '../../asset';
import TransferStyle from './TransferStyle';

class TransferView extends Component {

    constructor(props) {
        super(props);

        const rootRef = firebaseDb.ref();
        this.transactionsRef = rootRef.child('alice/transactions');
        this.recipentTransactionsRef = rootRef.child('eloise/transactions');

        this.state = {
            title: 'B!M',
            amount: '1',
            transferTitle: '',
            transferRecipient: '',
            step: 0
        };
    }

    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        console.log('STEP', this.state.step);
        switch (this.state.step) {
            case 0:
            default:
                return (<AmountSelectionView title={this.state.title}  subtitle={'Sommer à verser'} amount={this.state.amount} confirm={this.confirmAmount.bind(this)}/>);
                break;
            case 1:
                return (<RecipientSelectionView title={this.state.title}  contacts={this.state.contacts} subtitle={'Destinataire'}  confirm={this.confirmRecipient.bind(this)} />);
                break;
            case 2:
                return (<TransferTitleInputView title={this.state.title}  subtitle={'Nommer ce B!M'}  confirm={this.confirmTitle.bind(this)} />);
                break;
            case 3:
                return (<TransferConfirmView
                title={this.state.title}
                subTitle={'Confirmer le B!M'}
                amount={this.state.amount}
                transferTitle={this.state.transferTitle}
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
        this.setState({transferRecipient: recipient.familyName + ' ' + recipient.givenName, step: this.state.step});
    }

    confirmTitle(title) {
        console.log(title);
        this.state.step = this.state.step + 1;
        this.setState({transferTitle: title, step: this.state.step});
    }

    confirmTransfer(title) {
        this.state.step = this.state.step + 1;
        this.setState({transferTitle: title, step: this.state.step});
        this.transactionsRef.push({
            label: this.state.transferTitle + ' (' + this.state.transferRecipient + ')',
            amount: parseFloat(this.state.amount),
            type: "debit",
            category: 'retraits',
            timestamp: new Date() + "",
            recipient: this.state.transferRecipient
        });

        this.recipentTransactionsRef.push(
            {
                label: this.state.transferTitle,
                amount: parseFloat(this.state.amount),
                type: "credit",
                category: 'retraits',
                timestamp: new Date() + "",
                originator: 'Alice'
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
