'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountStyle from './AccountStyle';

import {connect} from 'react-redux';
import {init} from './AccountAction';

class AccountView extends Component {

	componentDidMount() {
		this.props.dispatch(init());
	}

	componentWillReceiveProps(nextProps) {

	}

	render(){
		return (
			<View style={AccountStyle.container}>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		account : state.account
	};
}

export default connect(mapStateToProps)(AccountView);
