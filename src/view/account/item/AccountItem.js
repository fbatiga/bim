import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import moment from 'moment';

const style = StyleSheet.create({
	date: {
		color: '#BDC4C8',
		fontSize: 24,
		fontFamily : 'Montserrat-Bold',
		width : 33
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		margin: 0,
		borderColor: '#E3E4E3',
		borderBottomWidth: 1,
		paddingTop: 30,
		paddingBottom: 30,
		marginLeft: 10,
		marginRight: 40,
		backgroundColor: '#fff'
	},
	leftPart: {
		flex: 1,
	},
	rightPart: {
		flexDirection: 'row'
	},
	timestamp: {
		color: '#BDC4C8',
		fontSize: 8
	},
	category: {
		color: '#BDC4C8',
		fontFamily : 'Montserrat-UltraLight',
		fontSize: 10,
		marginTop: 3
	},
	label: {
		color: '#120037',
		fontFamily : 'Montserrat-Light',
		fontSize: 14,
	lineHeight : 14
	},
	amount: {
		color: AppGuideline.colors.deepBlue,
		fontFamily : 'Montserrat-Light',
		fontSize: 14,
	lineHeight : 14
	}
});

export default class AccountItem extends React.Component {
	render() {
		return (
			<TouchableHighlight>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ paddingTop: 25 }}>
						{this.props.rowData.timestamp != undefined && (<Text style={style.date}>{moment(this.props.rowData.timestamp).format('D')}</Text>)}
					</View>
					<View style={style.button}>
						<View style={style.leftPart}>
							<Text style={style.label}>
								{this.props.rowData.label}
							</Text>
							<Text style={style.category}>
								{this.props.rowData.category.label}
							</Text>
						</View>
						<View style={style.rightPart}>
							<Text style={style.amount}>
							{(this.props.rowData.type === 'debit' ? '-' :'')  +   this.props.rowData.amount}
							</Text>
							<Text style={style.amount}> €</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

AccountItem.propTypes = {
	text: React.PropTypes.string
	//onPress : React.PropTypes.func
};

function mapStateToProps(state) {
	return {
		account: state.account
	};
}
