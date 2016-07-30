'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseStyle from './BaseStyle';

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
			<View style={BaseStyle.container}>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		base : state.base
	};
}

export default connect(mapStateToProps)(BaseView);
