'use strict';

import React, { Component} from 'react';
import { View, Text, Image, StyleSheet, TouchOpacity} from 'react-native';
import stylesVars from '../styles/vars';

const style = StyleSheet.create({
	title : {
		letterSpacing: 3,
	},
	h1 : stylesVars.titles.h1
});

export default class BackButton extends React.Component {

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
	}

	render(){
		return (
			<TouchOpacity style={[style.h1, style.title, this.props.style]}></TouchOpacity>
		);
	}
}
