'use strict'
import React, { Component } from 'react';
import { Navigator, Text,  AppState, Platform , View, AsyncStorage} from 'react-native';
import { Actions, Scene, StatusBar, Router , Reducer} from 'react-native-router-flux';
import {connect} from 'react-redux';


import LoginView from '../view/login/LoginView';
import ProfileView from '../view/profile/ProfileView';
import JournalView from '../view/journal/JournalView';
import MessengerView from '../view/messenger/MessengerView';
import AddAccountView from '../view/addAccount/AddAccountView';
import AddJackpotView from '../view/addJackpot/AddJackpotView';
import OverviewView from '../view/overview/OverviewView';
import AccountView from '../view/account/AccountView';
import JackpotView from '../view/jackpot/JackpotView';
import CardView from '../view/card/CardView';
import CardDetailsView from '../view/cardDetails/CardDetailsView';
import ContactView from '../view/contact/ContactView';
import ContactDetailsView from '../view/contactDetails/ContactDetailsView';
import TransferView from '../view/transfer/TransferView';
import ParametersView from '../view/parameters/ParametersView';
import AddCardView from '../view/addCard/AddCardView';
import PayView from '../view/pay/PayView';

import {UserSlack} from '../view/messenger/MessengerReducer';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import Contacts from 'react-native-contacts';
import {loadContacts, setContacts} from '../view/contact/ContactAction';
import {notify, updateProfile, loadSession, setVisibility, addSlackMessage, restartBot} from '../view/messenger/MessengerAction';
import {login, device} from '../view/login/LoginAction';

import {firebaseDb} from  './AppFirebase';


const rootRef = firebaseDb.ref();

const reducerCreate = params => {
	const defaultReducer = Reducer(params);
	return (state, action) => {
		if (action.type == 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
			if(UserSlack != null){
				UserSlack.text('` => ' + action.scene.title + ' <=`', false);
			}
		}
		return defaultReducer(state, action);
	}
};

const scenes = Actions.create(
	<Scene key="root" hideNavBar={true}>
	<Scene key="login" component={LoginView} initial={true} title="Chargement de l'application"/>
	<Scene key="profile" component={ProfileView}  title="Profil" type='replace'/>
	<Scene key="messenger" component={MessengerView} title="Messagerie"/>
	<Scene key="overview" component={OverviewView} title="Consultation des comptes" type='replace'/>
	<Scene key="addAccount" component={AddAccountView} title="addAccount" schema='modal' direction='vertical'/>
	<Scene key="addJackpot" component={AddJackpotView} title="addJackpot"/>
	<Scene key="account" component={AccountView} title="account" type='replace'/>
	<Scene key="jackpot" component={JackpotView} title="jackpot"/>
	<Scene key="card" component={CardView} title="Cartes" type='replace'/>
	<Scene key="addCard" component={AddCardView} title="Ajouter une carte" schema='modal' direction='vertical'/>
	<Scene key="cardDetails" component={CardDetailsView} title="Mes cartes"/>
	<Scene key="contact" component={ContactView} title="Contacts" type='replace'/>
	<Scene key="journal" component={JournalView} title="Journal" type='replace'/>
	<Scene key="contactDetails" component={ContactDetailsView} title="Contact detail"/>
	<Scene key="transfer" component={TransferView} title="Virement" schema='modal' direction='vertical'/>
	<Scene key="parameters" component={ParametersView} title="Paramètres"/>
	<Scene key="pay" component={PayView} title="Payer" schema='modal' direction='vertical'/>
	</Scene>
	);



class AppNavigator extends Component {

	constructor(props) {
		super(props);
		this.pendingNotifications = [];
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.firebaseProfileRef = null;
		this.firebaseMessagesRef = null;
		this.firebaseNotificationRef = null;
		this.appState = null;
	}


	componentDidMount() {
		Contacts.checkPermission( (err, permission) => {
			console.log('Contacts.checkPermission',permission);

			//preloading  contact list
			if(permission === Contacts.PERMISSION_AUTHORIZED){
				Contacts.getAll((err, contacts) => {
					this.props.dispatch(setContacts(contacts));
				});
			}
		});

		OneSignal.configure({
			onIdsAvailable:this.registerDevice.bind(this),
			onNotificationOpened: this.handleNotification.bind(this)
		});

		AppState.addEventListener('change', this.handleAppStateChange);
		OneSignal.enableNotificationsWhenActive(true);
	}


	handleNotification(message, data, isActive){
		console.log('handleNotification',message, data, isActive);
		if(!isActive){

			if(this.props.login.username == false){
				this.props.dispatch(login(message.user));
			}


			this.props.dispatch(setVisibility(true));
		}
	}


	registerDevice(deviceConfig){
		this.props.dispatch(device(deviceConfig));
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	handleAppStateChange(appState) {

		this.appState = appState;
		console.log('handleAppStateChange',appState);

		if (appState === 'background') {
			// if (Platform.OS === 'ios') {
			// 	date = date.toISOString();
			// }

			// PushNotification.localNotificationSchedule({
			// 	message: "My Notification Message",
			// 	date,
			// });
		}

		if (appState === 'active') {


		}
	}



	loadProfile(username){
		this.firebaseMessagesRef = rootRef.child(username+'/slack');
		this.firebaseNotificationRef = rootRef.child(username+'/notification');

		this.firebaseProfileRef = rootRef.child(username+'/profile');

		if(this.props.login.device !== null && this.props.login.device.userId !== null){

			console.log('this.props.login.device', this.props.login.device);

			let firebaseDeviceRef = rootRef.child(username+'/device/'+this.props.login.device.userId);

			firebaseDeviceRef.once('value', function(snapshot) {
				if(snapshot.val()  == null ){
					firebaseDeviceRef.set(this.props.login.device);
				}
			}.bind(this));

		}

		this.firebaseProfileRef.on('value', function(snapshot) {
			let profile = snapshot.val();
			console.log('profile',profile);
			if(profile !== null){

				this.props.dispatch(updateProfile(profile));
			}
		}.bind(this));

		this.firebaseNotificationRef.on('value', function(snapshot) {

			let notification = snapshot.val();
			//console.log('firebaseNotificationRef', notification , this.props.messenger.notification);
			if(notification !== null){
				this.props.dispatch(notify(notification));
			}

			this.firebaseNotificationRef.set(null);

		}.bind(this));

	}


	componentWillReceiveProps(nextProps){
		if(nextProps.login.username != this.props.login.username && nextProps.login.username !== false){
			if(nextProps.login.username == null){
				this.props.dispatch(loadSession('welcome'));
			}else{
				this.loadProfile(nextProps.login.username);
			}
		}

		if(nextProps.messenger.profile && nextProps.messenger.profile.prenom !== undefined && this.props.messenger.profile.prenom == undefined ){

			if( this.props.messenger.session == null){
				this.props.dispatch(loadSession('hello'));
			}else{
				this.props.dispatch(login(nextProps.messenger.profile.username));
			}

		}

		if(this.props.contact.list.length == 0 && this.props.contact.loading == false && nextProps.contact.loading == true){

			Contacts.checkPermission( (err, permission) => {
				console.log('Contacts.checkPermission',permission);

			  // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
			  if(permission == Contacts.PERMISSION_UNDEFINED ){
			  	Contacts.requestPermission( (err, permission) => {
			  		console.log('Contacts.requestPermission',permission);

			  		if (permission === Contacts.PERMISSION_AUTHORIZED) {
			  			Contacts.getAll((err, contacts) => {
			  				console.log('Contacts.getAll');
			  				this.props.dispatch(setContacts(contacts));
			  			});
			  		} else {
			  			this.props.dispatch(setContacts([]));
			  		}
			  	});
			  }else {
			  	this.props.dispatch(setContacts([]));
			  }
			});

		}

		//console.log('firebaseMessagesRef',this.props.messenger.bot, nextProps.messenger.bot );
		if(this.props.messenger.bot !== nextProps.messenger.bot ){


			if(nextProps.messenger.bot == true){

				this.firebaseMessagesRef.off();

				this.props.dispatch(loadSession('restart'));

			}else{

				this.firebaseMessagesRef.on("child_added", function(snapshot) {
					let message = snapshot.val();
					//console.log('child_added ', message);

					if(message.user !== undefined && message.user != 'slackbot' && message.text !== 'fin'){

						this.props.dispatch(addSlackMessage(message.text));

					}else{
						this.props.dispatch(restartBot());
					}

					this.firebaseMessagesRef.child(snapshot.key).remove();

				}.bind(this));
			}
		}

	}


	render() {
		return <Router createReducer={reducerCreate} scenes={scenes} />
	}

}

function mapStateToProps(state) {
	return {
		messenger: state.messenger,
		contact : state.contact,
		login : state.login
	};
}

export default connect(mapStateToProps)(AppNavigator);
