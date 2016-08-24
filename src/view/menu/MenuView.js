'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import asset  from '../../asset';
import { Actions } from 'react-native-router-flux';


const style = StyleSheet.create({
    container: {
    	flex : 1,
    	flexDirection : 'column',
        backgroundColor : '#120037',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title : {
		fontFamily : 'Montserrat-ExtraBold',
		letterSpacing: 3,
		margin : 20,
		color : '#B8A4E6',
		fontSize: 28
	},
	setting : {
		marginTop : 50
	}
});


export default class MenuView extends Component {

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {

	}

	render(){

		let menu = [

		{text : 'PROFIL', action : Actions.messenger },
		{text : 'CONTACTS', action : Actions.contact },
		{text : 'COMPTES', action : Actions.overview },
		{text : 'JOURNAL', action : Actions.messenger },
		{text : 'CARTES', action : Actions.card }]
		return (
			<View style={style.container} >
				{menu.map((item,index)=>{
					return (<TouchableOpacity  key={index}  onPress={()=>{ item.action(); this.props.swipe().scrollBy(1)}}>
								<Text style={style.title} >{item.text}</Text>
                            </TouchableOpacity>);
				})}
            <TouchableOpacity onPress={()=>{Actions.parameters(); this.props.swipe().scrollBy(1); } } >
				<Image source={asset.setting}  style={style.setting} />
                </TouchableOpacity>
			</View>
		);
	}
}
