import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';

export default class ActionItem extends React.Component {

	render() {

		return (
			<TouchableHighlight onPress={this.props.confirm}  >
			<View style={style.item}>
				<View style={style.leftPart}>
					<Image source={this.props.image} style={style.image} />
				</View>
				<View style={style.rightPart}>
					<Text style={style.label}>
						{this.props.text}
					</Text>
				</View>
			</View>
			</TouchableHighlight>
			);
	}
}

const style = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 0,
		borderColor: '#9FA2A7',
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingLeft: 20,
		backgroundColor: '#fff',
		height : 100
	},
	leftPart: {
		backgroundColor: '#fff',
	},
	rightPart: {
        // alignItems: 'flex-start',
        backgroundColor: '#fff',
        flex: 1,
        paddingLeft: 20
    },
    image: {
    	height: 50,
    	width: 50,
    	resizeMode: 'stretch'
    },
    label: {
    	color: '#4F4367',
    	fontSize: 14,
    	fontWeight: '500'
    },
});
