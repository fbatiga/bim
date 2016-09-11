'use strict'
import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions,  StyleSheet, TouchableOpacity , Image, Animated, ScrollView, PanResponder} from 'react-native';
import Swiper from 'react-native-swiper';
import MenuView from '../view/menu/MenuView';
import {swipeTo, goTo} from '../view/menu/MenuAction';
import asset from '../view/../app/AppAsset';
import {connect} from 'react-redux';
import {loadSession} from '../view/login/LoginAction';
import {setVisibility} from '../view/messenger/MessengerAction';
import { Actions } from 'react-native-router-flux';


const {width, height} = Dimensions.get('window');


class AppLayout extends Component {

	constructor(props){
		super(props);
		this.layout = [];
		this.state = {
			bounceValue: new Animated.Value(0.0001)
		};

		this.scroll = null;
	}

	componentDidMount(){
		this.props.dispatch(loadSession());
		this.scroll = this.refs.swiper.getScrollResponder();
		this.scroll.scrollTo({
			y: 0,
			x: width,
			false
		});
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({

      onStartShouldSetPanResponderCapture: (evt, gestureState) =>{
				console.log('App layout onStartShouldSetPanResponderCapture', gestureState);
				return true;
			},
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>{
				console.log('App layout onMoveShouldSetPanResponderCapture', gestureState);
				return true;
			},
			onStartShouldSetPanResponder: (evt, gestureState) =>{
				console.log('App layout onStartShouldSetPanResponder', gestureState);
				return true;
			},
			onMoveShouldSetPanResponder:  (evt, gestureState) =>{
				console.log('App layout onMoveShouldSetPanResponder', gestureState);
				return true;
			},
			onPanResponderTerminationRequest: (evt, gestureState) =>{
				console.log('App layout onStartShouldSetPanResponder', gestureState);
				return true;
			},
			onPanResponderRelease:this.handlePanResponderRelease.bind(this)
		});
	}

	handlePanResponderRelease(evt, gestureState) {

		let horizontal = gestureState.x0 - gestureState.moveX;
		let vertical = gestureState.y0 - gestureState.moveY;
		let type = 'click';
		let direction = 'horizontal';
		let distance = Math.abs(horizontal);

		if(	(Math.abs(horizontal) >= Math.abs(vertical) )){
			let limit = width/3;
			if(distance > 10){
				type = 'small';
				if(distance > limit){
					type = 'large';
				}
			}
		}else{
			direction = 'vertical';
			distance = Math.abs(vertical);

			let limit = height/4;
			if(distance > 10){
				type = 'small';
				if(distance > limit){
					type = 'large';
				}
			}
		}


		console.log('SWIPE :', type, { direction, distance, horizontal, vertical });

		if(type == 'click'){
			if(this.props.menu.gesture.onPress != undefined){
				this.props.menu.gesture.onPress();
			}
		}else{
			switch(direction){
				case 'horizontal':{
					switch(type){
						case 'small':{
							if(this.props.menu.gesture.onHorizontalSwipe != undefined){
								this.props.menu.gesture.onHorizontalSwipe(horizontal);
							}
						}break;

						case 'large':{
							if(this.props.menu.gesture.onHorizontalLargeSwipe != undefined){
								this.props.menu.gesture.onHorizontalLargeSwipe(horizontal);
							}

							if(horizontal < 0){
								this.props.dispatch(swipeTo('menu'));
							}else {
								this.props.dispatch(swipeTo('main'));
							}

						}break;
					}
				}break;

				case 'vertical':{
					switch(type){
						case 'small':{
							if(this.props.menu.gesture.onVerticalSwipe != undefined){
								this.props.menu.gesture.onVerticalSwipe(vertical);
							}
						}break;

						case 'large':{
							if(this.props.menu.gesture.onVerticalLargeSwipe != undefined){
								this.props.menu.gesture.onVerticalLargeSwipe(vertical);
							}
						}break;
					}

				}break;
			}
		}

		return true;
	}

	onLayout(ref, event){

		switch(ref){
			case 0 : ref = 'menu'; break;
			case 1 : ref = 'main'; break;
		}

		this.layout[ref] = event.nativeEvent.layout;

	}

	gotTo(item){
		this.props.dispatch(setVisibility(false));
		this.props.dispatch(swipeTo('main'));
		item.action();
	}

	home(){

		if(this.props.messenger.visibility == false){
			Actions.messenger();
		}

		if(this.props.menu.location == 'main'){
			if(this.props.messenger.visibility == true){
				this.props.dispatch(swipeTo('menu'));
			}
		}

		if(this.props.menu.location  == 'menu'){
			this.props.dispatch(swipeTo('main'));
		}
	}

	componentWillReceiveProps(nextProps){

		if( nextProps.menu.goTo != this.props.menu.goTo && nextProps.messenger.session != null ){
			this.swipeTo(nextProps.menu.goTo);
		}

	}

	swipeTo(ref, animated = true){
		if(this.layout[ref] != undefined  ){

			this.scroll.scrollTo({
				y: 0,
				x: this.layout[ref].x,
				animated
			});

		}
	}

	onScrollEnd(){
		this.props.dispatch(goTo(this.props.menu.goTo));
	}

	componentDidUpdate(prevProps, prevState) {

		if( this.props.messenger.visibility == null){

			if( this.props.menu.location == 'menu' ){

				Animated.timing(
					this.state.bounceValue,
					{
						duration: 300,
						toValue: 1,
						friction: 8,
						tension: 100
					}).start();

			}else if( this.props.menu.location == 'main'){

				Animated.timing(
					this.state.bounceValue,
					{
						duration: 300,
						toValue: 0.0001,
						friction: 8,
						tension: 100
					}).start();

			}

		}else if( prevProps.messenger.visibility !== this.props.messenger.visibility && this.props.messenger.visibility == null  ){

			var sequence = [];

			if(prevProps.messenger.visibility != null ){
				sequence.push(
					Animated.timing(
						this.state.bounceValue,
						{
							duration: 300,
							toValue: 0.0001,
							friction: 8,
							tension: 100
						})
					);
			}

			if( this.props.messenger.visibility != null ){
				sequence.push(
					Animated.timing(
						this.state.bounceValue,
						{
							duration: 300,
							toValue: 1,
							friction: 8,
							tension: 100
						})
					);
			}

			if(sequence.length > 0){
				Animated.sequence(sequence).start();
			}


		}

	}

	render() {

		let imageAnimation = { transform: [ {scale: this.state.bounceValue}] };

		let image = asset.bot;

		if(this.props.messenger.visibility == true  && this.props.menu.location == 'main') {
			image = asset.close;
		}

		let pageStyle = [{width: width, height: height}, styles.slide];

		let pages = [
		<MenuView gotTo={this.gotTo.bind(this)} />,
		<View style={styles.viewContainer} >
		{this.props.children}
		</View>
		];

		pages = pages.map((page, i) => {
			return <View style={pageStyle} onLayout={(event)=>{ this.onLayout(i,event);}} key={i}>{page}</View>
		});

		return (
			<View style={[styles.container, {
				width: width,
				height: height
			}]}>
			<StatusBar hidden={true} />
			<ScrollView
				ref='swiper'
				horizontal={true}
				scrollEnabled={false}
				bounces={false}
				onMomentumScrollEnd={this.onScrollEnd.bind(this)}
				{...this._panResponder.panHandlers}>
			{pages}
			</ScrollView>
			{this.props.messenger.session != null  && (
				<TouchableOpacity style={styles.button}  onPress={this.home.bind(this)}>
				<Animated.Image source={image} style={[styles.bot, imageAnimation ]} />
				</TouchableOpacity>)}
			</View>);

	}
}



const styles = StyleSheet.create({
	viewContainer: {
		flex: 1
	},
	container: {
		backgroundColor: 'transparent',
		position: 'relative',
	},
	slide: {
		backgroundColor: 'transparent',
	},
	swipe: {
		backgroundColor: 'transparent',
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'transparent',
	},
	button :{
		position: 'absolute',
		top: 30,
		right: -10
	},
	bot :{
		borderRadius:30,
		width:60,
		height:60
	},
})



function mapStateToProps(state) {
	return {
		menu : state.menu,
		card : state.card,
		messenger: state.messenger,
		login: state.login
	};
}

export default connect(mapStateToProps)(AppLayout);
