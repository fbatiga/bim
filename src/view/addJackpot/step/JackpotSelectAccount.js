import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../../common/title/Title';
import SubTitle from '../../common/title/SubTitle';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';

const { width, height } = Dimensions.get('window');
const boxMargin = 10;
const boxPreview = 25;
const boxSize = width - (boxMargin + boxPreview ) * 2;
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
		flexDirection: 'row',
		height: height / 4,
		paddingHorizontal: 25,
		alignItems: 'center',
	},
	linkText: {
		color: AppGuideline.colors.deepBlue,
		fontFamily : 'Montserrat-UltraLight',
		fontSize: 14,
	lineHeight : 14,
		flex: 1
	},
	amount: {
		color: AppGuideline.colors.deepBlue,
		fontFamily : 'Montserrat-UltraLight',
		fontSize: 14,
	lineHeight : 14,
	}
});

export default class JackpotSelectAccount extends Component {
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

JackpotSelectAccount.propTypes = {
	title: React.PropTypes.string
};
