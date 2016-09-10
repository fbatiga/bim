'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import asset  from '../../app/AppAsset';
import { Actions } from 'react-native-router-flux';


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


export default class MenuView extends Component {


	render(){

		let menu = [
		{text : 'PAYER', action :  Actions.transfer},
		{text : 'COMPTES', action : Actions.overview },
		{text : 'CONTACTS', action : Actions.contact },
		{text : 'CARTES', action : Actions.card },
		{text : 'JOURNAL', action : Actions.journal }]

		return (
			<View style={[style.container, this.props.style]} >
				{menu.map((item,index)=>{
					return (<TouchableOpacity  key={index}  onPress={()=>{ this.props.gotTo(item)}}>
								<Text style={style.title} >{item.text}</Text>
                            </TouchableOpacity>);
				})}
            <TouchableOpacity onPress={()=>{ this.props.gotTo({action: Actions.profile})}}  >
				<Image source={asset.setting}  style={style.setting} />
                </TouchableOpacity>
			</View>
		);
	}
}
