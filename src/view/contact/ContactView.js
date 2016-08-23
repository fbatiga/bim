'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ContactStyle from './ContactStyle';
import asset from '../../asset';

import PageViewer from '../base/PageViewer';

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
            <View style={ContactStyle.container}>
                <PageViewer pages={['contactsList', 'contact' ]} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        contact: state.contact
    };
}

export default connect(mapStateToProps)(ContactView);
