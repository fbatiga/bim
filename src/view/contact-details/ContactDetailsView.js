'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ContactDetailsStyle from './ContactDetailsStyle';
import asset from '../../asset';
import BackButton from '../../component/BackButton';

import PageViewer from '../base/PageViewer';

import {connect} from 'react-redux';
import {init} from './ContactDetailsAction';


const {width, height} = Dimensions.get('window');
class ContactDetailsView extends Component {

    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View style={ContactDetailsStyle.container}>
                <ScrollView>
                    <Image source={asset.screens.contact}  style={{width: width, resizeMode: 'stretch'}}>
                    </Image>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        contactdetails: state.contactdetails
    };
}

export default connect(mapStateToProps)(ContactDetailsView);
