import React from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../title/Title';
import AppGuideline from '../../../app/AppGuideline';
import AppAsset from '../../../app/AppAsset';
import BackButton from '../button/BackButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default
class TitleSelectionStep extends React.Component {

	constructor(props) {
		super(props);
		this.state = {title : this.props.title};
	}

	render() {
		return (
			<View style={styles.container}>
			<BackButton image={AppAsset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
			<View style={styles.top}>
			<Text style={{
				flex: 1,
				color: AppGuideline.colors.alternative,
				height: 30,
				marginTop: 80,
				fontSize:36,
				fontFamily : 'Montserrat-UltraLight'
			}}>
			{this.props.subtitle || 'B!MMER LA SOMME DE' }
			</Text>
			<TextInput
			autoCapitalize='sentences'
			autoCorrect={false}
			autoFocus={true}
			returnKeyType='next'
			ref="titleInput"
			style={{
				flex: 1,
				color: 'white',
				textAlign: 'center',
				borderBottomWidth: 3,
				borderBottomColor: "white",
				fontSize:36,
				fontFamily : 'Montserrat-Bold',
				height: 100,
				width: null
			}}
			onSubmitEditing={(event)=>{this.props.confirm(event.nativeEvent.text);}}
			/>
			</View>
			</View>
			);
	}



}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: AppGuideline.colors.deepBlue,
		height: height / 2
	}
});


TitleSelectionStep.propTypes = {
	title: React.PropTypes.string
};
