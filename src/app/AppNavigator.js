'use strict'
import React, { Component } from 'react';
import { Navigator, Text,  AppState, Platform , View } from 'react-native';
import { Actions, Scene, StatusBar, Router , Reducer} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {notify} from '../view/messenger/MessengerAction';

import LoginView from '../view/login/LoginView';
import ProfileView from '../view/profile/ProfileView';
import JournalView from '../view/journal/JournalView';
import MessengerView from '../view/messenger/MessengerView';
import AddAccountView from '../view/addAccount/AddAccountView';
import AddJackpotView from '../view/addAccount/AddJackpot/AddJackpotView';
import OverviewView from '../view/overview/OverviewView.js';
import AccountView from '../view/account/AccountView';
import JackpotView from '../view/jackpot/JackpotView';
import CardView from '../view/card/CardView';
import CardDetailsView from '../view/card-details/CardDetailsView';
import ContactView from '../view/contact/ContactView';
import ContactDetailsView from '../view/contact-details/ContactDetailsView';
import TransferView from '../view/transfer/TransferView';
import ParametersView from '../view/parameters/ParametersView';
import AddCardView from '../view/card/components/AddCardView';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {firebaseDb} from  './AppFirebase';
import { UserSlack } from './AppSlack';

//const firebaseRef = firebaseDb.ref('alice/device');

const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        if (action.type == 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
            UserSlack.text('` => ' + action.scene.title + ' <=`', false);
        }
        return defaultReducer(state, action);
    }
};

const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="login" component={LoginView} initial={true} title="Chargement de l'application"/>
        <Scene key="profile" component={ProfileView} title="Profil" type='replace'/>
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
        <Scene key="contactdetails" component={ContactDetailsView} title="Contact detail"/>
        <Scene key="transfer" component={TransferView} title="Virement" schema='modal' direction='vertical'/>
        <Scene key="parameters" component={ParametersView} title="Paramètres"/>
    </Scene>
);



class AppNavigator extends Component {

    constructor(props) {
        super(props);
        this.pendingNotifications = [];
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    handleNotification(message, data, isActive) {
    }

    componentDidMount() {
        OneSignal.configure({
            onNotificationOpened: this.handleNotification.bind(this)
        });
        AppState.addEventListener('change', this.handleAppStateChange);
        OneSignal.sendTags({user: 'alice'});
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {

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

    render() {
        return <Router createReducer={reducerCreate} scenes={scenes} />
    }

}

function mapStateToProps(state) {
    return {
        messenger: state.messenger
    };
}

export default connect(mapStateToProps)(AppNavigator);
