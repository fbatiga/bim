'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchOpacity, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import asset from '../../asset';
import ViewWithBackground from '../../component/ViewWithBackground';

import {connect} from 'react-redux';
import {init} from './ContactDetailsAction';


const {width, height} = Dimensions.get('window');


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    back: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});


class ContactDetailsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageHeight: 0
        };

        this.imageStyle = {};
        this.resizeFunc;
    }


    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <ViewWithBackground backgroundImage={asset.screens.contact} pixelRatio={2} >
                <TouchOpacity style={[style.back]}>
                    <Image source={asset.back} />
                </TouchOpacity>
            </ViewWithBackground>)
    }


    resize(event) {
        this.setState({imageHeight: event.nativeEvent.layout.height});
    }
}

function mapStateToProps(state) {
    return {
        contactdetails: state.contactdetails
    };
}

export default connect(mapStateToProps)(ContactDetailsView);
