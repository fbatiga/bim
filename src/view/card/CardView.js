'use strict';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback , Text, StyleSheet, Animated, Easing } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import asset from '../../asset';
import Title from '../../component/Title';
import { init } from './CardAction'
import baseStyles from '../../styles/vars.js';

class CardView extends Component {

	constructor(props){
		super(props);
		this.state = {
			cards : [
			{
				src: asset.carte1,
				style : { position: 'absolute',
				top: new Animated.Value(0),
				left: new Animated.Value(14),
				transform : [{
					scale : new Animated.Value(0.7)
				}]
			}
		},
		{
			src: asset.carte2,
			style : { position: 'absolute',
			top: new Animated.Value(30),
			left: new Animated.Value(12),
			transform : [{
				scale : new Animated.Value(0.8)
			}]
		}
	},
	{
		src: asset.carte3,
		style : { position: 'absolute',
		top: new Animated.Value(60),
		left: new Animated.Value(10),
		transform : [{
			scale : new Animated.Value(0.9)
		}]
	}
},
{
	src: asset.carte4,
	style : { position: 'absolute',
	top: new Animated.Value(90),
	left: new Animated.Value(8),
	transform : [{
		scale : new Animated.Value(1)
	}]
}
}]
};

this.newCards = [];

this.elements = this.state.cards.map((card, index)=>{

	return (<Animated.View  key={index} style={card.style} >
<TouchableWithoutFeedback  onPress={this.move.bind(this)}>
<Image source={card.src} style= {CardStyle.cardImage} />
</TouchableWithoutFeedback>
</Animated.View>);
})

}

componentDidMount() {
	this.props.dispatch(init());
}


moveCardTo(card, index){

	let friction = 8;
	let tension = 100;
	let duration = 300;
	let pos = this.state.cards.length - 1 - index ;


	let topTo = 90 - pos * 30;

	let top = Animated.timing(card.top,{
		toValue: topTo,
		duration,
		friction,
		tension
	});


	let leftTo = 7 + ( pos * 2);

	let  left = Animated.timing(
		card.left,
		{
			toValue: leftTo,
			duration,
			friction,
			tension
		});

	let scaleTo = 1 - ( pos * 0.1 );

	let scale = Animated.timing(
		card.transform[0].scale,
		{
			toValue: scaleTo,
			duration,
			friction,
			tension
		});


	return [top,left,scale];

}


removeCard(card){

	let friction = 8;
	let tension = 100;
	let duration = 300;

	let left = Animated.timing(
		card.left,
		{
			toValue: 500,
			duration,
			friction,
			tension
		});


	return [left];
}


addCard(card){

	let friction = 8;
	let tension = 100;
	let duration = 300;

	let scale = Animated.timing(card.transform[0].scale,{ toValue: 0.7, duration: 0 });
	let top = Animated.timing(card.top,{ toValue: 0 , duration: 0 });

	let left = Animated.timing(
		card.left,
		{
			toValue: 14,
			duration,
			friction,
			tension
		});


	return [Animated.parallel([scale,top]), left ];
}

move(){

	let cardToMove = this.state.cards.pop();

	let parallels = [];

	let newCards = this.state.cards.slice(0);

	newCards.map((card, index)=>{
		let animation = this.moveCardTo(card.style, index);
		parallels = parallels.concat(animation);
	});

	parallels = parallels.concat(this.removeCard(cardToMove.style));

	Animated.parallel(parallels).start(()=>{ this.onCardRemoved(newCards,cardToMove); });

}


onCardRemoved(newCards, cardToMove){

	newCards = [cardToMove].concat(newCards);

	let card = this.elements.pop();

	this.elements = [card].concat(this.elements.slice(0));

	let sequence = this.addCard(cardToMove.style);

	Animated.sequence(sequence).start();

	this.setState({
		cards : newCards
	});
}


render(){

	return (
		<View style={CardStyle.container}>
		<Title title='Cartes' />
		<View style={CardStyle.top}>
		<View style={{height : 400, width: 300}}>
		{this.elements}
		</View>
		</View>
		<TouchableOpacity style={CardStyle.bottomRighticon} onPress={() => { Actions.addCard(); }}>
		<Image source={asset.add}  style={{
			width: 70,
			height: 70
		}} />
		</TouchableOpacity>
		</View>
		);
}
}


const CardStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection : 'column',
		alignItems: 'flex-start',
		backgroundColor: baseStyles.colors.deepBlue
	},
	bottomRighticon: {
		position: 'absolute',
		bottom: 20,
		right: 0,
		marginRight: -10
	},
	top: {
		flex: 1,
		margin : 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardImage: {
		width: 271,
		height: 171
	},
	cardDetails: {
		flex: 1,
		backgroundColor: baseStyles.colors.white
	},
	cardLayout: {
		backgroundColor: baseStyles.colors.lightGrey,
		paddingBottom: 30,
		paddingHorizontal: 20
	},
	cardLayoutHeader: {
		flexDirection: 'row',
		marginTop: 30
	},
	cardLayoutLeft: {
		width: 60,
		justifyContent: 'center',
	},
	cardLayoutCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	cardLayoutRight: {
		width: 60
	},
	lines: {
		height: 85,
		borderBottomWidth: 1,
		borderBottomColor: baseStyles.colors.lightGrey,
		alignItems: 'center',
		paddingHorizontal: 20,
		flexDirection: 'row'
	}
});

export default connect()(CardView);
