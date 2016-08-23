'use strict'
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';
import Swiper from 'react-native-swiper';
import MenuView from '../view/menu/MenuView';
import asset from '../asset';
import {connect} from 'react-redux';


const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch"
	}
})



class AppLayout extends Component {


	getSwipe(){
		return this.refs.swiper;
	}


	render() {

		console.log('navigate', this.state, this.props);
		return (
			<Swiper
			loop={false}
			ref='swiper'
			showsPagination={false}
			index={1}>
			<MenuView swipe={this.getSwipe.bind(this)} />
			<Swiper
			horizontal={false}
			loop={false}
			showsPagination={false}
			index={1}>
			<View style={styles.viewContainer} >
			{this.props.children}
			</View>
			</Swiper>
		</Swiper>)
	}
}


function mapStateToProps(state) {
    return {
        account: state.account
    };
}

export default connect(mapStateToProps)(AppLayout);


