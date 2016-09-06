import React from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import Title from '../../../component/Title.js';
import baseStyles from '../../../styles/vars';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: baseStyles.colors.deepBlue
	},
	top: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: baseStyles.colors.deepBlue,
		height: height / 2
	}
});

export default
class TransferTitleInputView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {title : this.props.title};
	}
	componentDidMount() {
		this.refs.titleInput.focus();
	}
	render() {
		return (
			<View style={styles.container}>
			<Title>{this.props.title}</Title>
			<View style={styles.top}>
			<Text style={{
				flex: 1,
				color: baseStyles.colors.alternative,
				height: 30,
				marginTop: 10,
				fontSize: 25
			}}>
			{this.props.subtitle || 'B!MMER LA SOMME DE' }
			</Text>
			<TextInput
			autoCapitalize='sentences'
			autoCorrect={false}
			autoFocus
			returnKeyType='next'
			ref="titleInput"
			style={{
				flex: 1,
				color: 'white',
				textAlign: 'center',
				borderBottomWidth: 3,
				borderBottomColor: "white",
				fontSize: 40,
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

TransferTitleInputView.propTypes = {
	title: React.PropTypes.string
};
