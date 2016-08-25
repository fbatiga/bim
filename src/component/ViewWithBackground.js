'use strict';

import React, { Component } from 'react';
import {Image, StyleSheet, ScrollView, Dimensions} from 'react-native';

const ViewStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    }
});

const {width,height} = Dimensions.get('window');
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


export default  class ViewWithBackground extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageWidth: 0,
            imageHeight: 0
        };
        this.pixelRatio = this.props.pixelRatio || 2;
        this.imageStyle = {};
        this.resizeFunc = null;
    }


    resize(event) {
        this.setState({imageHeight: event.nativeEvent.layout.height});
    }

    render() {
        this.imageStyle = {width: width};
        this.resizeFunc = this.resize.bind(this);
        if (this.state.imageHeight > 0) {
            this.imageStyle.height = this.state.imageHeight / (this.pixelRatio);
            if(this.imageStyle <= height){
                this.imageStyle.height = height;
            }

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

