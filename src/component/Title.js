'use strict';

import React, { Component} from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import baseStyles from '../asset/styles.js';


const style = StyleSheet.create({
	title : {
		fontFamily : 'Montserrat-ExtraBold',
		letterSpacing: 3
	}
});

export default class Title extends Component {

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
	}

	render(){
		return (
			<Text {...this.props} style={[baseStyles.titles.h1, style.title, this.props.style]}>{this.props.title || 'B!M'}</Text>
		);
	}
}
