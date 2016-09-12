'use strict'

import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import AppAsset from '../../app/AppAsset';
import AppGuideline from '../../app/AppGuideline';

class JackpotView extends Component {

	render() {
		return (
			<View style={style.container}>
				<View style={style.top}>
					<View>
						<Image source={AppAsset.jackpot} style={style.jackpotImage} />
						<Text style={style.textTitle}>Cagnotte</Text>
						<Text style={style.textTitle}>Départ Sarah</Text>
						<Text style={style.amount}>0 €</Text>
					</View>
				</View>
				<ScrollView style={style.bottom}>
					<View style={style.userContainer}>
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
					</View>
					<View style={style.userContainer}>
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
					</View>
					<View style={style.userContainer}>
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
						<Image source={AppAsset.users[1]} style={style.userImage} />
					</View>
				</ScrollView>
				<View style={style.addFriend}>
					<Image source={AppAsset.add} style={style.addImage} />
					<Text>Inviter un ami</Text>
				</View>
				<View style={style.addContainer}>
					<Image source={AppAsset.transfer}  style={style.addIcon} />
				</View>
			</View>
		);
	}
}


const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	top: {
		height: height / 1.7,
		backgroundColor: AppGuideline.colors.pink,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottom: {
		backgroundColor: AppGuideline.colors.white,
		paddingHorizontal: 25,
		paddingVertical: 25
	},
	jackpotImage: {
		width: 127,
		height: 130,
		marginBottom: 25
	},
	textTitle: {
		fontSize: 19,
		marginBottom: 3,
		textAlign: 'center',
		color: AppGuideline.colors.deepBlue
	},
	amount: {
		marginTop: 15,
		fontSize: 25,
		textAlign: 'center',
		color: AppGuideline.colors.deepBlue
	},
	userContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 5
	},
	userImage: {
		width: width / 9,
		height: width / 9,
		borderWidth: 2,
		borderColor: AppGuideline.colors.alternative,
		borderRadius: 20
	},
	addFriend: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 90
	},
	addImage: {
		width: 25,
		height: 25,
		marginRight: 15
	},
	addContainer: {
		position: 'absolute',
		bottom: 10,
		right: 0
	},
	addIcon: {
		width: 70,
		height: 70,
		marginRight: -10
	}
});

export default connect()(JackpotView);
