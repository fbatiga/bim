import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		backgroundColor: baseStyles.colors.deepBlue,
		flex: 1
	},
	top: {
		flex: 1,
		backgroundColor: baseStyles.colors.deepBlue,
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

export default class JackpotPointsView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
			<Text style={baseStyles.titles.h1}>{this.props.title || 'B!M'}</Text>
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
				color: baseStyles.colors.yellow,
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

JackpotPointsView.propTypes = {
	title: React.PropTypes.string
};
