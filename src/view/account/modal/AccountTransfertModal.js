import React, {Component}from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import moment from 'moment';
import AppAsset from '../../../app/AppAsset';
import { Actions } from 'react-native-router-flux';


export default class AccounTransfertModal extends Component {
	render() {
		return (
			<Modal
			animationType={"slide"}
			transparent={true}
			>

			<View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
			<View style={{height: 200, flex: 1}}>
			<TouchableOpacity style={style.closeModalButton} onPress={this.props.close}>
			<Image source={AppAsset.close}  style={{resizeMode: 'contain', width: 70}} />
			</TouchableOpacity>
			<TouchableOpacity style={style.modalList}
			onPress={() => {
				Actions.transfer({mode: 'transfer'});
				this.props.close();
			}}>
			<View style={style.modalContent}>
			<Text>Faire un transfert</Text>
			</View>
			</TouchableOpacity>

			<TouchableOpacity style={style.modalList}
			onPress={() => {
				Actions.transfer({mode: 'bim'});
				this.props.close();
			}}>
			<View style={style.modalContent}>
			<Text>Faire un Bim</Text>
			</View>
			</TouchableOpacity>
			</View>
			</View>
			</Modal>
			);
	}
}



const style = StyleSheet.create({
	closeModalButton: {
		position : 'absolute',
		top: -70,
		right: -40,
		padding:0,
		width: 100,
		zIndex: 10
	},
	modalList: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 15,
		height: 100,
		borderBottomWidth: 1,
		borderBottomColor: '#E3E4E3',
		justifyContent: 'center'
	},
	modalContent: {
		marginLeft: 25
	}
});
