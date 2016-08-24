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


	render(){

		let menu = [
		{text : 'PROFIL', action : Actions.profile },
		{text : 'CONTACTS', action : Actions.contact },
		{text : 'COMPTES', action : Actions.overview },
		{text : 'JOURNAL', action : Actions.overview },
		{text : 'CARTES', action : Actions.card }]

		return (
			<View style={style.container} >
				{menu.map((item,index)=>{
					return (<TouchableOpacity  key={index}  onPress={()=>{ this.props.gotTo(item)}}>
								<Text style={style.title} >{item.text}</Text>
                            </TouchableOpacity>);
				})}
            <TouchableOpacity onPress={()=>{ this.props.gotTo({action:Actions.parameters})}}  >
				<Image source={asset.setting}  style={style.setting} />
                </TouchableOpacity>
			</View>
		);
	}
}
