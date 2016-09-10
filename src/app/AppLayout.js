'use strict'
import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions,  StyleSheet, TouchableOpacity , Image, Animated, ScrollView, PanResponder} from 'react-native';
import Swiper from 'react-native-swiper';
import MenuView from '../view/menu/MenuView';
import {swipeTo} from '../view/menu/MenuAction';
import asset from '../view/../app/AppAsset';
import {connect} from 'react-redux';
import {loadSession} from '../view/login/LoginAction';
import {setVisibility} from '../view/messenger/MessengerAction';
import { Actions } from 'react-native-router-flux';


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch"
	},
	container: {
		backgroundColor: 'transparent',
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
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease:this.handlePanResponderRelease.bind(this)
		});
	}

	handlePanResponderRelease(evt, gestureState) {
		let distance = gestureState.moveX- gestureState.x0;
		let limit = width/3;
		if(distance > limit){
			this.props.dispatch(swipeTo('menu'));
		}else if(distance < -limit){
			this.props.dispatch(swipeTo('main'));
		}
	}

	onLayout(ref, event){

		if(this.refs.swiper != undefined && this.scroll == null ){
		}
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

		if(this.props.menu.ref == 'main'){
			if(this.props.messenger.visibility == true){
				this.props.dispatch(swipeTo('menu'));
			}
		}

		if(this.props.menu.ref  == 'menu'){
			this.props.dispatch(swipeTo('main'));
		}
	}

	componentWillReceiveProps(nextProps){



		if( nextProps.menu.ref != this.props.menu.ref && nextProps.messenger.session != null ){
			this.swipeTo(nextProps.menu.ref);
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

	componentDidUpdate(prevProps, prevState) {

		if( this.props.messenger.visibility == null){

			if( this.props.menu.ref == 'menu' ){


				Animated.timing(
					this.state.bounceValue,
					{
						duration: 300,
						toValue: 1,
						friction: 8,
						tension: 100
					}).start();

			}else if( this.props.menu.ref == 'main'){


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

		if(this.props.messenger.visibility == true  && this.props.menu.ref == 'main') {
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
			<View>
			<StatusBar hidden={true} />
			<View style={[styles.container, {
				width: width,
				height: height
			}]}>
			<ScrollView
			ref='swiper'
			horizontal={true}
			scrollEnabled={false}
			bounces={false}
			{...this._panResponder.panHandlers}
			>
			{pages}
			</ScrollView>
			{this.props.messenger.session != null  && (
				<TouchableOpacity style={styles.button}  onPress={this.home.bind(this)}>
				<Animated.Image source={image} style={[styles.bot, imageAnimation ]} />
				</TouchableOpacity>)}
			</View>
			</View>);

	}
}


function mapStateToProps(state) {
	return {
		menu : state.menu,
		card : state.card,
		messenger: state.messenger,
		login: state.login
	};
}

export default connect(mapStateToProps)(AppLayout);
