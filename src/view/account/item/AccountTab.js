import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, Animated } from 'react-native';
import AppAsset from '../../../app/AppAsset';


const {width, height} = Dimensions.get('window');
const themePreview = 50;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

export default class AccountTab extends React.Component {



	onLayout(event){
		this.position = event.nativeEvent.layout.x;
		this.width = event.nativeEvent.layout.width;
		this.props.register(this);
	}

	render() {

		return (

			<Animated.View style={[style.graph, { opacity: this.props.rowData.style.opacity , transform: [ {scale: this.props.rowData.style.bounce} ] }]} onLayout={this.onLayout.bind(this)}>
						<TouchableWithoutFeedback onPress={()=>{this.props.callback(this.props.rowData.categoryId)}} >
						<View>
							{this.props.index == 0  && (
								<Image source={asset.circle[this.props.index]}  style={style.graphCircle}>
								<Text style={style.graphLabel} >SOLDE ACTUEL</Text>
								<Text style={style.graphBalance} >{this.props.balance} €</Text>
								</Image>
							)}

							{this.props.index!=0 && <Image source={asset.circle[this.props.index]}  style={style.graphCircle} /> }
							</View>
							</TouchableWithoutFeedback>
			</Animated.View>

		);
	}
}



const style = StyleSheet.create({
	graph: {
		alignItems: 'center',
		marginLeft: 30,
	},
	graphCircle: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	graphLabel: {
		fontSize: 10,
		letterSpacing : 1.5,
		fontFamily: 'Montserrat',
		color: '#120037',
		fontWeight: '300',
		width: 180,
		textAlign: "center"
	},
	graphBalance: {
		fontSize: 36,
		color: '#120037',
		fontWeight: 'bold'
	},
	tab: {
		flex: 1,
		width: themeWidth,
      alignItems: 'center',
      justifyContent: 'center',
  }

});

AccountTab.propTypes = {
	text: React.PropTypes.string
	//onPress : React.PropTypes.func
};
