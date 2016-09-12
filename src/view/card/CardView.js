'use strict';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback , PanResponder, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import asset from '../../app/AppAsset';
import Title from '../common/item/title/Title';
import { moveStarted, moveEnded  } from './CardAction'
import AppGuideline from '../../app/AppGuideline';
import {swipeTo, configureSwipe} from '../menu/MenuAction';


class CardView extends Component {

	constructor(props){
		super(props);
		this.state = {
			count :  4,
			cards : [
			{
				src: asset.carte1,
				style : {
					zIndex : 0,
					position: 'absolute',
					top: new Animated.Value(0),
					left: new Animated.Value(14),
					transform : [{
						scale : new Animated.Value(0.7)
					},{
						rotate : new Animated.Value(0)
					}]
				}
			},
			{
				src: asset.carte2,
				style : {
					zIndex : 1,
					position: 'absolute',
					top: new Animated.Value(30),
					left: new Animated.Value(12),
					transform : [{
						scale : new Animated.Value(0.8)
					},{
						rotate : new Animated.Value(0)
					}]
				}
			},
			{
				src: asset.carte3,
				style : {
					zIndex : 2,
					position: 'absolute',
					top: new Animated.Value(60),
					left: new Animated.Value(10),
					transform : [{
						scale : new Animated.Value(0.9)
					},{
						rotate : new Animated.Value(0)
					}]
				}
			},
			{
				src: asset.carte4,
				style : {
					zIndex : 3,
					position: 'absolute',
					top: new Animated.Value(90),
					left: new Animated.Value(8),
					transform : [{
						scale : new Animated.Value(1)
					},{
						rotate : new Animated.Value(0)
					}]
				}
			}]
		};

		this.newCards = [];

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


		let leftTo = 8 + ( pos * 2);

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

		card.zIndex++;

		let rotation = Animated.timing(
			card.transform[1].rotate,
			{
				toValue: 45,
				duration,
				friction,
				tension
			});

		return [left,rotation];
	}


	addCard(card){

		let friction = 8;
		let tension = 100;
		let duration = 300;

		let pos = this.state.cards.length ;


		let topTo = 90 - pos * 30;
		let leftTo = 8 + ( pos * 2);
		let scaleTo = 1 - ( pos * 0.1 );


		let scale = Animated.timing(card.transform[0].scale,{ toValue: scaleTo, duration: 0 });
		let top = Animated.timing(card.top,{ toValue: topTo , duration: 0 });

		let left = Animated.timing(
			card.left,
			{
				toValue: leftTo,
				duration,
				friction,
				tension
			});


		let rotation = Animated.timing(
			card.transform[1].rotate,
			{
				toValue: 0,
				duration,
				friction,
				tension
			});

		return [Animated.parallel([scale,top]), Animated.parallel([left,rotation])  ];
	}

	move(){

		if(this.state.count  = this.state.cards.length){
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
	}


	onPress(distance) {
		Actions.cardDetails();
	}

	onSwipe(distance) {
		this.move();
	}

	onCardRemoved(newCards, cardToMove){


		let sequence = this.addCard(cardToMove.style);

		this.state.cards = [cardToMove].concat(newCards);


		Animated.sequence(sequence).start();


	}

	configureScroll(){
		this.props.dispatch(
			configureSwipe({
				onVerticalSwipe : this.onSwipe.bind(this),
				onVerticalLargeSwipe : this.onSwipe.bind(this),
				onHorizontalSwipe : this.onSwipe.bind(this)
			})
			);
	}

	render() {
		return (
			<View style={CardStyle.container} onLayout={this.configureScroll.bind(this)}>
			<Title>Cartes</Title>
			<View style={CardStyle.top}>
			<View style={{top : 120 , alignItems: 'center'}} >
			<View style={{ width: 300, height: 300 }}>
			{this.state.cards.map((card, index)=>{
				return (<TouchableWithoutFeedback onPress={Actions.cardDetails}>
					<Animated.View key={index} style={[card.style, {
						zIndex : card.style.top,
						transform : [{ scale : card.style.transform[0].scale},
						{ rotate : card.style.transform[1].rotate.interpolate({
							inputRange: [0, 360],
							outputRange: ['0deg', '360deg'],
						})}]
					}]} >

					<Image source={card.src} style= {CardStyle.cardImage} />
					</Animated.View>
					</TouchableWithoutFeedback>);
			})
		}
		</View>
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
		alignItems: 'stretch',
		backgroundColor: AppGuideline.colors.deepBlue
	},
	bottomRighticon: {
		position: 'absolute',
		bottom: 20,
		right: 0,
		marginRight: -10
	},
	top: {
		flex: 1
	},
	cardImage: {
		width: 271,
		height: 171
	}
});


function mapStateToProps(state) {
	return {
		card: state.card
	};
}

export default connect(mapStateToProps)(CardView);

