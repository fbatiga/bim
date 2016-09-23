'use strict';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback , Dimensions, Text, StyleSheet, Easing, Animated, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Title from '../common/title/Title';
import { moveStarted, moveEnded  } from './CardAction'
import AppGuideline from '../../app/AppGuideline';
import {swipeTo, configureSwipe} from '../menu/MenuAction';

const width = Dimensions.get('window').width;

class CardView extends Component {

	constructor(props){
		super(props);
		this.isMoving=false;
		this.state = {
			count :  4,
			cards : [
			{
				src: asset.carte1,
				style : {
					zIndex : 0,
					position: 'absolute',
					top: new Animated.Value(0),
					left: new Animated.Value(300),
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
					left: new Animated.Value(300),
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
					left: new Animated.Value(300),
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
					left: new Animated.Value(300),
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


		let duration = 300;
		let pos = this.state.cards.length - index - 1;

		let topTo =  90 - pos * 30;

		let top = Animated.timing(card.top,{
			toValue: topTo,
			duration,
		});

		console.log('topTo',topTo, card.zIndex);

		let leftTo = 0 + ( pos * 2);

		let  left = Animated.timing(
			card.left,
			{
				toValue: leftTo,
				duration,
			});

		let scaleTo = 1 - ( pos * 0.1 );


		let scale = Animated.timing(
			card.transform[0].scale,
			{
				toValue: scaleTo,
				duration,
			});



		return [top,left,scale];

	}


	componentDidMount(){

		let animation = [];

		let left = 8 + this.state.cards.length * 2;

		this.state.cards.reverse().map((card, index)=>{

			let leftTo = left - ( index * 2 );

			animation.push(
				Animated.timing(
					card.style.left,
					{
						toValue: leftTo,
						duration : 200,
						delay : index * 100
					})
				);

		});

		Animated.parallel(animation).start();
	}


	componentWillUnmount(){

		let animation = [];

		let left = 8 + this.state.cards.length * 2;

		this.state.cards.map((card, index)=>{


			animation.push(
				Animated.timing(
					card.style.left,
					{
						toValue: 300,
						duration : 300,
						delay : index * 200
					})
				);

		});

		Animated.parallel(animation).start();

	}


	removeCard(card){

		let duration = 300;


		let left = Animated.timing(
			card.left,
			{
				toValue: 500,
				duration
			});


		let rotation = Animated.timing(
			card.transform[1].rotate,
			{
				toValue: 45,
				duration
			});

		return [left,rotation];
	}


	addCard(card){

		let duration = 300;

		let pos = this.state.cards.length ;


		let topTo = 90 - pos * 30;
		let leftTo = 0 + ( pos * 2);
		let scaleTo = 1 - ( pos * 0.1 );


		let scale = Animated.timing(card.transform[0].scale,{ toValue: scaleTo, duration: 0 });
		let top = Animated.timing(card.top,{ toValue: topTo , duration: 0 });

		let left = Animated.timing(
			card.left,
			{
				toValue: leftTo,
				duration,
			});


		let rotation = Animated.timing(
			card.transform[1].rotate,
			{
				toValue: 0,
				duration,
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

		if(this.isMoving == false){
			this.isMoving = true;
			this.move();
		}
	}

	onCardRemoved(newCards, cardToMove){


		let sequence = this.addCard(cardToMove.style);

		this.state.cards = [cardToMove].concat(newCards);


		Animated.sequence(sequence).start(()=>{
			this.isMoving = false;
		});


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
			<View style={{top : 120 , alignItems: 'flex-start'}} >
			<View style={{ width: width, height: 300 }}>
			{this.state.cards.reverse().map((card, index)=>{
				return (<TouchableWithoutFeedback key={index}  onPress={Actions.cardDetails}>
					<Animated.View style={[card.style, {
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
		width: 339,
		height: 211,
		//shadowColor : '#120037',
		backgroundColor: "#ffffff",
   		borderRadius: 10,
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 2,
			width: 0
		}
	}
});

const asset = {
	add: require('./asset/add.png'),
	carte1: require('./asset/carte1.png'),
	carte2 : require('./asset/carte2.png'),
	carte3 : require('./asset/carte3.png'),
	carte4 : require('./asset/carte4.png'),
};

function mapStateToProps(state) {
	return {
		card: state.card
	};
}

export default connect(mapStateToProps)(CardView);

