import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
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
		justifyContent: 'center',
		backgroundColor: AppGuideline.colors.deepBlue,
		flex: 1
	},
	bottom: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 25
	},
	redBox: {
		backgroundColor: AppGuideline.colors.pink,
		width: boxSize,
		height: boxSize,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginHorizontal: 15
	},
	image: {
		width: 127,
		height: 130
	},
	greenBox: {
		backgroundColor: '#B5EF00',
		height: boxSize,
		flex: 1,
		borderRadius: 10,
		marginLeft: -10
	},
	blueBox: {
		backgroundColor: AppGuideline.colors.blue,
		height: boxSize,
		flex: 1,
		borderRadius: 10,
		marginRight: -10
	}
});

export default class JackpotSelectDesign extends Component {
	render() {
		return (
			<View style={styles.container}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
				<View style={styles.top}>
				<SubTitle>{this.props.subtitle || 'Design de la cagnotte'}</SubTitle>
				</View>
				<View style={styles.bottom}>
					<View style={styles.greenBox} />
					<TouchableOpacity onPress={()=> {
							this.props.confirm();
					}}>
						<View style={styles.redBox}>
							<Image source={asset.jackpot} style={styles.image} />
						</View>
					</TouchableOpacity>
					<View style={styles.blueBox} />
				</View>
			</View>
		);
	}
}

JackpotSelectDesign.propTypes = {
	title: React.PropTypes.string
};
