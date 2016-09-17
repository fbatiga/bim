import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../../common/title/Title';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		backgroundColor: AppGuideline.colors.deepBlue,
		height: height / 2
	},
	topContent: {
		justifyContent: 'center',
		flex: 1
	},
	bottom: {
		backgroundColor: AppGuideline.colors.white
	},
	text: {
		color: AppGuideline.colors.alternative,
		marginTop: 10,
		fontSize: 35,
		marginLeft: 50
	},
	lines: {
		borderBottomWidth: 1,
		borderBottomColor: AppGuideline.colors.lightGrey,
		height: height / 6,
		paddingHorizontal: 25,
		justifyContent: 'center'
	},
	linkText: {
		color: AppGuideline.colors.deepBlue
	}
});

export default class CardSelectDuration extends Component {
	render() {
		return (
			<View style={styles.container}>
			<View style={styles.top}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
			<View style={styles.topContent}>
			<Text style={styles.text}>
			{this.props.subtitle || 'Compte à débiter' }
			</Text>
			</View>
			</View>
			<View style={styles.bottom}>
			<TouchableOpacity onPress={()=> {
				this.props.confirm('Un versement unique');
			}}>
			<View style={styles.lines}>
			<Text style={styles.linkText}>Un versement unique</Text>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> {
				this.props.confirm('Tous les mois');
			}}>
			<View style={styles.lines}>
			<Text style={styles.linkText}>Tous les mois</Text>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> {
				this.props.confirm('Tous les trimestres');
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

CardSelectDuration.propTypes = {
	title: React.PropTypes.string
};
