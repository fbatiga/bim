'use strict'
import React, { Component } from 'react';
import { View, Text, TouchableOpacity , Dimensions, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { init } from './AddAccountAction';
import AppAsset from '../../app/AppAsset';
import AppGuideline from '../../app/AppGuideline';
import BackButton from '../common/button/BackButton';
import Title from '../common/title/Title';

class addAccount extends Component {

	render() {
		return (
			<View style={style.container}>
			<BackButton image={AppAsset.back_green} back={Actions.pop} />
		<Title>COMPTES</Title>
				<View style={style.top}>
					<View>
						<Text style={style.textTitle}>Type de</Text>
						<Text style={style.textTitle}>compte :</Text>
					</View>
				</View>
				<View style={style.bottom}>
					<TouchableOpacity onPress={()=> {
							Actions.addExistingAccount();
					}}>
						<View style={style.lines}>
							<Text style={style.text}>Ajouter un compte existant</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> {
							Actions.addJackpot();
					}}>
						<View style={style.lines}>
							<Text style={style.text}>Créer une cagnotte</Text>
						</View>
					</TouchableOpacity>
					<View style={style.lines}>
						<Text style={style.text}>Ouvrir un compte épargne </Text>
						<Text style={style.textLight}>(Bientôt disponible)</Text>
					</View>
				</View>
			</View>
		);
	}
}


const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue,
		justifyContent: 'center',
	},
	bottom: {
		backgroundColor: AppGuideline.colors.white
	},
	textTitle: {
		fontFamily : 'Montserrat-UltraLight',
		fontSize: 36,
		lineHeight : 36,
		marginTop: 24,
		marginLeft: width / 8,
		color: AppGuideline.colors.alternative
	},
	lines: {
		borderBottomWidth: 1,
		borderBottomColor: AppGuideline.colors.lightGrey,
		flexDirection: 'row',
		height: 100,
		paddingHorizontal: 25,
		alignItems: 'center',
		// flexWrap: 'wrap'
	},
	text: {
		color: AppGuideline.colors.deepBlue,
		fontFamily : 'Montserrat-UltraLight',
		fontSize: 14,
		lineHeight : 14,
	},
	textLight: {
		color: AppGuideline.colors.alternative
	}
});


export default connect()(addAccount);
