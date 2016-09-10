'use strict';

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import asset from '../common/asset';

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
						<Image source={asset.contact.pic}  style= {{ marginBottom : 30}} />
						<Image source={asset.contact.info} />
					</ScrollView>
				</View>
					<TouchableOpacity style={style.back} onPress={Actions.pop} >
						<Image source={asset.contact.back}  style={{}} />
				</TouchableOpacity>
			</View>);
	}

}

function mapStateToProps(state) {
	return {
		contactdetails: state.contactdetails
	};
}

export default connect(mapStateToProps)(ContactDetailsView);
