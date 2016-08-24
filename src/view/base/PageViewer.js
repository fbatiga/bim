'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  ScrollableTabView, { DefaultTabBar }  from 'react-native-scrollable-tab-view';
import BimTabBar from './BimTabBar';
import asset from '../../asset';

import BaseStyle from './BaseStyle';
import baseStyles from '../../styles/vars.js';

import {connect} from 'react-redux';
import {init} from './BaseAction';


const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: null
    },
    image: {top: 0, left: 0, resizeMode: 'contain', width: width},
    text: {
        color: '#fff',
        fontSize: 14
    }
});


class PageViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {step: 0};
    }

    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    nextStep(step) {
        alert('next step');
        step = step || (this.state.step++);
        this.setState({step: step});
    }

    previousStep(step) {
        step = step || (this.state.step--);
        this.setState({step: step});
    }


    render() {
        return (
            <Image style={styles.container }source={asset.screens[this.props.pages[this.state.step]]} >
            </Image>
        );
    }


        this
}

function mapStateToProps(state) {
    return {
        base: state.base
    };
}

export default connect(mapStateToProps)(PageViewer);
