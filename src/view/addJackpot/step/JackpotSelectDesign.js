import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Title from '../../common/title/Title';
import SubTitle from '../../common/title/SubTitle';
import AppGuideline from '../../../app/AppGuideline';
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
	image: {
		width: 127,
		height: 130
	},
	imageDesign: {
		width: boxSize,
		height: boxSize
	},
	tabsContainer: {
		flex: 1
	},
	tabsContent: {
		paddingHorizontal: boxPreview,
	},
	tab: {
		flex: 1,
		width: boxSize,
		margin: boxMargin,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default class JackpotSelectDesign extends Component {
	render() {
		return (
			<View style={styles.container}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
				<View style={styles.top}>
				<SubTitle>{this.props.subtitle || 'Design de la cagnotte :'}</SubTitle>
				</View>
				<View style={styles.bottom}>
					<ScrollView
					style={styles.tabsContainer}
					contentContainerStyle={styles.tabsContent}
					horizontal={true}
					automaticallyAdjustInsets={false}
					decelerationRate={0}
					snapToInterval={boxSize + boxMargin*2}
					snapToAlignment='start'>
						<View style={styles.tab}>
							<TouchableOpacity onPress={()=> {
								this.props.confirm();
							}}>
								<Image source={asset.cagnotte1} style={styles.imageDesign} />
							</TouchableOpacity>
						</View>
						<View style={styles.tab}>
							<TouchableOpacity onPress={()=> {
								this.props.confirm();
							}}>
								<Image source={asset.cagnotte2} style={styles.imageDesign} />
							</TouchableOpacity>
						</View>
						<View style={styles.tab}>
							<TouchableOpacity onPress={()=> {
								this.props.confirm();
							}}>
								<Image source={asset.cagnotte3} style={styles.imageDesign} />
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const asset = {
	back_green: require('../assets/back_green.png'),
	cagnotte1: require('../assets/cagnotte1.png'),
  cagnotte2: require('../assets/cagnotte2.png'),
  cagnotte3: require('../assets/cagnotte3.png')
};

JackpotSelectDesign.propTypes = {
	title: React.PropTypes.string
};
