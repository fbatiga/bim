'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import TransferStyle from './TransferStyle';
import baseStyles from '../../asset/styles.js';
import asset from '../../asset';


import {connect} from 'react-redux';
import {init} from './TransferAction';
import MessengerFabButton from '../messenger/item/MessengerFabButton.js';
import AmountSelectionView from './components/AmountSelectionView.js';
import TransferConfirmView from './components/TransferConfirmView.js';
import TransferTitleInputView from './components/TransferTitleInputView.js';
import RecipientSelectionView from './components/RecipientSelectionView.js';


class TransferView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'B!M',
            amount: '',
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
                return (<AmountSelectionView title={this.state.title}  subtitle={'B!MMER LA SOMME DE'} amount={this.state.amount} confirm={this.confirmAmount.bind(this)}/>);
                break;
            case 1:
                return (<RecipientSelectionView title={this.state.title}  subtitle={'Destinataire'}  confirm={this.confirmRecipient.bind(this)} />);
                break;
            case 2:
                return (<TransferTitleInputView title={this.state.title}  subtitle={'NOMMER CE BIM'}  confirm={this.confirmTitle.bind(this)} />);
                break;
            case 3:
                return (<TransferConfirmView title={this.state.title}
                subtitle={'Confirmer le B1M'}
                amount={this.state.amount}
                transferTitle={this.state.transferTitle} confirm={this.confirmTransfer.bind(this)} />);
                break;
        }
    }

    confirmAmount(amount) {
        this.state.step = this.state.step + 1;
        this.setState({amount: amount, step: this.state.step});
    }

    confirmRecipient(recipient) {
        console.log(recipient);
        this.state.step = this.state.step + 1;
        this.setState({recipient : confirmRecipient,  step: this.state.step });
    }

    confirmTitle(title) {
        this.state.step = this.state.step + 1;
        this.setState({transferTitle: title, step: this.state.step });
    }

    confirmTransfer(title) {
        this.state.step = this.state.step + 1;
     //   this.setState({transferTitle: title, step: this.state.step });
    }

}

function mapStateToProps(state) {
    return {
        transfer: state.transfer
    };
}

export default connect(mapStateToProps)(TransferView);
