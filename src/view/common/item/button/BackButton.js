import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import asset from '../../../../app/AppAsset';

const style = StyleSheet.create({
	button :{
		padding: 10,
		position:'absolute',
		top: 15,
		left: -11,
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
