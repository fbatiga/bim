'use strict';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardStyle from './CardStyle';
import { connect } from 'react-redux';
import { init } from './CardAction';
import asset from '../../asset';

class CardView extends Component {
	componentDidMount() {
		this.props.dispatch(init());
	}

	render(){
		return (
			<View style={CardStyle.container}>
				<TouchableOpacity style={CardStyle.bottomRighticon} onPress={() => { Actions.addCard(); }}>
					<Image source={asset.add}  style={{
						width: 70,
						height: 70
					}} />
				</TouchableOpacity>
			</View>
		);
	}
}

export default connect()(CardView);
