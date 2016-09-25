import React, { Component } from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';
import Title from '../../common/title/Title';
import CardItem from '../../common/item/CardItem';

const { width, height } = Dimensions.get('window');


export default class CardSuccessView extends Component {
	render() {
		return (
			<View style={style.container}>
			<Title>{this.props.title || 'Cartes'}</Title>
			<View style={style.content}>
			<View style={{top : 120, alignItems: 'center'}}>
				<View style={style.cardContainer}>
					<CardItem design={this.props.design} name={this.props.recipient} />
				</View>
			</View>
			<View style={{top : 80, alignItems: 'center'}}>
			<Image source={asset.success} style={style.image}/>
			<Text style={style.text}>
			{this.props.subTitle || 'Carte Crée !' }
			</Text>
			</View>
			</View>
			</View>
			);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue,
		flexDirection : 'column',
	},
	top: {
		flex: 1,
		flexDirection : 'column',
		alignItems: 'center'
	},
	image: {
		height: 35,
		width: 35,
		marginTop: 100
	},
	cardContainer: {
		width: 339,
		height: 200,
		alignSelf: 'center'
	},
	text :{
		color: '#fff',
		backgroundColor : 'transparent',
		fontSize: 20,
		marginTop: 15
	}
});

CardSuccessView.propTypes = {
	title: React.PropTypes.string,
	subTitle: React.PropTypes.string
};
