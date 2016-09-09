import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../../../component/Title.js';
import SubTitle from '../../../component/SubTitle.js';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';
import BackButton from '../../../component/BackButton.js';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: baseStyles.colors.deepBlue
	},
	top: {
		backgroundColor: baseStyles.colors.deepBlue,
		height: height / 2
	},
	topContent: {
		justifyContent: 'center',
		flex: 1
	},
	bottom: {
		backgroundColor: baseStyles.colors.white
	},
	text: {
		color: baseStyles.colors.alternative,
		marginTop: 10,
		fontSize: 35,
		marginLeft: 50
	},
	lines: {
		borderBottomWidth: 1,
		borderBottomColor: baseStyles.colors.lightGrey,
		height: height / 6,
		paddingHorizontal: 25,
		justifyContent: 'center',
	},
	linkText: {
		color: baseStyles.colors.deepBlue,
		fontFamily : 'Montserrat-UltraLight',
	    fontSize: 14,
		lineHeight : 14,
	}
});

export default class JackpotSelectDuration extends Component {
	render() {
		return (
			<View style={styles.container}>
			<View style={styles.top}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
			<View style={styles.topContent}>
			<SubTitle>{this.props.subtitle || 'Compte à débiter'}</SubTitle>
			</View>
			</View>
			<View style={styles.bottom}>
			<TouchableOpacity onPress={()=> {
				this.props.confirm('un versement unique');
			}}>
			<View style={styles.lines}>
			<Text style={styles.linkText}>Un versement unique</Text>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> {
				this.props.confirm('un versement mensuel');
			}}>
			<View style={styles.lines}>
			<Text style={styles.linkText}>Tous les mois</Text>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> {
				this.props.confirm('un versement trimestriel');
			}}>
			<View style={styles.lines}>
			<Text style={styles.linkText}>Tous les trimestres</Text>
			</View>
			</TouchableOpacity>
			</View>
			</View>
			);
	}
}

JackpotSelectDuration.propTypes = {
	title: React.PropTypes.string
};
