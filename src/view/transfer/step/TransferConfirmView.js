import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/item/button/BackButton';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		backgroundColor: AppGuideline.colors.deepBlue,
		flex: 1
	},
	top: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue,
		marginHorizontal: 20,
		justifyContent: 'center'
	},
	imageContainer: {
		marginBottom: 80,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageUser: {
		height: 90,
		width: 90
	},
	imageGif: {
		height: 100,
		width: 45
	},
});

export default
class TransferConfirmView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {transferLabel: this.props.transferLabel};
	}

	renderConfimtext() {
		if (this.props.card) {
			return (
				<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{color: '#fff', fontSize: 22, height: 35}}>Création d'une carte prépayée </Text>
				<Text style={{color: '#fff', fontSize: 22, height: 35}}>avec un </Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
					fontSize: 22,
					height: 35
				}}>{this.props.duration}</Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
					fontSize: 22,
					height: 35
				}}> de {this.props.amount} €</Text>
				<Text  style={{color: '#fff', fontSize: 22, height: 35}}> pour </Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
					fontSize: 22,
					height: 35
				}}>{this.props.recipient}.</Text>
				</View>
				);
		}
		else {
			return (
				<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{color: AppGuideline.colors.alternative,
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight',}}>{this.props.transferLabel}</Text>
				<Text style={{color: '#fff',
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight',}}> de </Text>
				<Text style={{color: AppGuideline.colors.alternative,
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight',}}>{this.props.amount} €</Text>
				<Text  style={{color: '#fff',
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight',}}> pour </Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight',
				}}>{this.props.transferRecipient}.</Text>
				</View>
				);
		}
	}

	render() {
		return (
			<View style={styles.container}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Text style={AppGuideline.titles.h1}>{this.props.title || 'B!M'}</Text>
			<View style={styles.top}>
			<View style={{alignItems: 'center'}}>
			<Text style={{
				color: AppGuideline.colors.white,
				marginTop: 10,
				marginBottom: 10,
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight',
			}}>
			{
				this.props.card ?
				null :
				(this.props.subTitle || 'Confirmer le B!M')
			}</Text>
			</View>
			{this.renderConfimtext()}
			</View>
			<View style={styles.imageContainer}>
			<Image source={asset.transfertConfirm2} style={styles.imageUser}/>
			<Image source={asset.virementSpeed} style={styles.imageGif}/>
			<Image source={asset.transfertConfirm1} style={styles.imageUser}/>
			</View>
			<TouchableOpacity style={{
				backgroundColor: AppGuideline.colors.lightviolet,
				padding: 15
			}}
			onPress={()=> {
				this.props.confirm(this.props.amount)
			}}>
			<Text style={{padding: 10, textAlign: 'center',
                    fontSize:15,
                    fontFamily : 'Montserrat-SemiBold', color: '#FFF'}}>CONFIRMER</Text>
			</TouchableOpacity>
			</View>
			);
	}
}

TransferConfirmView.propTypes = {
	title: React.PropTypes.string
};
