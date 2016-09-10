import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import asset from '../../../app/AppAsset';
import AccountStyle from '../AccountStyle';

const tabStyles = StyleSheet.create({
	// button: {
	//     margin: 10,
	//     borderRadius: 0,
	//     paddingTop: 10,
	//     paddingHorizontal: 25,
	//     height: 20,
	//     backgroundColor: 'transparent',
	//     alignItems:'center'
	// },
	text: {
		color: '#120037',
		fontSize: 14,
		fontFamily: 'Montserrat',
	}
});

export default
class AccountTab extends React.Component {

	render() {
		const flexStyle = {};
		return (
		  <View style={AccountStyle.tab}>
			<TouchableOpacity style={tabStyles.button} onPressIn={()=>{this.props.callback(this.props.rowData.categoryId)}} >
			  <Text style={tabStyles.text}>
				{this.props.rowData.label}
			  </Text>
			</TouchableOpacity>
		  </View>
		);
	}

	handlePressIn() {
		this.state;
	}
}

AccountTab.propTypes = {
	text: React.PropTypes.string
	//onPress : React.PropTypes.func
};
