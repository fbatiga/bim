import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../../common/title/Title';
import SubTitle from '../../common/title/SubTitle';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';

const { height } = Dimensions.get('window');
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
	lines: {
		borderBottomWidth: 1,
		borderBottomColor: AppGuideline.colors.lightGrey,
		flexDirection: 'row',
		height: 100,
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
});

class AccountSelectBank extends Component {
	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.top}>
    			<BackButton image={asset.back_green} back={this.props.back} />
    			<Title>{this.props.title}</Title>
					<View style={styles.topContent}>
					 <SubTitle>{this.props.subtitle || 'Recherchez votre banque :'}</SubTitle>
					</View>
				</View>
				<View style={styles.bottom}>
					<TouchableOpacity onPress={()=> {
						this.props.confirm('bank', 'American Express');
					}}>
						<View style={styles.lines}>
							<Text style={styles.linkText}>American Express</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> {
						this.props.confirm('bank', 'Axa banque');
					}}>
						<View style={styles.lines}>
							<Text style={styles.linkText}>Axa banque</Text>
						</View>
					</TouchableOpacity>
          <TouchableOpacity onPress={()=> {
						this.props.confirm('bank', 'Barclays banque');
					}}>
						<View style={styles.lines}>
							<Text style={styles.linkText}>Barclays banque</Text>
						</View>
					</TouchableOpacity>
          <TouchableOpacity onPress={()=> {
						this.props.confirm('bank', 'BNP PARIBAS');
					}}>
						<View style={styles.lines}>
							<Text style={styles.linkText}>BNP PARIBAS</Text>
						</View>
					</TouchableOpacity>
          <TouchableOpacity onPress={()=> {
						this.props.confirm('bank', 'Crédit du Nord');
					}}>
						<View style={styles.lines}>
							<Text style={styles.linkText}>Crédit du Nord</Text>
						</View>
					</TouchableOpacity>
          <TouchableOpacity onPress={()=> {
						this.props.confirm('bank', 'BIC');
					}}>
						<View style={styles.lines}>
							<Text style={styles.linkText}>BIC</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

AccountSelectBank.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	back: PropTypes.func,
	confirm: PropTypes.func
};

export default AccountSelectBank;
