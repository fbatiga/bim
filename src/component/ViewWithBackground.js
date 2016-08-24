'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableHighlight, ScrollView, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  ScrollableTabView, { DefaultTabBar }  from 'react-native-scrollable-tab-view';
import asset from '../asset';

import baseStyles from '../styles/vars.js';


const ViewStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    }
});

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


class ViewWithBackground extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageHeight: 0
        };
        this.pixelRatio = this.props.pixelRatio || 2;
        this.imageStyle = {};
        this.resizeFunc = null;
    }

    componentWillReceiveProps(nextProps) {

    }

    resize(event) {
        this.setState({imageHeight: event.nativeEvent.layout.height});
    }

    render() {
        this.imageStyle = {width: width};
        this.resizeFunc = this.resize.bind(this);
        if (this.state.imageHeight > 0) {
            this.imageStyle.height = this.state.imageHeight / (this.pixelRatio);
            this.resizeFunc = null;
        }
        return (
            <ScrollView containContainerStyle={[ViewStyle]}>
                <Image  onLayout={this.resizeFunc} source={this.props.backgroundImage}  resizeMode='contain'
                style={this.imageStyle}>
                {this.props.children}
                </Image>
            </ScrollView>
        );
    }

}

function mapStateToProps(state) {
    return {
        base: state.base
    };
}

export default connect(mapStateToProps)(ViewWithBackground);
