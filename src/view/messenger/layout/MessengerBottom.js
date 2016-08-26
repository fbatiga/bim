'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MessengerButton from '../item/MessengerButton';
import asset from '../../../asset';

const styles = StyleSheet.create({
	button: {
		margin :5,
		padding:10,
		backgroundColor : '#FFFFFF'
	},
	container :{
		flex: 1,
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


class MessengerBottom extends Component {

	constructor(props){
		super(props);
		this.items = [];
		this.position= 0;
		this.backgroundColor = ['#79F0CC','#B8A4E6'];
		this.state = {
			buttons: [],
			icon : 0,
			backgroundColor : this.backgroundColor[0]
		};
	}


	setButtons(buttons) {
		this.setState({
			buttons: buttons.concat([]),
			backgroundColor : this.backgroundColor[0]
		});
	}


	favorite(){
		if(this.state.backgroundColor == this.backgroundColor[0]){
			this.setState({
				backgroundColor : this.backgroundColor[1]
			});
		}else{
			this.setState({
				backgroundColor : this.backgroundColor[0]
			});
		}
	}

	setShadow(index){

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

	setPosition(index){

		if(this.items[index] !== undefined ){

			this.items[index].setState({
				opacity: 1
			});

			this.position = index;
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
	//	this.scrollResponder = this.refs.listView.getScrollResponder();
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
		this.items[item.props.index] = item;
		if(item.props.index == this.position){
			this.setPosition(this.position);
		}
	}


	componentWillReceiveProps(nextProps) {
		this.setButtons(nextProps.buttons);
		this.position = 0;
	}


	scrollTo(y){
		// this.scrollResponder.scrollTo({
		// 	y: y,
		// 	x: 0
		// });
	}

			// ScrollView
			// ref="listView"
			// {...this._panResponder.panHandlers}
			// contentContainerStyle={styles.content}
			// scrollEventThrottle={200}
			// bounces={false}
			// scrollEnabled={false}
			//
	render(){
		return (
			<View   style={[styles.container, this.props.style, {backgroundColor: this.state.backgroundColor}]} >

			{this.state.backgroundColor == this.backgroundColor[1] && (
				<Image source={asset.bigStar} style={{ position:'absolute', bottom: 10, left: -15}} />
			)}


			<View
			ref="listView"
			style={styles.content}

			>
			{this.state.buttons.map((text, index)=>{
				if(text != ''){
					return (<MessengerButton text={text}
						save={this.save.bind(this)}
						key={index}
						index={index}
						scrollTo={this.scrollTo.bind(this)}
						setShadow={this.setShadow.bind(this)}
						onPress={this.props.onPress} />);
				}
				// }else{
				// 	return ( <View style={styles.spacer} key={index} />);
				// }
			})}

				</View>
				<View style={styles.bottom}>
				{this.state.buttons.length>0 && (<TouchableOpacity onPress={this.favorite.bind(this)}>
					{(this.state.backgroundColor == this.backgroundColor[0]) && (
						<Image source={asset.star} style={{ bottom: 10, left: 10}} />
					)}
					{(this.state.backgroundColor == this.backgroundColor[1]) && (
						<Image source={asset.cross} style={{ bottom: 10, left: 10}} />
					)}
				</TouchableOpacity>)
			}
				</View>

			</View>
			);
	}
}

				//this.state.buttons.length == 0


export default MessengerBottom;
