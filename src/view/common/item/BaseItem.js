import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import AppAsset from '../../../app/AppAsset';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class BaseItem extends React.Component {

	render() {

		return (
			<View>
			</View>
			);
	}
}

const style = StyleSheet.create({

});

const asset = {
};


function mapStateToProps(state) {
	return {
		messenger: state.messenger
	};
}

export default connect(mapStateToProps)(BaseItem);
