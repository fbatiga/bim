'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions , Animated, Easing} from 'react-native';
import asset  from '../../app/AppAsset';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');

class MenuView extends Component {

	constructor(props){
		super(props);
		this.state = {

			menu : [
			{text : 'PAYER', action :  Actions.transfer, left: new Animated.Value(-width) },
			{text : 'COMPTES', action : Actions.overview, left: new Animated.Value(-width) },
			{text : 'CONTACTS', action : Actions.contact, left: new Animated.Value(-width)  },
			{text : 'CARTES', action : Actions.card, left: new Animated.Value(-width)  },
			{text : 'JOURNAL', action : Actions.journal, left: new Animated.Value(-width)  }]
		}
	}

	componentWillReceiveProps(nextProps) {


		if(	nextProps.menu.location ==  'main'  && nextProps.menu.goTo == 'menu'){

			let animation = [];

			this.state.menu.map((link, index)=>{

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

			this.state.menu.map((link, index)=>{

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
			{this.state.menu.map((item,index)=>{
				return (
					<Animated.View  key={index}  style={{left: item.left}}>
					<TouchableOpacity   onPress={()=>{ this.props.gotTo(item)}}>
					<Text style={style.title} >{item.text}</Text>
					</TouchableOpacity>
					</Animated.View>

					);
			})}
			<TouchableOpacity onPress={()=>{ this.props.gotTo({action: Actions.profile})}}  >
			<Image source={asset.setting}  style={style.setting} />
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
		paddingTop : 70
	},
	title : {
		fontFamily : 'Montserrat-Bold',
		letterSpacing: 10,
		margin : 30,
		color : '#B8A4E6',
		fontSize: 25
	},
	setting : {
		marginTop : 50
	}
});


function mapStateToProps(state) {
	return {
		menu : state.menu
	};
}

export default connect(mapStateToProps)(MenuView);
