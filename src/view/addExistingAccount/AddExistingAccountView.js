'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { firebaseDb } from  '../../app/AppFirebase';
import AccountSelectBank from './step/AccountSelectBank';
import AccountLoginInfos from './step/AccountLoginInfos';
import AccountPointsView from '../common/step/PointsStep';

const mapStateToProps = (state) => {
	return {
		username: state.login.username
	}
};

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
		console.log('state', this.state);

		switch (this.state.step) {
			case 0:
			default:
			return (<AccountSelectBank title='Comptes' subtitle='Recherchez votre banque :' back={this.back.bind(this)} confirm={this.nextStep.bind(this)}/>);
			break;
			case 1:
			return (<AccountLoginInfos title='Comptes' bank={this.state.bank} back={this.back.bind(this)} save={this.save.bind(this)} />);
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
    });
  }

	save(title, value) {
		this.setState({
      step: this.state.step + 1,
      [title]: value
    });

		const firebaseRootRef = firebaseDb.ref();
		const accountRef = firebaseRootRef.child(this.props.username+'/accounts');

		accountRef.push({
			bank: this.state.bank,
			amount: 0
		});
	}
}

export default connect(mapStateToProps)(AddExistingAccount);
