'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {firebaseDb} from  '../../app/AppFirebase';


import CardSelectAccount from './step/CardSelectAccount';
import CardSelectDuration from './step/CardSelectDuration';
import CardSelectAmmount from '../common/step/AmountSelectionStep';
import RecipientSelectionStep from '../common/step/RecipientSelectionStep';
import CardSelectDesign from './step/CardSelectDesign';
import CardSelectCode from './step/CardSelectCode';
import CardConfirmView from '../common/step/ConfirmationStep';
import CardSuccessView from './step/CardSuccessView';
import CardPointsView from '../addJackpot/step/JackpotPointsView';

class AddCardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: '',
      amount: 10,
	  transferRecipient: '',
      design: 'gris',
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

  	componentDidUpdate(){
		if(this.state.step == this.steps.length-2){

			setTimeout(function(){

				this.setState({
					step: this.state.step + 1
				});

			}.bind(this),2000);
		}
		if(this.state.step == this.steps.length-1){
			setTimeout(Actions.pop,1500);
		}
	}

  render() {

  		let Title = 'Cartes';

  		this.steps = [
  		<CardSelectAccount
  		title='Cartes'
  		subtitle='Compte à débiter'
  		back={this.back.bind(this)}
  		confirm={this.selectAccount.bind(this)}
  		/>,
  		<CardSelectDuration
  		title='Cartes'
  		subtitle='Fréquence des virements :'
  		back={this.back.bind(this)}
  		confirm={this.selectDuration.bind(this)} />,
  		<CardSelectAmmount
  		title='Cartes'
  		subtitle={'Somme à verser :'}
  		back={this.back.bind(this)}
  		amount={this.state.amount}
  		confirm={this.selectAmount.bind(this)}/>,
       	<RecipientSelectionStep
       	title='Cartes'
       	subtitle={'Porteur de la carte :'}
       	bimOnly={true}
       	back={this.back.bind(this)}
       	confirm={this.selectRecipient.bind(this)}/>,
        <CardSelectDesign
        title='Cartes'
        subtitle='Design de la carte :'
        back={this.back.bind(this)}
        confirm={this.selectDesign.bind(this)} />,
        <CardSelectCode
        title='Cartes'
        subtitle='Code de la carte'
        code=''
        back={this.back.bind(this)}
        confirm={this.selectCode.bind(this)} />,
        <CardConfirmView
          card={true}
          title='Cartes'
          duration={this.state.duration}
          amount={this.state.amount}
          recipient={this.state.transferRecipient}
          confirm={this.confirmCard.bind(this)} />,
        <CardSuccessView
        title='Cartes'
        subTitle='Carte crée !'
        recipient={this.state.transferRecipient}
        design={this.state.design} />,
        <CardPointsView
        title='Cartes'
        value='+100 pts' />
        ];

    return this.steps[this.state.step];

  }

  selectAccount(account) {
    this.setState({
      step: this.state.step + 1,
      account
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
    let name = [];

		if(recipient.givenName != undefined){
			name.push(recipient.givenName);
		}

		if(recipient.familyName != undefined){
			name.push(recipient.familyName);
		}

	this.setState({transferRecipient: name.join(' '), step: this.state.step + 1});
  }

  selectDesign(design) {
    this.setState({
      step: this.state.step + 1,
      design
    })
  }

  selectCode(code) {
    this.setState({
      step: this.state.step + 1,
      code
    })
  }

  confirmCard() {
    this.setState({
      step: this.state.step + 1
    })

	let firebaseRootRef = firebaseDb.ref();
	let cardRef = firebaseRootRef.child(this.props.login.username+'/card');

	cardRef.push({
		amount: parseFloat(this.state.amount),
		design: this.state.design,
		code:  this.state.code,
		duration: this.state.duration,
		duration: this.state.account,
		timestamp: Date.now(),
		recipient: this.state.transferRecipient
	});

  }

}



function mapStateToProps(state) {
	return {
		pay: state.pay,
		contact: state.contact,
		login: state.login
	};
}

export default connect(mapStateToProps)(AddCardView);
