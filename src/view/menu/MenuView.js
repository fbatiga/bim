'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions , Animated, Easing} from 'react-native';
import AppAsset  from '../../app/AppAsset';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {setVisibility} from '../messenger/MessengerAction';

const {width} = Dimensions.get('window');

class MenuView extends Component {

	constructor(props){
		super(props);
		this.menu =[
			{text : 'PAYER', action :  Actions.pay },
			{text : 'COMPTES', action : Actions.overview },
			{text : 'CONTACTS', action : Actions.contact },
			{text : 'CARTES', action : Actions.card },
			{text : 'JOURNAL', action : Actions.journal }
		];

		this.state = {
			items :[{
			component : (<TouchableOpacity onPress={this.messenger.bind(this)}>
							<View style={style.button}  >
								<Image source={AppAsset.bot} style={[style.bot]} />
								{this.props.messenger.notification && (
								<View style={style.notificationBubble}>
								<Text style={style.notificationText}>{this.props.messenger.messages.length}</Text>
								</View>
								)}
							</View>
						</TouchableOpacity>),
			left: new Animated.Value(-width)
		}]
	};


		this.menu.map((item)=>{
			this.state.items.push({
				component : (<TouchableOpacity  onPress={()=>{ this.props.gotTo(item)}}>
								<Text style={style.title} >{item.text}</Text>
							</TouchableOpacity>),
				left: new Animated.Value(-width)
			});
		});
	}

	messenger(){
		this.props.dispatch(setVisibility(true));
	}

	componentWillReceiveProps(nextProps) {


		if(	nextProps.menu.location ==  'main'  && nextProps.menu.goTo == 'menu'){

			let animation = [];

			this.state.items.map((link, index)=>{

				animation.push(
					Animated.timing(
						link.left,
						{
							toValue: 0,
							duration : 400,
							easing : Easing.ease,
							delay : index * 50
						})
					);

			});

			Animated.parallel(animation).start();
		}



		if(	nextProps.menu.location ==  'menu'  && nextProps.menu.goTo == 'main'){

			let animation = [];

			this.state.items.map((link, index)=>{

				animation.push(
					Animated.timing(
						link.left,
						{
							toValue: -width,
							duration : 200
						})
					);

			});

			Animated.parallel(animation).start();
		}

	}



	render(){

		return (
			<View style={[style.container, this.props.style]} >
			{this.state.items.map((item,index)=>{
				return (
					<Animated.View  key={index}  style={{left: item.left}}>
					{item.component}
					</Animated.View>
				);
			})}
			<TouchableOpacity onPress={()=>{ this.props.gotTo({action: Actions.profile})}}  >
			<Image source={AppAsset.setting}  style={style.setting} />
			</TouchableOpacity>
			</View>
			);
	}
}




const style = StyleSheet.create({
	container: {
		flex : 1,
		flexDirection : 'column',
		backgroundColor : '#120037',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingTop : 50
	},
	title : {
		fontFamily : 'Montserrat-Bold',
		letterSpacing: 10,
		lineHeight: 60,
		marginTop: 15,
		color : '#B8A4E6',
		fontSize: 25
	},
	setting : {
		marginTop : 70
	},
	button :{
		height:80
	},
	bot :{
		borderRadius:30,
		width:65,
		height:65
	},
	notificationBubble : {
		borderRadius : 20,
		backgroundColor:'#FF2D5D' ,
		width: 20,
		height: 20,
		overflow : 'hidden',
		left : -5,
		top : -65,
	},
	notificationText : {
		color: '#FFFFFF',
		left: 6,
		position: 'absolute',
		fontFamily: 'Roboto-Black',
		fontSize:14
	},
});


function mapStateToProps(state) {
	return {
		menu : state.menu,
		messenger : state.messenger
	};
}

export default connect(mapStateToProps)(MenuView);
