'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import CardSelectAccount from './step/CardSelectAccount';
import CardSelectDuration from './step/CardSelectDuration';
import CardSelectAmmount from '../common/step/AmountSelectionStep';
import CardSelectRecipient from '../common/step/RecipientSelectionStep';
import CardSelectDesign from './step/CardSelectDesign';
import CardSelectCode from './step/CardSelectCode';
import CardConfirmView from '../common/step/ConfirmationStep';
import CardSuccessView from './step/CardSuccessView';
import CardPointsView from '../addJackpot/step/JackpotPointsView';

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
        return (<CardSelectAccount title='Cartes' subtitle='Compte à débiter' back={this.back.bind(this)} confirm={this.selectAccount.bind(this)}/>);
        break;
      case 1:
        return (<CardSelectDuration title='Cartes' subtitle='Fréquence des virements :' back={this.back.bind(this)} confirm={this.selectDuration.bind(this)} />);
        break;
      case 2:
        return (<CardSelectAmmount title='Cartes' subtitle={'Somme à verser :'} back={this.back.bind(this)} amount={this.state.amount} confirm={this.selectAmount.bind(this)}/>);
        break;
      case 3:
        return (<CardSelectRecipient title='Cartes' subtitle={'Porteur de la carte :'} back={this.back.bind(this)} confirm={this.selectRecipient.bind(this)}/>);
        break;
      case 4:
        return (<CardSelectDesign title='Cartes' subtitle='Design de la carte :' back={this.back.bind(this)} confirm={this.selectDesign.bind(this)} />);
        break;
      case 5:
        return (<CardSelectCode title='Cartes' subtitle='Code de la carte' code={true} amount='' back={this.back.bind(this)} confirm={this.selectCode.bind(this)} />);
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
        setTimeout(() => { Actions.pop() },1500);
        return (<CardPointsView title='Cartes' value='+100 pts' />);
        break;
    }
  }

  selectAccount() {
    this.setState({
      step: this.state.step + 1
    })
  }

  selectDuration(duration) {
    this.setState({
      step: this.state.step + 1,
      duration
    })
  }

  selectAmount(amount) {
    this.setState({
      step: this.state.step + 1,
      amount
    })
  }

  selectRecipient(recipient) {
    this.setState({
      step: this.state.step + 1,
      recipient: recipient.familyName + ' ' + recipient.givenName
    })
  }

  selectDesign(design) {
    this.setState({
      step: this.state.step + 1,
      design
    })
  }

  selectCode() {
    this.setState({
      step: this.state.step + 1
    })
  }

  confirmCard() {
    this.setState({
      step: this.state.step + 1
    })
  }

}

export default connect()(AddJackpot);
