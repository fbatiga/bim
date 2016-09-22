import React , { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import asset from '../../../app/AppAsset';
import {connect} from 'react-redux';


const styles = StyleSheet.create({
	triangle: {
		width : 0,
		height:0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: 8,
		borderTopWidth: 8,
		borderRightColor: 'transparent',
		borderTopColor: '#F0F3F5',
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
	},
	user : {
		flexDirection:'row',
		alignItems: 'flex-end',
		paddingTop :40
	},
	userLeft : {
		paddingLeft :40
	},
	userRight : {
		paddingRight:40
	},
	userImage :{
		position: 'absolute',
		bottom: 0,
		borderRadius:20,
		width:40,
		height:40
	},
	userImageRight :{
		right:2,
	},
	userImageLeft : {
		left:2,
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

	let image = asset.user;

	console.log('this.props.messenger',this.props.messenger);

		if(this.props.messenger !== undefined  && this.props.messenger.profile.username !== undefined && images[this.props.messenger.profile.username] !== undefined){
			image = images[this.props.messenger.profile.username];
		}

		return (
			<View  style={[styles.user, styles.userRight, this.props.style]} >
			<Image source={image}  style={[styles.userImage, styles.userImageRight]} />
			{!this.props.loading && <TriangleCorner style={[styles.triangleRight]} /> }
			</View>
			)
	}
}

function mapStateToProps(state) {
	return {
		messenger : state.messenger
	};
}

const images = {
	"steed" : require('../../profile/asset/alice.png'),
	"alice" : require('../../profile/asset/alice.png'),
	"philippe" : require('../../profile/asset/philippe.png'),
	"remy" : require('../../profile/asset/remy.png'),
	"jerome" : require('../../profile/asset/jerome.png'),
	"heloise" : require('../../profile/asset/heloise.png'),
	"nathalie" : require('../../profile/asset/nathalie.png')
};

export default connect(mapStateToProps)(UserRight);

