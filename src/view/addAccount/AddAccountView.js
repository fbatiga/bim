'use strict'
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { init } from './AddAccountAction';
import AddAccountStyle from './AddAccountStyle';
import asset from '../../app/AppAsset';
import baseStyles from '../../styles/vars';
import BackButton from '../../component/BackButton';
import Title from '../../component/Title';

class addAccount extends Component {
	componentDidMount() {
		this.props.dispatch(init());
	}

	render() {
		return (
			<View style={AddAccountStyle.container}>
			<BackButton image={asset.back_green} back={Actions.pop} />
		<Title>COMPTES</Title>
				<View style={AddAccountStyle.top}>
					<View>
						<Text style={AddAccountStyle.textTitle}>Type de</Text>
						<Text style={AddAccountStyle.textTitle}>compte :</Text>
					</View>
				</View>
				<View style={AddAccountStyle.bottom}>
					<View style={AddAccountStyle.lines}>
						<Text style={AddAccountStyle.text}>Ajouter un compte éxistant</Text>
					</View>
					<TouchableOpacity onPress={()=> {
							Actions.addJackpot();
					}}>
						<View style={AddAccountStyle.lines}>
							<Text style={AddAccountStyle.text}>Créer une cagnotte</Text>
						</View>
					</TouchableOpacity>
					<View style={AddAccountStyle.lines}>
						<Text style={AddAccountStyle.text}>Ouvrir un compte épargne </Text>
						<Text style={AddAccountStyle.textLight}>(Bientôt disponible)</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default connect()(addAccount);
