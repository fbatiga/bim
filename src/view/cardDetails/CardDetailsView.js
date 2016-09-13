'use strict';
import React, { Component } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Text , StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppAsset from '../../app/AppAsset';
import AppGuideline from '../../app/AppGuideline';

import BackButton from '../common/item/button/BackButton';


class CardDetailsView extends Component {
	render(){
		return (
			<View style={CardStyle.cardDetails}>
			<ScrollView>
			<View style={CardStyle.cardLayout}>
			<View style={CardStyle.cardLayoutHeader}>
			<View style={CardStyle.cardLayoutLeft}>
			</View>
			<View style={CardStyle.cardLayoutCenter}>
			<Image source={asset.bimWhite} style={CardStyle.pictoBim}/>
			</View>
			<View style={CardStyle.cardLayoutRight} />
			</View>
			<View style={CardStyle.cardPicto}>
			<Image source={asset.pastequePicto} style={CardStyle.pictoCard}/>
			</View>
			<View style={CardStyle.cardNumber}>
			<Text style={CardStyle.textNumber}>4974</Text>
			<Text style={CardStyle.textNumber}>9066</Text>
			<Text style={CardStyle.textNumber}>2819</Text>
			<Text style={CardStyle.textNumber}>3332</Text>
			</View>
			<View style={CardStyle.cardInfos}>
			<View style={CardStyle.cardInfosLeft}>
			<Text style={CardStyle.cardText}>Pierre Delbosse</Text>
			<Text style={CardStyle.cardText}>EXPIRE FIN 01/19</Text>
			</View>
			<View style={CardStyle.cardInfosRight}>
			<Text style={CardStyle.cardText}>CCV</Text>
			<Text style={CardStyle.cardText}>468</Text>
			</View>
			</View>
			</View>
			<View style={CardStyle.cardOptions}>
			<View style={CardStyle.lines}>
			<Text style={CardStyle.lineLeft}>Vérouiller ma carte</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
			<Image source={asset.lockOpen} style={CardStyle.pictoLock}/>
			</View>
			</View>
			<View style={CardStyle.lines}>
			<Text style={CardStyle.lineLeft}>Changer mon code</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
			<Image source={asset.arrowRight} style={CardStyle.pictoArrow}/>
			</View>
			</View>
			<View style={CardStyle.lines}>
			<Text style={CardStyle.lineLeft}>Gérer mes plafonds</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
			<Image source={asset.arrowRight} style={CardStyle.pictoArrow}/>
			</View>
			</View>
			<View style={CardStyle.lines}>
			<Text style={CardStyle.lineLeft}>Recevoir cette carte pour 10€</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
			<Image source={asset.arrowRight} style={CardStyle.pictoArrow}/>
			</View>
			</View>
			<View style={CardStyle.lines}>
			<Text style={CardStyle.lineLeft}>Payer à l'étranger</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
			<Image source={asset.switchOn} style={CardStyle.pictoSwitch}/>
			</View>
			</View>
			<View style={CardStyle.lines}>
			<Text style={CardStyle.lineLeft}>Payement sur internet</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
			<Image source={asset.switchOff} style={CardStyle.pictoSwitch}/>
			</View>
			</View>
			<View style={CardStyle.lines}>
			<Text style={CardStyle.lineLeft}>Retrait au distributeur</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
			<Image source={asset.switchOn} style={CardStyle.pictoSwitch}/>
			</View>
			</View>
			</View>

			<BackButton image={asset.back} back={Actions.pop} style ={ {margin : 15}}	 />
			</ScrollView>

			</View>
			);
	}
}


const asset = {
	back : require('./asset/back_red.png'),
	bimWhite: require('./asset/bim_trait_blanc.png'),
	pastequePicto: require('./asset/pasteque.png'),
	switchOn: require('./asset/on.png'),
	switchOff: require('./asset/off.png'),
	arrowRight: require('./asset/fleche_droit.png'),
	arrowBackRed: require('./asset/fleche_retour_rouge.png'),
	lockClosed: require('./asset/verrou_fermer.png'),
	lockOpen: require('./asset/verrou_ouvert.png'),

}


const CardStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	bottomRighticon: {
		position: 'absolute',
		bottom: 20,
		right: 0,
		marginRight: -10
	},

	back: {
		position:'absolute',
		top: 20,
		left: -1,
	},
	top: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardImage: {
		position: 'absolute',
		width: 271,
		height: 171
	},
	cardDetails: {
		flex: 1,
		backgroundColor: AppGuideline.colors.white
	},
	cardLayout: {
		backgroundColor: AppGuideline.colors.lightGrey,
		paddingBottom: 30,
		paddingHorizontal: 20
	},
	cardLayoutHeader: {
		flexDirection: 'row',
		marginTop: 30
	},
	cardLayoutLeft: {
		width: 60,
		justifyContent: 'center',
	},
	cardLayoutCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	cardLayoutRight: {
		width: 60
	},
	lines: {
		height: 85,
		borderBottomWidth: 1,
		borderBottomColor: AppGuideline.colors.lightGrey,
		alignItems: 'center',
		paddingHorizontal: 20,
		flexDirection: 'row'
	},
	lineLeft: {
		flex: 1
	},
	pictoLock: {
		width: 14,
		height: 20
	},
	pictoArrow: {
		width: 22,
		height: 20
	},
	pictoSwitch: {
		width: 50,
		height: 20
	},
	pictoBack: {
		width: 30,
		height: 16
	},
	pictoBim: {
		width: 78,
		height: 30
	},
	pictoCard: {
		width: 200,
		height: 100
	},
	cardPicto: {
		marginTop: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	cardNumber: {
		marginTop: 50,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row'
	},
	textNumber: {
		fontSize: 22,
		color: AppGuideline.colors.red
	},
	cardInfos: {
		flexDirection: 'row',
		marginTop: 25
	},
	cardInfosLeft: {
		flex: 1,
		marginLeft: 20
	},
	cardInfosRight: {
		flex: 1,
		alignItems: 'flex-end',
		marginRight: 20
	},
	cardText: {
		color: AppGuideline.colors.deepBlue
	}
});
export default CardDetailsView;
