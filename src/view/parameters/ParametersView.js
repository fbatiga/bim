'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppAsset from '../../app/AppAsset';
import ParametersStyle from './ParametersStyle';


export default class ParametersView extends Component {

	render() {
		return (
        <Image style={ParametersStyle.container} source={asset.screen} onPress={()=>{ Actions.contact()}}>
        </Image>
		);
	}
}

const asset ={
	screen: require('./asset/screen.png'),
};
