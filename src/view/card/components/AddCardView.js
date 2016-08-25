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
import CardConfirmView from '../../transfer/components/TransferConfirmView';
import CardSuccessView from './CardSuccessView';

class AddJackpot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Départ Sarah',
      amount: 500,
      step: 0
    };
  }

  render() {
    console.log('STEP', this.state.step);
    switch (this.state.step) {
      case 0:
      default:
        return (<CardSelectAccount title='Cartes' subtitle='Compte à débiter' confirm={() => { this.selectAccount(); }}/>);
        break;
      case 1:
        return (<CardSelectDuration title='Cartes' subtitle='Fréquence des virements :' confirm={() => { this.selectDuration(); }} />);
        break;
      case 2:
        return (<CardSelectAmmount title='Cartes' subtitle={'Somme à verser :'} amount={this.state.amount} confirm={() => { this.selectAmount(); }}/>);
        break;
      case 3:
        return (<CardSelectRecipient title='Cartes' subTitle={'Porteur de la carte :'} confirm={() => { this.selectRecipient(); }}/>);
        break;
      case 4:
        return (<CardSelectDesign title='Cartes' subtitle='Design de la carte :' confirm={() => { this.selectDuration(); }} />);
        break;
      case 5:
        return (<CardSelectAmmount title='Cartes' subtitle='Code de la carte' code={true} amount='0000' confirm={() => { this.selectCode(); }} />);
        break;
      case 6:
        return (<CardConfirmView
          card={true}
          title='Cartes'
          duration='versement mensuel'
          amount='100'
          recipient='Louise Delbosse'
          confirm={() => { this.confirmJackpot(); }} />);
        break;
      case 7:
        // setTimeout(() => { this.setState({ ...this.state, step: this.state.step + 1 }) },1500);
        return (<CardSuccessView title='Cartes' subTitle='Carte crée !' />);
        break;
      case 8:
        // setTimeout(() => { routing.overview() },1500);
        return (<JackpotPointsView title='Comptes' value='+150 pts' />);
        break;
    }
  }

  selectAccount() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectDuration() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectAmount() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectRecipient() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectDesign() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectCode() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }



  selectTitle() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectDesign() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  confirmJackpot() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

}

export default connect()(AddJackpot);
