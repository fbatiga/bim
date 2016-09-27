import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet,Animated } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import AppAsset from '../../../app/AppAsset';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';



class CardItem extends React.Component {

	render() {

		let card = {
			style :this.props.style,
			name :this.props.name ? this.props.name : this.props.messenger.profile.prenom+' '+this.props.messenger.profile.nom,
			design :this.props.design,
		};

		return (
			<Animated.View style={[card.style, {
				position: 'absolute',
				backgroundColor: 'transparent',
				shadowColor :  '#000000',
				shadowOpacity: 0.8,
				shadowRadius: 3,
				shadowOffset: {
					height: 2,
					width: 0
				},
				transform : [
						{ scale : card.style.transform[0].scale},
						{ rotate : card.style.transform[1].rotate.interpolate({
							inputRange: [0, 360],
							outputRange: ['0deg', '360deg'],
						})}
					]
				}
			]} >
			<Image source={design[card.design].src} style={style.cardImage} >
			<View style={{top : 125, left: 30, backgroundColor: 'transparent'}}>
			<Text style={{
				letterSpacing : 4,
				fontFamily : 'Netto OT',
				fontSize : 21,
				textShadowColor : '#7B8186',
				textShadowRadius: 2,
				textShadowOffset: {
					height: 1,
					width: 0.5
				},
				fontWeight : 'bold',
				color : design[card.design].numberColor
			}}>
			4971  2348  1357  3334
			</Text>
			</View>
			<View style={{ top : 147, left: 30, backgroundColor: 'transparent'}}>
			<Text style={{
				letterSpacing : 2,
				fontFamily : 'Netto OT',
				fontSize : 12,
				fontWeight : 'bold',
				color : design[card.design].textColor,
				textShadowColor : '#7B8186',
				textShadowRadius: 1,
				textShadowOffset: {
					height: 0.5,
					width: 0.5
				} }}>
				{card.name}
				</Text>
				</View>
				<View style={{ top : 152, left: 30, backgroundColor: 'transparent'}}>
				<Text style={{
					letterSpacing : 2,
					fontFamily : 'Netto OT',
					fontSize : 12,
					fontWeight : 'bold',
					color : design[card.design].textColor,
					textShadowColor : '#7B8186',
					textShadowRadius: 1,
					textShadowOffset: {
						height: 0.5,
						width: 0.5
					} }}>
					EXPIRE FIN 01/19
					</Text>
					</View>
					</Image>
					</Animated.View>
					);
	}
}


const style = StyleSheet.create({
	cardImage: {
		width: 339,
		height: 211,
		shadowColor : '#120037',
		borderRadius: 10,
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 2,
			width: 0
		}
	}
});


CardItem.propTypes = {
	design : React.PropTypes.string,
	name : React.PropTypes.string,
	style : React.PropTypes.object
};

CardItem.defaultProps = {
	design : 'vert',
	style : {
		zIndex : 0,
		bottom: new Animated.Value(0),
		left: new Animated.Value(0),
		transform : [{
			scale : new Animated.Value(1)
		},{
			rotate : new Animated.Value(0)
		}]
	}
};


const asset = {
	carte1: require('../asset/carte1.png'),
	carte2 : require('../asset/carte2.png'),
	carte3 : require('../asset/carte3.png'),
	carte4 : require('../asset/carte4.png'),
};

const design ={
'jaune' : {
	src: asset.carte2,
	numberColor : '#442D01',
	textColor : '#82785B',
},
'bleu' : {
	src: asset.carte3,
	numberColor : '#FFFFFF',
	textColor : '#1F5675',
},
'vert' : {
	src: asset.carte1,
	numberColor : '#1F463A',
	textColor : '#42717D',
},
'gris' : {
	src: asset.carte4,
	numberColor : '#FF2D5D',
	textColor : '#726E8D',
}
};

function mapStateToProps(state) {
	return {
		messenger: state.messenger
	};
}

export default connect(mapStateToProps)(CardItem);
