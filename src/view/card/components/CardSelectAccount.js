import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../../../component/Title.js';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';
import BackButton from '../../../component/BackButton.js';


const { width, height } = Dimensions.get('window');
const boxMargin = 10;
const boxPreview = 25;
const boxSize = width - (boxMargin + boxPreview ) * 2;
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
		flexDirection: 'row',
		height: height / 4,
		paddingHorizontal: 25,
		alignItems: 'center'
	},
	linkText: {
		color: baseStyles.colors.deepBlue,
		flex: 1
	},
	amount: {
		color: baseStyles.colors.deepBlue
	}
});

export default class CardSelectAccount extends Component {
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
				this.props.confirm();
			}}>
			<View style={styles.lines}>
			<Text style={styles.linkText}>BiM</Text>
			<Text style={styles.amount}>2500 €</Text>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> {
				this.props.confirm();
			}}>
			<View style={styles.lines}>
			<Text style={styles.linkText}>Société générale</Text>
			<Text style={styles.amount}>1800 €</Text>
			</View>
			</TouchableOpacity>
			</View>
			</View>
			);
	}
}

CardSelectAccount.propTypes = {
	title: React.PropTypes.string
};
