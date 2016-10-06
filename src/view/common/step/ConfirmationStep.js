import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../button/BackButton';
import Title from '../title/Title';

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
class ConfirmationStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {transferLabel: this.props.transferLabel};
	}

	renderDuration(duration) {
		if (this.props.duration === 'Un versement unique') {
			return 'unique';
		} else if (this.props.duration === 'Tous les mois') {
			return 'mensuel';
		} else if ('Tous les trimestres') {
			return 'trimestriel'
		}

		return null;
	}

	renderConfimtext() {
		if (this.props.card) {
			return (
				<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{color: '#fff', fontSize: 22, lineHeight: 40}}>Création d'une carte prépayée </Text>
				<Text style={{color: '#fff', fontSize: 22, lineHeight: 40}}>avec un versement </Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
					fontSize: 22,
					lineHeight: 40
				}}>
					{this.renderDuration(this.props.duration)}
				</Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
					fontSize: 22,
					lineHeight: 40
				}}> de {this.props.amount} €</Text>
				<Text  style={{color: '#fff', fontSize: 22, lineHeight: 40}}> pour </Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
					fontSize: 22,
					lineHeight: 40
				}}>{this.props.recipient}.</Text>
				</View>
				);
		}
		else {
			return (
				<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{color: AppGuideline.colors.alternative,
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight', lineHeight: 40}}>{this.props.transferLabel}</Text>
				<Text style={{color: '#fff',
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight', lineHeight: 40}}> de </Text>
				<Text style={{color: AppGuideline.colors.alternative,
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight', lineHeight: 40}}>{this.props.amount} €</Text>
				<Text  style={{color: '#fff',
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight', lineHeight: 40}}> pour </Text>
				<Text style={{
					color: AppGuideline.colors.alternative,
				fontSize:24,
				fontFamily : 'Montserrat-UltraLight', lineHeight: 40
			}}>{this.props.recipient}.</Text>
				</View>
				);
		}
	}

	renderPictures() {
		const { recipient, recipientId, originator, card } = this.props;
		let originatorImage = asset.transfertConfirm2;
		let recipientImage = asset.transfertConfirm1;

		console.log(originator);
		console.log(recipient);
		console.log(recipientId);

		if (recipientId !== undefined && images[recipientId] !== undefined) {
			recipientImage = images[recipientId];
		}
		if (originator.username !== undefined && images[originator.username] !== undefined) {
			originatorImage = images[originator.username];
		}

		return (
			<View style={styles.imageContainer}>
				<Image source={originatorImage} style={styles.imageUser}/>
				<Image source={asset.virementSpeed} style={styles.imageGif}/>
				<Image source={recipientImage} style={styles.imageUser}/>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<BackButton image={asset.back_green} back={this.props.back} />
				<Title>{this.props.title}</Title>
				<View style={styles.top}>
					<View style={{alignItems: 'center'}}>
						<Text style={{
							color: AppGuideline.colors.white,
							marginTop: 10,
							marginBottom: 15,
							fontSize:24,
							fontFamily : 'Montserrat-UltraLight',
						}}>
							{
								this.props.card ?
								null :
								(this.props.subTitle || 'Confirmer le B!M')
							}
						</Text>
					</View>
					{this.renderConfimtext()}
				</View>
				{this.renderPictures()}
				<TouchableOpacity style={{
					backgroundColor: AppGuideline.colors.lightviolet,
					padding: 15
				}}
				onPress={()=> {
					this.props.confirm(this.props.amount)
				}}>
					<Text style={{padding: 10, textAlign: 'center',
	          fontSize:15,
	          fontFamily : 'Montserrat-SemiBold',
						color: '#FFF'
					}}>CONFIRMER</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const images = {
	"alice" : require('../../profile/asset/alice.png'),
	"philippe" : require('../../profile/asset/philippe.png'),
	"remy" : require('../../profile/asset/remy.png'),
	"jerome" : require('../../profile/asset/jerome.png'),
	"heloise" : require('../../profile/asset/heloise.png'),
	"nathalie" : require('../../profile/asset/nathalie.png')
};

ConfirmationStep.propTypes = {
	title: React.PropTypes.string
};
