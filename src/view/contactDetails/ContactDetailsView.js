'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppAsset from '../../app/AppAsset';

import {connect} from 'react-redux';
import {init} from './ContactDetailsAction';


const {width, height} = Dimensions.get('window');


const style = StyleSheet.create({
	container: {
		flex: 1
	},
	back: {
		position:'absolute',
		top: 20,
		left: -1,
	}
});


class ContactDetailsView extends Component {

	render() {
		return (
			<View style={style.container}>

				<View style= {{flex:1}} >
					<ScrollView   style= {{flex:1}} contentContainerStyle={{alignItems: 'center'}} bounces={false}>
						<Image source={asset.pic}  style= {{ marginBottom : 30}} />
						<Image source={asset.info} />
					</ScrollView>
				</View>
					<TouchableOpacity style={style.back} onPress={Actions.pop} >
						<Image source={asset.back}  style={{}} />
				</TouchableOpacity>
			</View>);
	}

}

const asset ={
	profile: require('./asset/profile.png'),
	form : require('./asset/form.png'),
	back : require('./asset/back.png'),
	info : require('./asset/info.png'),
	pic : require('./asset/pic.png'),
};


function mapStateToProps(state) {
	return {
		contactdetails: state.contactdetails
	};
}

export default connect(mapStateToProps)(ContactDetailsView);
