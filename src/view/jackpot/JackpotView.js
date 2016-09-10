'use strict'

import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Actions as routing } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { init } from './JackpotAction';
import JackpotStyle from './JackpotStyle';
import asset from '../../app/AppAsset';
import baseStyles from '../../styles/vars';

class JackpotView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(init());
	}

	render() {
		return (
			<View style={JackpotStyle.container}>
				<View style={JackpotStyle.top}>
					<View>
						<Image source={asset.jackpot} style={JackpotStyle.jackpotImage} />
						<Text style={JackpotStyle.textTitle}>Cagnotte</Text>
						<Text style={JackpotStyle.textTitle}>Départ Sarah</Text>
						<Text style={JackpotStyle.amount}>0 €</Text>
					</View>
				</View>
				<ScrollView style={JackpotStyle.bottom}>
					<View style={JackpotStyle.userContainer}>
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
					</View>
					<View style={JackpotStyle.userContainer}>
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
					</View>
					<View style={JackpotStyle.userContainer}>
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
						<Image source={asset.users[1]} style={JackpotStyle.userImage} />
					</View>
				</ScrollView>
				<View style={JackpotStyle.addFriend}>
					<Image source={asset.add} style={JackpotStyle.addImage} />
					<Text>Inviter un ami</Text>
				</View>
				<View style={JackpotStyle.addContainer}>
					<Image source={asset.transfer}  style={JackpotStyle.addIcon} />
				</View>
			</View>
		);
	}
}

export default connect()(JackpotView);
