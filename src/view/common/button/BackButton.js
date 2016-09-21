import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import asset from '../../../app/AppAsset';

const style = StyleSheet.create({
	button :{
		padding: 25,
		position:'absolute',
		top: -5,
		left: -27,
	}
});

export default class BackButton extends React.Component {

	render() {
		return (
			<TouchableOpacity style={[style.button,this.props.style]} onPress={this.props.back} >
				<Image source={this.props.image} />
			</TouchableOpacity>
		);
	}
}
