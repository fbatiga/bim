import React, { Component } from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import Title from '../title/Title';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		backgroundColor: AppGuideline.colors.deepBlue,
		flex: 1
	},
	top: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		height: 100,
		width: 100,
		resizeMode: 'stretch'
	},
});

export default class SuccessStep extends Component {

	constructor(props) {
		super(props);
		this.state = {transferTitle: this.props.transferTitle};
	}

	render() {
		return (
			<View style={styles.container}>
			<Title>{this.props.title|| 'B!M'}</Title>

			<View style={styles.top}>
			<Image source={asset.success} style={styles.image}/>
			<Text style={{
				color: '#fff',
				fontSize:15,
				fontFamily : 'Montserrat-Bold',
				marginTop: 24
			}}>
			{this.props.subTitle || 'Transfert effectué !' }
			</Text>
			</View>
			</View>
			);
	}
}

SuccessStep.propTypes = {
	title: React.PropTypes.string
};
