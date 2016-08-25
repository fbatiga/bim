'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions as routing } from 'react-native-router-flux';
import JackpotSelectTitle from './JackpotSelectTitle';
import JackpotSelectDesign from './JackpotSelectDesign';
import JackpotSelectAccount from './JackpotSelectAccount';
import JackpotSelectAmmount from '../../transfer/components/AmountSelectionView';
import JackpotSelectDuration from './JackpotSelectDuration';
import JackpotSelectFriends from './JackpotSelectFriends';
import JackpotConfirmView from './JackpotConfirmView';
import JackpotSuccessView from '../../transfer/components/TransferSuccessView';
import JackpotPointsView from './JackpotPointsView';

class AddJackpot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      amount: 10,
      duration: '',
      step: 0
    };
  }

  render() {
    console.log('STEP', this.state.step);
    switch (this.state.step) {
      case 0:
      default:
        return (<JackpotSelectTitle title='Comptes' subtitle='Nommer cette cagnotte' name={this.state.title} confirm={this.selectTitle.bind(this)}/>);
        break;
      case 1:
        return (<JackpotSelectDesign title='Comptes' subtitle='Design de la cagnotte :' confirm={() => { this.selectDesign(); }} />);
        break;
      case 2:
        return (<JackpotSelectAccount title='Comptes' subtitle='Compte à débiter :' confirm={() => { this.selectAccount(); }} />);
        break;
      case 3:
        return (<JackpotSelectAmmount title='Comptes'  subtitle={'Somme à verser'} amount={this.state.amount} confirm={this.selectAmount.bind(this)}/>);
        break;
      case 4:
        return (<JackpotSelectDuration title='Comptes' subtitle='Fréquence des virements :' confirm={this.selectDuration.bind(this)} />);
        break;
      case 5:
        return (<JackpotSelectFriends title='Comptes' subtitle='Inviter des amis :' confirm={() => { this.selectFriends(); }} />);
        break;
      case 6:
        return (<JackpotConfirmView
        title='Comptes'
        subTitle='Confirmer la Cagnotte'
        name={this.state.title}
        amount={this.state.amount}
        duration={this.state.duration}
        confirm={() => { this.confirmJackpot(); }} />);
        break;
      case 7:
        setTimeout(() => { this.setState({ ...this.state, step: this.state.step + 1 }) },1500);
        return (<JackpotSuccessView title='Comptes' subTitle='Cagnotte crée !' />);
        break;
      case 8:
        setTimeout(() => { routing.overview() },1500);
        return (<JackpotPointsView title='Comptes' value='+150 pts' />);
        break;
    }
  }

  selectTitle(title) {
    this.setState({
      ...this.state,
      step: this.state.step + 1,
      title
    })
  }

  selectDesign() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectAccount() {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  selectAmount(amount) {
    this.setState({
      ...this.state,
      step: this.state.step + 1,
      amount
    })
  }

  selectDuration(duration) {
    this.setState({
      ...this.state,
      step: this.state.step + 1,
      duration
    })
  }

  selectFriends() {
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
