'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {connect} from 'react-redux';
import {init} from './BaseAction';

class BaseView extends Component {

	componentDidMount() {
		this.props.dispatch(init());
	}

	componentWillReceiveProps(nextProps) {

	}

	render(){
		return (
			<View style={style.container}>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

function mapStateToProps(state) {
	return {
		base : state.base
	};
}

export default connect(mapStateToProps)(BaseView);
