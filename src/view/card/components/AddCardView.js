'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions as routing } from 'react-native-router-flux';

import MessengerFabButton from '../../messenger/item/MessengerFabButton.js';
import CardSelectAccount from './CardSelectAccount';
import CardSelectDuration from './CardSelectDuration';
import CardSelectAmmount from '../../transfer/components/AmountSelectionView';
import CardSelectRecipient from '../../transfer/components/RecipientSelectionView';
import CardSelectDesign from './CardSelectDesign';
import CardSelectCode from './CardSelectCode';
import CardConfirmView from '../../transfer/components/TransferConfirmView';
import CardSuccessView from './CardSuccessView';
import CardPointsView from '../../addAccount/AddJackpot/JackpotPointsView';

class AddJackpot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: '',
      amount: 10,
      recipient: {},
      design: 0,
      step: 0,
    };
  }

  render() {
    console.log('STEP', this.state.step);

    switch (this.state.step) {
      case 0:
      default:
        return (<CardSelectAccount title='Cartes' subtitle='Compte à débiter' confirm={this.selectAccount.bind(this)}/>);
        break;
      case 1:
        return (<CardSelectDuration title='Cartes' subtitle='Fréquence des virements :' confirm={this.selectDuration.bind(this)} />);
        break;
      case 2:
        return (<CardSelectAmmount title='Cartes' subtitle={'Somme à verser :'} amount={this.state.amount} confirm={this.selectAmount.bind(this)}/>);
        break;
      case 3:
        return (<CardSelectRecipient title='Cartes' subTitle={'Porteur de la carte :'} confirm={this.selectRecipient.bind(this)}/>);
        break;
      case 4:
        return (<CardSelectDesign title='Cartes' subtitle='Design de la carte :' confirm={this.selectDesign.bind(this)} />);
        break;
      case 5:
        return (<CardSelectCode title='Cartes' subtitle='Code de la carte' code={true} amount='' confirm={this.selectCode.bind(this)} />);
        break;
      case 6:
        return (<CardConfirmView
          card={true}
          title='Cartes'
          duration={this.state.duration}
          amount={this.state.amount}
          recipient={this.state.recipient}
          confirm={this.confirmCard.bind(this)} />);
        break;
      case 7:
        setTimeout(() => { this.setState({ ...this.state, step: this.state.step + 1 }) },1500);
        return (<CardSuccessView title='Cartes' subTitle='Carte crée !' design={this.state.design} />);
        break;
      case 8:
        setTimeout(() => { routing.card() },1500);
        return (<CardPointsView title='Cartes' value='+100 pts' />);
        break;
    }
  }

  selectAccount() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectDuration(duration) {
    this.setState({
      ...this.state,
      step: this.state.step + 1,
      duration
    })
  }

  selectAmount(amount) {
    this.setState({
      ...this.state,
      step: this.state.step + 1,
      amount
    })
  }

  selectRecipient(recipient) {
    this.setState({
      ...this.state,
      step: this.state.step + 1,
      recipient: recipient.familyName + ' ' + recipient.givenName
    })
  }

  selectDesign(design) {
    this.setState({
      ...this.state,
      step: this.state.step + 1,
      design
    })
  }

  selectCode() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  confirmCard() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

}

export default connect()(AddJackpot);
