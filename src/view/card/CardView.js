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

			let scaleTo = 1 - ( index * 0.1 );
			let bottomTo =  index * 30 * scaleTo;

			items.push({
				design : card.design,
				name : card.recipient,
				style : {
					zIndex: new Animated.Value(scaleTo*10),
					bottom: new Animated.Value(bottomTo),
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


		let scaleTo = 1 - ( index * 0.1 );
		let bottomTo =  index * 30 * scaleTo;

		let bottom = Animated.timing(card.bottom,{
			toValue: bottomTo,
			duration
		});



		let scale = Animated.timing(
			card.transform[0].scale,
			{
				toValue: scaleTo,
				duration,
			});


		let zIndex = Animated.timing(
			card.zIndex,
			{
				toValue: scaleTo*10
			});

		return [bottom,scale,zIndex];

	}


	showCards(){
		let animation = [];

		let left = this.state.count * 2;

		this.state.cards.map((card, index)=>{

			animation.push(
				Animated.timing(
					card.style.left,
					{
						toValue: 0,
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



		let scaleTo = 1 - ( this.state.count * 0.1 );
		let bottomTo = this.state.count * 30 * scaleTo;


		let scale = Animated.timing(card.transform[0].scale,{ toValue: scaleTo, duration: 0 });
		let bottom = Animated.timing(card.bottom,{ toValue: bottomTo , duration: 0 });


		let zIndex = Animated.timing(
			card.zIndex,
			{
				toValue: scaleTo*10,
				duration: 0
			});


		let left = Animated.timing(
			card.left,
			{
				toValue: 0,
				duration,
			});


		let rotation = Animated.timing(
			card.transform[1].rotate,
			{
				toValue: 0,
				duration,
			});

		return [Animated.parallel([zIndex,scale,bottom]), Animated.parallel([left,rotation])  ];
	}

	move(){

		let cardToMove = this.state.cards.shift();

		let parallels = [];

		this.state.cards.map((card, index)=>{
			let animation = this.moveCardTo(card.style, index);
			parallels = parallels.concat(animation);
		});

		parallels = parallels.concat(this.removeCard(cardToMove.style));

		Animated.parallel(parallels).start(()=>{ this.onCardRemoved(cardToMove); });
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

	onCardRemoved(cardToMove){

		cardToMove.zIndex = 0;

		let sequence = this.addCard(cardToMove.style);

		this.state.cards.push(cardToMove);

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
			<View style={{top : 120 , alignItems: 'flex-end', justifyContent :'flex-end'}} >
			<View style={style.cardContainer}>
			{this.state.cards.length == 0 && <Text style={style.text}>Ajouter une carte</Text>}
			{this.state.cards.map((card, index)=>{
				return (<TouchableOpacity key={index} style={{zIndex : card.style.zIndex }} onPress={Actions.cardDetails}>
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
		alignSelf : 'flex-end',
		marginRight: -15,
		width: 65,
		height: 65
	},
	text :{
		color: '#fff',
		backgroundColor : 'transparent',
		fontSize: 20,
		marginTop: 150,
		textAlign: 'center'
	},
	cardContainer: {
		justifyContent :'flex-end',
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
