'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import stylesVars from '../../styles/vars';
import asset from '../../asset';

import Title from '../../component/Title';
import ContactList from '../contact/components/ContactList.js';

import {connect} from 'react-redux';
import {init} from './ContactAction';


const {width, height} = Dimensions.get('window');
class ContactView extends Component {

    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Title style={{color: stylesVars.colors.deepblue, height: 80}} >CONTACTS</Title>
                <ContactList pages={['contactsList', 'contact']}  style={[{height: height - (80)}]}
                callback={this.openContact.bind(this)}
                />
            </View>
        );
    }

    openContact(contact) {
    	console.log('contact');
    	Actions.contactdetails(contact)
    }
}

function mapStateToProps(state) {
    return {
        contact: state.contact
    };
}

export default connect(mapStateToProps)(ContactView);
