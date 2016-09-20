'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import {Actions} from 'react-native-router-flux';
import MessengerButton from '../item/MessengerButton';
import asset from '../../../app/AppAsset';


class MessengerBottom extends Component {

	constructor(props){
		super(props);
		this.items = [];
		this.position= 0;
		this.backgroundColor = ['#79F0CC','#B8A4E6'];
		this.state = {
			buttons: [],
			icon : 0,
			backgroundColor : this.backgroundColor[0],
			leftTransition: new Animated.Value(-200),
			rotation: new Animated.Value(0)
		};
	}

	favorite(){
		if(this.state.backgroundColor == this.backgroundColor[0]){
			Animated.parallel([
				Animated.spring(
					this.state.leftTransition,
					{
						duration: 200,
						toValue: -15,
						friction: 7,
						tension: 40
					}
				),
				Animated.timing(
					this.state.rotation,
					{
						toValue: 2,
						duration: 200
					}
				),
			]);

			this.setState({
				backgroundColor : this.backgroundColor[1]
			});
		}else{
			Animated.parallel([
				Animated.spring(
					this.state.leftTransition,
					{
						duration: 200,
						toValue: -200,
						friction: 7,
						tension: 40
					}
				),
				Animated.timing(
					this.state.rotation,
					{
						toValue: 0,
						duration: 200
					}
				)
  		]),

			this.setState({
				backgroundColor : this.backgroundColor[0]
			});
		}
	}



	render(){
		return (
			<Animated.View style={[styles.container, this.props.style, {backgroundColor: this.state.backgroundColor}]} >

			{ this.props.menu.location == 'main'  && this.props.menu.goTo == 'main'&& <Animated.Image source={asset.bigStar} style={{ position:'absolute', bottom: 10, left: this.state.leftTransition, transform: [{rotate: this.state.rotation.interpolate({ inputRange: [0, 0.75], outputRange: [ '-100deg', '-63deg' ]})} ] }} />}


			<View
			ref="listView"
			style={styles.content}

			>
			{this.props.buttons.map((text, index)=>{
				if(text != ''){
					return (<MessengerButton text={text}
						key={index}
						index={index}
						onPress={this.props.onPress} />);
				}
				// }else{
				// 	return ( <View style={styles.spacer} key={index} />);
				// }
			})}

			{this.props.buttons.length>0 && (
						<MessengerButton text='...'
							key={0}
							index={0}
							onPress={this.props.onPress} />
			)}
				</View>
				<View style={styles.bottom}>
				{this.props.buttons.length>0 && (<TouchableOpacity style={{  bottom: 10, left: 10, height:20, width:20}} onPress={this.favorite.bind(this)}>
					{(this.state.backgroundColor == this.backgroundColor[0])  && (
						<Image source={asset.star}  />
					)}
					{(this.state.backgroundColor == this.backgroundColor[1]) && (
						<Image source={asset.cross}  />
					)}
				</TouchableOpacity>)
			}
				</View>

			</Animated.View>
			);
	}
}


const styles = StyleSheet.create({
	button: {
		margin :5,
		padding:10,
		backgroundColor : '#FFFFFF'
	},
	container :{
		flexDirection:'column',
	},
	bottom :{
		height :20,
		flexDirection:'row',
		alignItems: 'flex-start',
		justifyContent:  'flex-start',
	},
	content :{
		flex:1,
		padding : 5,
		alignSelf : 'center',
		flexDirection:'row',
		flexWrap : 'wrap',
		alignItems: 'center',
		justifyContent:  'space-between',
	},
	spacer: {
		height: 5,
		width: 100
	},
	user :{
		top : 118,
		borderRadius:20,
		width:40,
		height:40,
		marginRight: 10,
		marginLeft: 0
	},
});

function mapStateToProps(state) {
	return {
		menu : state.menu
	};
}

export default connect(mapStateToProps)(MessengerBottom);
