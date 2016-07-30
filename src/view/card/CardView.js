'use strict';

import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardStyle from './CardStyle';

import {connect} from 'react-redux';
import {init} from './CardAction';

class CardView extends Component {

	componentDidMount() {
		this.props.dispatch(init());
	}

	componentWillReceiveProps(nextProps) {

	}

	render(){
		return (
			<View style={CardStyle.container}>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		card : state.card
	};
}

export default connect(mapStateToProps)(CardView);
