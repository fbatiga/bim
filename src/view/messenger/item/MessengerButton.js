import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	button: {
		marginTop : 10,
		padding: 10,
		backgroundColor: '#FFFFFF',
	},
	text: {
		fontSize : 14,
		color: '#4F4367',
		//fontFamily : 'Verdana',
		fontWeight: '100'
	}
});

export default class MessengerButton extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			opacity : 0.15
		};
	}

	setOpacity(event){
		this.props.savePos.bind(this);
	}

	save(event){
		this.layout = event.nativeEvent.layout;
		this.props.save(this);
	}

	componentDidUpdate(){
		if(this.state.opacity == 1 && this.layout !== undefined ){
			this.props.scrollTo(this.layout.y);
		}
	}

	componentWillUnMount(){
		this.props.delete(this);
	}

	render() {
		const flexStyle = {};
		if (this.props.text) {
			if (this.props.text.length > 40) {
				flexStyle.flex = 1;
			}
		}

		return (
			<TouchableOpacity onLayout={this.save.bind(this)}  onPress={()=> {this.props.onPress(this.props.text)}} >
			<View   style={[styles.button, { opacity : this.state.opacity }]} >
			<Text style={styles.text}>
			{this.props.text}
			</Text>
			</View>
			</TouchableOpacity>
			);
	}
}
