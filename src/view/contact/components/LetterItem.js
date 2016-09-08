import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const styles = StyleSheet.create({

	button: {
		padding: 10,
		fontSize: 18,
		width:35,
		height: 80,
		backgroundColor: 'transparent'
	}
});

export default class LetterItem extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			color : 'white'
		};
	}

	save(event){
		this.layout = event.nativeEvent.layout;
		this.props.save(this);
	}

	render() {
		return (
			<TouchableOpacity
			onLayout={this.save.bind(this)}
			style={styles.button}
			onPress={() => {
				this.props.onPress(this.props.children)
			}} >
				<Text style={{textAlign: 'center', color: this.state.color }}>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}
