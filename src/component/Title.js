'use strict';

import React, { Component} from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import stylesVars from '../styles/vars';

const style = StyleSheet.create({
	title : {
		fontFamily : 'Montserrat-ExtraBold',
		letterSpacing: 3,
		left : -2,
		height : 50
	},
	h1 : stylesVars.titles.h1
});

export default class Title extends Component {
	render(){
		return (
			<Text {...this.props} style={[style.h1, style.title, this.props.style]}>{this.props.title || 'B!M'}</Text>
		);
	}
}
