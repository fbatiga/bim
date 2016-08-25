'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import asset from '../../asset';
import ViewWithBackground from '../../component/ViewWithBackground';

import {connect} from 'react-redux';
import {init} from './ProfileAction';


const {width, height} = Dimensions.get('window');


const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    }
});


class ProfileView extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (<ViewWithBackground backgroundImage={asset.screens.profile} pixelRatio='2' ></ViewWithBackground>)
    }
  /*  render() {
        this.imageStyle = {width: width};
        this.resizeFunc = this.resize.bind(this);
        if (this.state.imageHeight > 0) {
            this.imageStyle.height = this.state.imageHeight / 2;
            this.resizeFunc = null;
        }
        return (
            <ScrollView containContainerStyle={[ContactDetailsStyle]}>
                <Image  onLayout={this.resizeFunc} source={asset.screens.profile}  resizeMode='contain'
                style={this.imageStyle}>
                </Image>
            </ScrollView>
        );
    }*/


    resize(event) {
        this.setState({imageHeight: event.nativeEvent.layout.height});
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(ProfileView);
