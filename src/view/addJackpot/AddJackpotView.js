'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import JackpotSelectTitle from './step/JackpotSelectTitle';
import JackpotSelectDesign from './step/JackpotSelectDesign';
import JackpotSelectAccount from './step/JackpotSelectAccount';
import JackpotSelectAmmount from '../transfer/step/AmountSelectionView';
import JackpotSelectDuration from './step/JackpotSelectDuration';
import JackpotSelectFriends from './step/JackpotSelectFriends';
import JackpotConfirmView from './step/JackpotConfirmView';
import JackpotSuccessView from '../transfer/step/TransferSuccessView';
import JackpotPointsView from './step/JackpotPointsView';

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
			return (<JackpotSelectTitle title='Comptes' subtitle='Nommer cette cagnotte' back={this.back.bind(this)} back={this.back.bind(this)} name={this.state.title} confirm={this.selectTitle.bind(this)}/>);
			break;
			case 1:
			return (<JackpotSelectDesign title='Comptes' subtitle='Design de la cagnotte :' back={this.back.bind(this)} confirm={() => { this.selectDesign(); }} />);
			break;
			case 2:
			return (<JackpotSelectAccount title='Comptes' subtitle='Compte à débiter :' back={this.back.bind(this)} confirm={() => { this.selectAccount(); }} />);
			break;
			case 3:
			return (<JackpotSelectAmmount title='Comptes'  subtitle={'Somme à verser'} back={this.back.bind(this)} amount={this.state.amount} confirm={this.selectAmount.bind(this)}/>);
			break;
			case 4:
			return (<JackpotSelectDuration title='Comptes' subtitle='Fréquence des virements :' back={this.back.bind(this)} confirm={this.selectDuration.bind(this)} />);
			break;
			case 5:
			return (<JackpotSelectFriends title='Comptes' subtitle='Inviter des amis :' back={this.back.bind(this)} confirm={() => { this.selectFriends(); }} />);
			break;
			case 6:
			return (<JackpotConfirmView
				title='Comptes'
				subTitle='Confirmer la Cagnotte'
				name={this.state.title}
				back={this.back.bind(this)}
				amount={this.state.amount}
				duration={this.state.duration}
				confirm={() => { this.confirmJackpot(); }} />);
			break;
			case 7:
			setTimeout(() => { this.setState({  step: this.state.step + 1 }) },1500);
			return (<JackpotSuccessView title='Comptes' subTitle='Cagnotte crée !' />);
			break;
			case 8:
			setTimeout(() => { Actions.overview() },1500);
			return (<JackpotPointsView title='Comptes' value='+150 pts' />);
			break;
		}
	}

	selectTitle(title) {
		this.setState({
			step: this.state.step + 1,
			title
		})
	}

	selectDesign() {
		this.setState({
			step: this.state.step + 1
		})
	}

	selectAccount() {
		this.setState({
			step: this.state.step + 1
		})
	}

	selectAmount(amount) {
		this.setState({
			step: this.state.step + 1,
			amount
		})
	}

	selectDuration(duration) {
		this.setState({
			step: this.state.step + 1,
			duration
		})
	}

	selectFriends() {
		this.setState({
			step: this.state.step + 1
		})
	}

	confirmJackpot() {
		this.setState({
			step: this.state.step + 1
		})
	}

}

export default connect()(AddJackpot);
