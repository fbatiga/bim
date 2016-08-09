'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import TransferStyle from './TransferStyle';

import {connect} from 'react-redux';
import {init} from './TransferAction';

class TransferView extends Component {

	componentDidMount() {
		this.props.dispatch(init());
	}

	componentWillReceiveProps(nextProps) {

	}

	render(){
		return (
			<View style={TransferStyle.container}>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		transfer : state.transfer
	};
}

export default connect(mapStateToProps)(TransferView);
