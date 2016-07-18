import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	button: {
		margin : 10,
		borderRadius: 10,
		padding: 10,
		backgroundColor: '#F0F3F5',
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 1,
		shadowOffset: {
			height: 1,
			width: 0
		}
	},
	text: {
		color: '#4F4367'
	}
});

export default class MessengerButton extends React.Component {

	render() {
		const flexStyle = {};
		if (this.props.text) {
			if (this.props.text.length > 40) {
				flexStyle.flex = 1;
			}
		}

		return (
			<TouchableOpacity onPress={()=> {this.props.onPress(this.props.text)}}>
			<View style={[styles.button,
				]} >
				<Text style={styles.text}>
				{this.props.text}
				</Text>
				</View>
				</TouchableOpacity>
				);
	}
}

MessengerButton.propTypes = {
	text: React.PropTypes.string,
	onPress : React.PropTypes.func
};
