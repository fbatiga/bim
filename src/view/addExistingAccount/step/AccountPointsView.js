import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';
import Title from '../../common/title/Title';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		backgroundColor: AppGuideline.colors.deepBlue,
		flex: 1
	},
	top: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue,
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageBloc: {
		width,
		justifyContent: 'center',
		alignItems: 'center'
	},
	gifContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 90,
		alignItems: 'center'
	},
	image: {
		height: 200,
		width: 200,
		resizeMode: 'stretch'
	},
	gif: {
		width,
		height: width
	}
});

export default class AccountPointsView extends Component {
	render() {
		return (
			<View style={styles.container}>
  			<Title>{this.props.title|| 'Comptes'}</Title>
  			<View style={styles.top}>
    			<View style={styles.imageBloc}>
      			<View style={styles.gifContainer}>
      			   <Image source={asset.pointsSpeed} style={styles.gif} />
      			</View>
      			<View style={styles.imageContainer}>
      			   <Image source={asset.pointsImage} style={styles.image} />
      			</View>
    			</View>
    			<Text style={{
    				color: AppGuideline.colors.yellow,
    				fontSize:36,
    				fontFamily : 'Montserrat-Bold',
    				marginTop: 25
    			}}>
    			{this.props.value}
    			</Text>
  			</View>
			</View>
			);
	}
}

AccountPointsView.propTypes = {
	title: React.PropTypes.string
};
