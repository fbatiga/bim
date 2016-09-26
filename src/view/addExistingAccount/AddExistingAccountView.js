'use strict';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AccountSelectBank from './step/AccountSelectBank';
import AccountLoginInfos from './step/AccountLoginInfos';
import AccountPointsView from './step/AccountPointsView';

class AddExistingAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
      step: 0,
			bank: '',
      user: {
        id: '',
        pwd: ''
      }
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

	render() {
		console.log('STEP', this.state.step);
		switch (this.state.step) {
			case 0:
			default:
			return (<AccountSelectBank title='Comptes' subtitle='Recherchez votre banque :' back={this.back.bind(this)} confirm={this.nextStep.bind(this)}/>);
			break;
			case 1:
			return (<AccountLoginInfos title='Comptes' bank={this.state.bank} back={this.back.bind(this)} confirm={this.nextStep.bind(this)} />);
			break;
			case 2:
			setTimeout(() => { Actions.overview() },1500);
			return (<AccountPointsView title='Comptes' value='+150 pts' />);
			break;
		}
	}

  nextStep(title, value) {
    this.setState({
      step: this.state.step + 1,
      [title]: value
    })
  }
}

export default AddExistingAccount;
