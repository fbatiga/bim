'use strict';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback , Dimensions, Text, StyleSheet, Easing, Animated, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Title from '../common/title/Title';
import CardItem from '../common/item/CardItem';
import { moveStarted, moveEnded  } from './CardAction'
import AppGuideline from '../../app/AppGuideline';
import {swipeTo, configureSwipe} from '../menu/MenuAction';
import {firebaseDb} from  '../../app/AppFirebase';

const width = Dimensions.get('window').width;

class CardView extends Component {

	constructor(props){
		super(props);
		this.isMoving=false;

		let items = this.loadCards(this.props.card.list);


		this.state = {
			count : this.props.card.list.length,
			cards : items
		};

		this.newCards = [];
	}



	loadCards(cards){

		let pos = cards.length;

		let items =[];

		cards.map((card, index)=>{

			let scaleTo = 1 - ( (pos - index - 1) * 0.1 );
			let topTo =  90 - (pos - index - 1)  * 30;

			items.push({
				design : card.design,
				name : card.recipient,
				style : {
					zIndex : index,
					top: new Animated.Value(topTo),
					left: new Animated.Value(300),
					transform : [{
						scale : new Animated.Value(scaleTo)
					},{
						rotate : new Animated.Value(0)
					}]
				}
			})

		});

		return  items;

	}

	moveCardTo(card, index){


		let duration = 300;
		let pos = this.state.cards.length - index - 1;

		let topTo =  90 - pos * 30;

		let top = Animated.timing(card.top,{
			toValue: topTo,
			duration,
		});

		let leftTo = ( pos * 2);

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


	showCards(){
		let animation = [];

		let left = this.state.cards.length * 2;

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

	componentDidMount(){
		this.showCards();
	}


	componentWillUnmount(){

		let animation = [];

		let left = this.state.cards.length * 2;

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
		let leftTo =  pos * 2 ;
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
				onHorizontalSwipe : this.onSwipe.bind(this),
				onHorizontalLargeSwipe : this.onSwipe.bind(this),
			})
			);
	}

	componentWillReceiveProps(nextProps){


		if(this.props.card.list != nextProps.card.list){

			let items = this.loadCards(nextProps.card.list);
			this.setState({
				count : nextProps.card.list.length,
				cards : items
			});
		}

	}


	componentDidUpdate( prevProps,  prevState){
		if(this.state.cards.length !== prevState.cards.length){
			this.showCards();
		}
	}

	render() {


		return (
			<View style={style.container} onLayout={this.configureScroll.bind(this)}>
			<Title>Cartes</Title>
			<View style={style.top}>
			<View style={{top : 120 , alignItems: 'flex-start'}} >
			<View style={style.cardContainer}>
			{this.state.cards.length == 0 && <Text style={style.text}>Ajouter une carte</Text>}
			{this.state.cards.reverse().map((card, index)=>{
				return (<TouchableOpacity key={index} onPress={Actions.cardDetails}>
					<CardItem style={card.style} design={card.design} name={card.name} />
					</TouchableOpacity>);
			})
		}
		</View>
		</View>
		</View>
		<TouchableOpacity style={style.bottomIcon} onPress={() => { Actions.addCard(); }}>
		<Image source={asset.add}  style={style.add} />
		</TouchableOpacity>
		</View>
		);
	}
}


const style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection : 'column',
		alignItems: 'stretch',
		backgroundColor: AppGuideline.colors.deepBlue
	},
	bottomIcon: {
		top : -50
	},
	top: {
		flex: 1
	},
	add : {
		alignSelf : 'center'
	},
	text :{
		color: '#fff',
		backgroundColor : 'transparent',
		fontSize: 20,
		marginTop: 150,
		textAlign: 'center'
	},
	cardContainer: {
		width: 339,
		height: 300,
		alignSelf: 'center'
	}
});

const asset = {
	add: require('./asset/add.png'),
};

function mapStateToProps(state) {
	return {
		card: state.card,
		messenger: state.messenger
	};
}

export default connect(mapStateToProps)(CardView);

