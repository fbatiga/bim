import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import Title from '../../common/item/title/Title';
import SubTitle from '../../common/item/title/SubTitle';
import AppGuideline from '../../../app/AppGuideline';
import BackButton from '../../common/item/button/BackButton';
import asset from '../../../app/AppAsset';

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		justifyContent: 'center',
		backgroundColor: AppGuideline.colors.deepBlue,
		height: height / 2
	},
	input: {
		flex: 1,
		color: 'white',
		textAlign: 'center',
		borderBottomWidth: 3,
		borderBottomColor: "white",
		height: 100,
		fontFamily : 'Montserrat-Bold',
		fontSize: 36,
	lineHeight : 36,
	}
});

export default class JackpotSelectTitle extends Component {
	render() {
		return (
			<View style={styles.container}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
				<View style={styles.top}>
					<SubTitle>{this.props.subtitle || 'Nommer cette cagnotte' }</SubTitle>
					<TextInput
						autoCapitalize='sentences'
						autoCorrect={false}
						autoFocus
						returnKeyType='next'
						ref="titleInput"
						style={styles.input}
						onSubmitEditing={(event)=>{this.props.confirm(event.nativeEvent.text);}}
					/>
				</View>
			</View>
		);
	}
}

JackpotSelectTitle.propTypes = {
	title: React.PropTypes.string
};
