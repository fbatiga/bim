import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';


const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 0,
		borderBottomWidth: 1,
		borderColor: '#ECECED',
		paddingVertical: 15,
		paddingLeft: 20,
		backgroundColor: '#fff',
		height: 100
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

	category: {
		color: '#9FA2A7',
		fontSize: 12
	},
	label: {
		color: '#4F4367',
		fontSize: 14,
		fontWeight: '500'
	},
	amount: {
		color: AppGuideline.colors.deepBlue,
		textAlign: 'right',
		fontSize: 18
	}
});

export default class ContactItem extends React.Component {

	save(event){
		this.layout = event.nativeEvent.layout;
		this.props.save(this);
	}


	componentWillUnMount(){
		this.props.delete(this);
	}

	randomizeImage(index) {
		let val = parseInt(index* 5);
		switch ( val % 5 ) {
			case 0: return images['jerome']; break;
			case 1: return images['philippe']; break;
			case 2: return images['remy']; break;
			case 3: return images['heloise']; break;
			case 4: return images['nathalie']; break;
			default: return images['alice'];
		}
	}

	render() {


		let name = [];

		if(this.props.rowData.givenName != undefined){
			name.push(this.props.rowData.givenName);
		}

		if(this.props.rowData.familyName != undefined){
			name.push(this.props.rowData.familyName);
		}

		this.props.rowData.name = name.join(' ');


		let image = this.randomizeImage(Math.random(0,5));

		if(this.props.rowData.username !== undefined && images[this.props.rowData.username] !== undefined){
			image = images[this.props.rowData.username];
		}


		return (
			<TouchableHighlight  onLayout={this.save.bind(this)} onPress={() => {
				this.props.onPress(this.props.rowData)
			} }  >
			<View style={styles.item} >
			<View style={styles.leftPart}>
			<Image source={image} style={styles.image}/>
			</View>
			<View style={styles.rightPart}>
			<Text style={styles.label}>
			{this.props.rowData.name}
			</Text>
			<Text style={styles.category}>
			{this.props.rowData.phoneNumbers !== undefined && this.props.rowData.phoneNumbers[0] !== undefined && this.props.rowData.phoneNumbers[0].number}
			</Text>
			</View>
			</View>
			</TouchableHighlight>
			);
	}
}


const images = {
	"alice" : require('../../profile/asset/alice.png'),
	"philippe" : require('../../profile/asset/philippe.png'),
	"remy" : require('../../profile/asset/remy.png'),
	"jerome" : require('../../profile/asset/jerome.png'),
	"heloise" : require('../../profile/asset/heloise.png'),
	"nathalie" : require('../../profile/asset/nathalie.png')
};




ContactItem.propTypes = {
	text: React.PropTypes.string
	//onPress : React.PropTypes.func
};

function mapStateToProps(state) {
	return {
		account: state.transfer
	};
}
