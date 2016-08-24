'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import stylesVars from '../../styles/vars';
import ContactStyle from './ContactStyle';
import asset from '../../asset';

import Title from '../../component/Title';
import ContactList from '../contact/components/ContactList.js';

import {connect} from 'react-redux';
import {init} from './ContactAction';

class ContactView extends Component {

    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Title title={'CONTACTS'} style={{color: stylesVars.colors.deepblue}}/>
                <ContactList pages={['contactsList', 'contact']}  style={ContactStyle.container}
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
