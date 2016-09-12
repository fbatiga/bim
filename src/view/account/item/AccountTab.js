import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import asset from '../../../app/AppAsset';


const {width, height} = Dimensions.get('window');
const themePreview = 50;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

export default class AccountTab extends React.Component {

	render() {
		const flexStyle = {};
		return (
		  <View style={style.tab}>
			<TouchableOpacity style={style.button} onPressIn={()=>{this.props.callback(this.props.rowData.categoryId)}} >
			  <Text style={style.text}>
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

const style = StyleSheet.create({

    tabsContent: {
      paddingHorizontal: themePreview,
      alignItems: 'center',
      flex: 1
    },
    text: {
		color: '#120037',
		fontSize: 14,
		fontFamily: 'Montserrat',
	},
    tab: {
      flex: 1,
      width: themeWidth,
      margin: themeMargin,
      // height: themeWidth,
      alignItems: 'center',
      justifyContent: 'center',
    }

});

AccountTab.propTypes = {
	text: React.PropTypes.string
	//onPress : React.PropTypes.func
};
