import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import {TriangleLeft, TriangleRight } from './MessengerTriangle';
import asset from '../../../asset';

const styles = StyleSheet.create({
	content: {
		padding: 5,
		backgroundColor: '#F0F3F5',
		flexDirection: 'row',
		maxWidth : 240
	},
	bubble: {
		flexDirection : 'row'
	},
	imageContainer: {
		flex:1,
		flexDirection : 'column',
		alignItems: 'flex-start',
		width: 230,
		height: 200
	},
	image: {
		width: 240,
		height: 200,
		borderColor :  '#F0F3F5',
		backgroundColor :  '#F0F3F5',
		borderWidth: 8
	},
	text: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 5,
		paddingRight: 5,
		paddingLeft: 5,
		color: "#4F4367"
	},
	bubbleLeft: {
		marginRight: 70,
		alignSelf: 'flex-start',
	},
	bubbleRight: {
		marginLeft: 70,
		alignSelf: 'flex-end',
	},
});

export default class Bubble extends React.Component {


	content(){
		if(this.props.image){
			return <Image source={{uri: this.props.image}} style={styles.image} resizeMode='contain'/>
		}

		if(this.props.text != ''){
			return <View style={[styles.content]} >
					<Text style={styles.text}>{this.props.text}</Text>
				</View>;
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
			<View style={[styles.bubble, bubbleStyle ,flexStyle]}>
				{isLeft && <TriangleLeft />}

				{this.content()}
				{!isLeft && <TriangleRight />}
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
