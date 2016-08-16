import React, {Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		marginLeft: 10,
		alignItems: 'flex-end',
		flexDirection : 'row'
	},
	content: {
		padding: 10,
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
		maxWidth : 240
	},
	text: {
		fontSize : 14,
		flex: 1,
		color: '#4F4367',
		//fontFamily : 'Verdana',
		fontWeight: '100'
	},
	triangle: {
		width : 0,
		height:0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: 8,
		borderTopWidth: 8,
		borderRightColor: 'transparent',
		borderTopColor: '#FFFFFF',
		alignSelf : 'flex-end',
	},
	triangleRight: {
		transform: [
			{rotate: '270deg'}
		]
	},
	triangleLeft: {
		transform: [
			{rotate: '180deg'}
		]
	}
});



class TriangleCorner extends Component {
	render() {
		return (
			<View style={[styles.triangle, this.props.style]} />
			)
	}
}

class UserRight extends Component {
	render() {
		return (
			<View  style={[styles.user, styles.userRight, this.props.style]} >
			</View>
			)
	}
}


export default class MessengerButton extends Component {

	constructor(props){
		super(props);
		this.state = {
			opacity : 0.15
		};
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
			<TouchableOpacity style={[styles.button, { opacity : this.state.opacity }]} onLayout={this.save.bind(this)}  onPress={()=> {this.props.onPress(this.props.text)}} >
			<View   style={[styles.content, { opacity : this.state.opacity }]} >
			<Text style={styles.text}>
			{this.props.text}
			</Text>
			</View>
			<TriangleCorner style={[styles.triangleRight, { opacity : this.state.opacity }]} />
			</TouchableOpacity>
			);
	}
}
