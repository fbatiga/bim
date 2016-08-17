import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { UserLeft, UserRight } from './MessengerUser';
import asset from '../../../asset';

const styles = StyleSheet.create({
	bubble: {
		marginBottom: 15,
		marginLeft: 10,
		alignItems: 'flex-end',
		flexDirection : 'row',
		maxWidth : 220
	},
	content: {
		padding: 10,
		backgroundColor: '#F0F3F5',
		flexDirection: 'row',
		maxWidth : 220
	},
	image: {
		width: 220,
		height: 160,
		borderColor :  '#F0F3F5',
		backgroundColor :  '#F0F3F5',
		maxWidth : 220,
		borderWidth: 8
	},
	text: {
		fontSize : 14,
		flex: 1,
		color: '#4F4367',
		maxWidth : 220,
		//fontFamily : 'Verdana',
		fontWeight: '100'
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
			return <View   style={[styles.content]} >
			<Text style={styles.text}>
			{this.props.text}
			</Text>
			</View>
		}
	}


	render() {


		let isLeft = this.props.position === 'left' ;

		let bubbleStyle = (isLeft ? styles.bubbleLeft :  styles.bubbleRight );

		return (
			<View style={[styles.bubble, bubbleStyle ]}>
				{isLeft && <UserLeft />}
				{this.content()}
				{!isLeft && <UserRight />}
			</View>
			);
	}
}

Bubble.propTypes = {
	position: React.PropTypes.oneOf(['left', 'right', 'center']),
	text: React.PropTypes.string,
	image: React.PropTypes.any,
	index: React.PropTypes.number,
	styles: React.PropTypes.object
};
