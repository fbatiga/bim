'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  ScrollableTabView, { DefaultTabBar }  from 'react-native-scrollable-tab-view';
import BimTabBar from './BimTabBar';

import BaseStyle from './BaseStyle';
import baseStyles from '../../styles/vars.js';

import {connect} from 'react-redux';
import {init} from './BaseAction';


const width = Dimensions.get('window').width;
console.log(width);
const styles = StyleSheet.create({
    container: {padding: 0},
    image: {top: 0, left: 0, resizeMode: 'contain', width: width},
    text: {
        color: '#fff',
        fontSize: 14
    }
});


class PageViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {step: 1};
    }

    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    nextStep(step) {
        step = step || (this.state.step++);
        this.setState({step: step});
    }

    previousStep(step) {
        step = step || (this.state.step--);
        this.setState({step: step});
    }


    render() {
        return (
            <View style={BaseStyle.container}>
                <ScrollableTabView
                style={{marginTop: 20}}
                initialPage={0}
                locked={false}
                page={this.state.step}
                renderTabBar={() => <BimTabBar style={{borderBottomWidth: 0}}/>}
                >
                           {this.props.pages.map((value, key) => {
                               return (
                                   <TouchableHighlight>
                                   <Image  source={value} style={styles.image} onPress={() => {
                                       alert('yeah');
                                       if (this.state.step < this.props.pages.length) {
                                           this.nextStep();
                                       }
                                       else {
                                           this.nextStep(0);
                                       }
                                   }}/>
                                       </TouchableHighlight>
                               );
                           })}
                </ScrollableTabView>
            </View>
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
