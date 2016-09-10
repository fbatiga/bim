import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import asset from '../view/common/asset';

const style = StyleSheet.create({
	button :{
		position:'absolute',
		top: 25,
		left: 4,
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
