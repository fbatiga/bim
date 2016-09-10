'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseStyle from '../base/BaseStyle';
import asset from '../common/asset';
import ParametersStyle from './ParametersStyle';

import {connect} from 'react-redux';
import {init} from './ParametersAction';

class ParametersView extends Component {

	componentDidMount() {
		this.props.dispatch(init());
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {
		return (
        <Image style={ParametersStyle.container} source={asset.screens.parameters} onPress={()=>{ Actions.contact()}}>

        </Image>
		);
	}
}

function mapStateToProps(state) {
	return {
		base : state.base
	};
}

export default connect(mapStateToProps)(ParametersView);
