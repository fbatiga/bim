import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	bubble: {
		borderRadius: 10,
		padding: 10,
		shadowColor: "#000000",
	    shadowOpacity: 0.2,
	    shadowRadius: 1,
	    shadowOffset: {
	      height: 1,
	      width: 0
	    }
	},
	text: {

	},
	textLeft: {
		color: "#F0F3F5"
	},
	textRight: {
		color: '#4F4367',
	},
	bubbleLeft: {
		marginRight: 70,
		backgroundColor: '#0547FD',
		alignSelf: 'flex-start',
	},
	bubbleRight: {
		marginLeft: 70,
		backgroundColor: '#FFFFFF',
		alignSelf: 'flex-end',
	},
});

export default class Bubble extends React.Component {

	render() {
		const flexStyle = {};
		if (this.props.text) {
			if (this.props.text.length > 40) {
				flexStyle.flex = 1;
			}
		}

		let isLeft = this.props.position === 'left' ;

		let textStyle = ( isLeft? styles.textLeft : styles.textRight);
		let bubbleStyle = (isLeft ? styles.bubbleLeft :  styles.bubbleRight );

		return (
			<View style={[styles.bubble, bubbleStyle ,flexStyle]} >
				<Text style={[styles.text, textStyle ]}>
					{this.props.text}
				</Text>
			</View>
		);
	}
}

Bubble.propTypes = {
	position: React.PropTypes.oneOf(['left', 'right', 'center']),
	text: React.PropTypes.string,
	styles: React.PropTypes.object
};
