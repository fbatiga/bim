import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	bubble: {
		padding: 10
	},
	text: {

	},
	image: {
		flex : 1,
		height: 200,
		width: 300
	},
	text: {
		color: "#4F4367"
	},
	bubbleLeft: {
		marginRight: 70,
		backgroundColor: '#F0F3F5',
		alignSelf: 'flex-start',
	},
	bubbleRight: {
		marginLeft: 70,
		backgroundColor: '#F0F3F5',
		alignSelf: 'flex-end',
	},
});

export default class Bubble extends React.Component {


	content(){
		if(this.props.image){
			return <Image  source={{uri: this.props.image}} style={styles.image}  resizeMode='cover'/>;
		}

		if(this.props.text != ''){
			return <Text style={styles.text}>{this.props.text}</Text>;
		}
	}

	render() {

		const flexStyle = {};
		if (this.props.text) {
			if (this.props.text.length > 40) {
				flexStyle.flex = 1;
			}
		}

		let isLeft = this.props.position === 'left' ;

		let bubbleStyle = (isLeft ? styles.bubbleLeft :  styles.bubbleRight );

		return (
			<View style={[styles.bubble, bubbleStyle ,flexStyle]} >
				{this.content()}
			</View>
		);
	}
}

Bubble.propTypes = {
	position: React.PropTypes.oneOf(['left', 'right', 'center']),
	text: React.PropTypes.string,
	image: React.PropTypes.any,
	styles: React.PropTypes.object
};
