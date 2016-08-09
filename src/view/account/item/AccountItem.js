import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin : 0,
		borderRadius: 0,
		padding: 10,
        paddingLeft: 30,
		backgroundColor: '#F0F3F5',
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 1,
		shadowOffset: {
			height: 1,
			width: 0
		}
	},
	text: {
		color: '#4F4367'
	}
});

export default class AccountItem extends React.Component {

	render() {
		return (
			<TouchableHighlight style={styles.button} >
				<Text style={styles.text}>
				{this.props.rowData.label} - {this.props.rowData.amount}
				</Text>
				</TouchableHighlight>
				);
	}
}

AccountItem.propTypes = {
	text: React.PropTypes.string
    //onPress : React.PropTypes.func
};
