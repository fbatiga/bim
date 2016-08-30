'use strict';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import CardStyle from './CardStyle';
import asset from '../../asset';
import Title from '../../component/Title';
import { init } from './CardAction'

class CardView extends Component {
	componentDidMount() {
		this.props.dispatch(init());
	}

	render(){
		return (
			<View style={CardStyle.container}>
				<Title title='Cartes' />
				<View style={CardStyle.top}>
					<TouchableOpacity onPress={() => { Actions.cardDetails(); }}>
						<Image source={asset.carte4} style={CardStyle.cardImage}/>
					</TouchableOpacity>
				</View>
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
