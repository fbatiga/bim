'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MessengerButton from '../item/MessengerButton';
import asset from '../../../asset';

const styles = StyleSheet.create({
	button: {
		marginTop : 10,
		padding:10,
		backgroundColor : '#FFFFFF'
	},
	container :{
		backgroundColor: '#79F0CC',
		flex: 1,
		flexDirection:'row'
	},
	content :{
		flex : 1,
		top : 120,
		right : 0,
		alignItems: 'flex-end'
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


class MessengerBottom extends Component {

	constructor(props){
		super(props);
		this.items = [];
		this.position= 0;
		this.state = {
			choices: [],
			icon : 0
		};
	}


	setChoices(choices) {
		this.setState({
			choices: choices.concat(['','',''])
		});
	}

	setPosition(index){
			console.log("setPosition", index);


		if(this.items[index] !== undefined ){

			this.items[index].setState({
				opacity: 1
			});

			this.position = index;

			console.log("this.position = index", index);


			if(this.items[index-1] !== undefined){
				this.items[index-1].setState({
					opacity: 0.7
				});
			}

			if(this.items[index+1] !== undefined){
				this.items[index+1].setState({
					opacity: 0.7
				});
			}

			if(this.items[index-2] !== undefined){
				this.items[index-2].setState({
					opacity: 0.4
				});
			}

			if(this.items[index+2] !== undefined){
				this.items[index+2].setState({
					opacity: 0.4
				});
			}

			if(this.items[index-3] !== undefined){
				this.items[index-3].setState({
					opacity: 0.15
				});
			}

			if(this.items[index+3] !== undefined){
				this.items[index+3].setState({
					opacity: 0.15
				});
			}

		}
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

	componentDidMount() {
		this.scrollResponder = this.refs.listView.getScrollResponder();
	}



	handlePanResponderRelease(evt, gestureState) {
		let start = gestureState.moveY;
		let dest = gestureState.y0;
		let distance = gestureState.moveY- gestureState.y0;

		let direction = Math.sign(-distance);

		this.setPosition(this.position+ direction);
	}


	delete(item){
		delete this.items[item.props.index];
	}

	save(item){
		console.log('save',item.props.index);
		this.items[item.props.index] = item;
		if(item.props.index == this.position){
			this.setPosition(this.position);
		}
	}


	componentWillReceiveProps(nextProps) {
		this.setChoices(nextProps.choices);
		this.position = 0;
	}


	scrollTo(y){
		this.scrollResponder.scrollTo({
			y: y,
			x: 0
		});
	}


	render(){
		return (
			<View   style={[styles.container, this.props.style]} >
			<ScrollView
			ref="listView"

			{...this._panResponder.panHandlers}

			contentContainerStyle={styles.content}
			scrollEventThrottle={200}
			bounces={false}
			scrollEnabled={false}

			>
			{this.state.choices.map((text, index)=>{
				if(text != ''){
					return (<MessengerButton text={text}
						save={this.save.bind(this)}
						key={index}
						index={index}
						scrollTo={this.scrollTo.bind(this)}
						onPress={this.props.onPress} />);
				}else{
					return ( <View style={styles.spacer} key={index} />);
				}
			})}
			</ScrollView>
			<Image source={asset.user}  style={[styles.user]} />
			</View>
			);
	}
}



export default MessengerBottom;
