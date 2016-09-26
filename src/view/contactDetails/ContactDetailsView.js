'use strict';

import React, { Component } from 'react';
import { View, Text, Image,  StyleSheet, ScrollView, PanResponder, Dimensions, Animated, Easing, TouchableOpacity,BackAndroid} from 'react-native';
import BackButton from '../common/button/BackButton';
import AppAsset from '../../app/AppAsset';
import { Actions } from 'react-native-router-flux';
import {swipeTo, configureSwipe} from '../menu/MenuAction';
import {connect} from 'react-redux';

const height = Dimensions.get('window').height;

class ContactDetailsView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fadeAnim: new Animated.Value(0),
			animPictureValue: new Animated.Value(-200),
			animContentValue: new Animated.Value(height)
		};
	}

	componentDidMount() {

		this.scroll = this.refs.profileSwiper.getScrollResponder();
		this.position = 0;
		this.animeView();

	}

	scrollTo(y){
		this.scroll.scrollTo({
			y: y,
			x: 0,
			animated : true
		});
		this.position = y;
	}

	onPointLayout(event){
		this.pointPosition = event.nativeEvent.layout.y + 300;

		this.setState({
			pointHeight: event.nativeEvent.layout.height
		});
	}

	onTrophyLayout(event){
		this.trophyPosition = event.nativeEvent.layout.y;
	}

	animeView(){

		let backAfter=	Animated.timing(
			this.state.fadeAnim,
			{
				toValue: 1,
				delay : 200,
				duration : 300
			});

		let picAfter =	Animated.timing(
			this.state.animPictureValue,
			{
				toValue: -10,
				delay : 300,
				duration: 300,
				easing : Easing.ease
			});

		let formAfter=	Animated.timing(
			this.state.animContentValue,
			{
				toValue: 20,
				delay : 200,
				duration: 300,
				easing : Easing.ease
			});

		Animated.parallel([ formAfter, picAfter, backAfter]).start();

	}

	configureScroll(){
		this.props.dispatch(
			configureSwipe({
				onVerticalSwipe : this.onVerticalSwipe.bind(this),
				onVerticalLargeSwipe : this.onVerticalSwipe.bind(this)
			})
			);
	}


	onVerticalSwipe(distance) {
		if(distance >0){
			if(this.position ==  0){
				this.scrollTo(this.pointPosition);
			}else if(this.position ==  this.pointPosition ){
				this.scrollTo(this.trophyPosition);
			}
		}else{
			if(this.position ==  this.pointPosition ){
				this.scrollTo(0);
			}else if(this.position ==  this.trophyPosition ){
				this.scrollTo(this.pointPosition);
			}
		}
		return true;
	}


	render() {

		console.log('props',this.props);

		let image = images['alice'];


		if(this.props.contact.username !== undefined && images[this.props.contact.username] !== undefined){
			image = images[this.props.contact.username];
		}

		return (
			<View style={style.container} onLayout={this.configureScroll.bind(this)}>
			<ScrollView
			ref='profileSwiper'
			horizontal={false}
			scrollEnabled={false}
			>
			<View style={{height: height - this.state.pointHeight}} >

			<View style={style.row}>
			<BackButton image={AppAsset.back} back={Actions.pop} style={{ opacity : this.state.fadeAnim}} />
			<Animated.Image source={image} style={{top : this.state.animPictureValue}}/>
			</View>
			</View>
			<Animated.View style={{top : this.state.animContentValue}} onLayout={this.onPointLayout.bind(this)} >
			<View style={style.content} >
			<Text style={style.name}>{this.props.contact.givenName}</Text>
			<Text style={style.name}>{this.props.contact.familyName}</Text>
			<View style={style.line}>
			<Text style={style.address}>{this.props.contact.adresse}</Text>
			</View>
			<View style={style.row}>
			<View style={style.action}>
			<Image source={asset.modify} />
			<Text style={style.param}>MODIFIER MES PARAMÈTRES</Text>
			</View>
			</View>
			</View>
			<Image source={asset.point}/>
			</Animated.View>

			<Image onLayout={this.onTrophyLayout.bind(this)} source={asset.trophy}/>

			</ScrollView>
			</View>)
	}

}


const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection: 'column'
	},
	content :{
		padding:30,
		height : 300,
		justifyContent: 'flex-start',
		flexDirection: 'column'

	},
	name : {
		fontFamily : 'Montserrat-Bold',
		fontSize: 36,
		lineHeight : 36,
		marginTop:2,
		marginBottom:2,
		color : '#120037'
	},
	address : {
		fontFamily : 'Montserrat-Light',
		fontSize: 14,
		color : '#120037',
		marginTop:20,
		marginBottom:10,
	},
	line: {
		borderBottomWidth: 1,
		paddingBottom: 20,
		borderColor: '#ECECED',
	},
	row : {
		flex: 1,
		flexDirection: 'row',
		alignItems : 'center',
		justifyContent : 'center'
	},
	action : {
		flexDirection: 'row',
		alignItems : 'flex-start',
		marginTop:10,
		marginBottom:10,
	},
	param : {
		flex : 1,
		lineHeight : 20,
		fontFamily : 'Montserrat-UltraLight',
		fontSize: 10,
		color : '#120037',
	}
});

const asset = {
	alice: require('../profile/asset/alice.png'),
	trophy : require('../profile/asset/trophy.png'),
	point : require('../profile/asset/point.png'),
	modify : require('../profile/asset/modify.png'),
};

const images = {
	"alice" : require('../profile/asset/alice.png'),
	"philippe" : require('../profile/asset/philippe.png'),
	"remy" : require('../profile/asset/remy.png'),
	"jerome" : require('../profile/asset/jerome.png'),
	"heloise" : require('../profile/asset/heloise.png'),
	"nathalie" : require('../profile/asset/nathalie.png')
};


function mapStateToProps(state) {
	return {
		messenger: state.messenger
	};
}

export default connect(mapStateToProps)(ContactDetailsView);
