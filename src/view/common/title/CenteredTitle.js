'use strict';

import React, { Component} from 'react';
import { View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import AppGuideline from '../../../app/AppGuideline';

const width = Dimensions.get('window').width;

const style = StyleSheet.create({
	subtitle : {
	    fontFamily : 'Montserrat-UltraLight',
	    fontSize: 36,
		lineHeight : 36,
		marginBottom: 20,
		textAlign : 'center',
	    color: AppGuideline.colors.alternative
	}
});

export default class SubTitle extends Component {
	render(){
		return (
			<Animated.Text {...this.props} style={[style.subtitle, this.props.style]}>{this.props.children}</Animated.Text>
		);
	}
}
