'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppAsset from '../../app/AppAsset';
import BackgroundImageLayout from '../common/layout/BackgroundImageLayout';


export default class JournalView extends Component {


	render() {
		return (<BackgroundImageLayout backgroundImage={asset.screen} pixelRatio={2} ></BackgroundImageLayout>)
	}


	resize(event) {
		this.setState({imageHeight: event.nativeEvent.layout.height});
	}
}

const asset ={
	screen: require('./asset/screen.png'),
};

