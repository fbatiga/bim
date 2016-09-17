import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import AppAsset from '../../../app/AppAsset';
import BackButton from '../button/BackButton';
import ContentTitle from '../title/ContentTitle';
import Title from '../title/Title';

const width = Dimensions.get('window').width;

export default class QrCodeStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {transferLabel: this.props.transferLabel};
	}

	render() {
		return (
			<View style={style.container}>
			<BackButton image={AppAsset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
			<View style={style.top}>
			<ContentTitle>{this.props.subtitle}</ContentTitle>
			<View style={style.imageContainer}>
			<Image source={AppAsset.qrcode} style={style.image}/>
			</View>
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

const style = StyleSheet.create({
	container: {
		backgroundColor: AppGuideline.colors.deepBlue,
		flex: 1
	},
	top: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue,
		marginHorizontal: 20,
		paddingTop : 50,
		justifyContent: 'center'
	},
	imageContainer: {
		marginBottom: 30,
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		height: 278,
		width: 278
	},
});
