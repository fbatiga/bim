import React, { Component } from 'react';
import { Text, View,  TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';
import Title from '../../common/title/Title';

const styles = StyleSheet.create({
	container: {
		backgroundColor: AppGuideline.colors.deepBlue,
		flex: 1
	},
	top: {
		flex: 1,
		margin : 20,
		justifyContent: 'center',
		backgroundColor: AppGuideline.colors.deepBlue,
	},
	imageContainer: {
		marginBottom: 80,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		height: 200,
		width: 184
	},
	text : {
		height: 40,
		fontFamily : 'Montserrat-UltraLight',
		fontSize: 24,
		lineHeight : 24,
	}
});

export default class JackportConfirmView extends Component {
	render() {
		return (
			<View style={styles.container}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title|| 'B!M'}</Title>
			<View style={styles.top}>
			<View style={{ alignItems: 'center' }}>
			<Text style={[styles.text , {
				color: AppGuideline.colors.white,
				marginTop: 10,
				height: 40
			}]}>
			{this.props.subTitle || 'Confirmer le B!M' }</Text>
			</View>
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
			<Text style={[ styles.text , {color: AppGuideline.colors.alternative}]}>{this.props.name}</Text>
			<Text style={[ styles.text , {color: '#fff'}]}> avec </Text>
			<Text style={[ styles.text , {color: AppGuideline.colors.alternative}]}>{this.props.duration}</Text>
			<Text style={[ styles.text , {color: '#fff' }]}> de </Text>
			<Text style={[ styles.text , {color: AppGuideline.colors.alternative }]}>{this.props.amount} €.</Text>
			</View>
			</View>
			<View style={styles.imageContainer}>
			<Image source={asset.cagnotteConfirm} style={styles.image} resizeMode='contain'/>
			</View>
			<TouchableOpacity style={{
				backgroundColor: AppGuideline.colors.lightviolet,
				padding: 15
			}}
			onPress={()=> {
				this.props.confirm();
			}}>
			<Text style={{padding: 10, textAlign: 'center',
                    fontSize:15,
                    fontFamily : 'Montserrat-SemiBold', color: '#FFF'}}>CONFIRMER</Text>
			</TouchableOpacity>
			</View>
			);
	}
}

JackportConfirmView.propTypes = {
	title: React.PropTypes.string
};
