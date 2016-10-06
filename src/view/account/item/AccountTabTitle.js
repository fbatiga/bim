import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, Animated } from 'react-native';
import AppAsset from '../../../app/AppAsset';


const {width, height} = Dimensions.get('window');
const themePreview = 50;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

export default class AccountTabTitle extends React.Component {

	onLayout(event){
		this.position = event.nativeEvent.layout.x;
		this.width = event.nativeEvent.layout.width;
		this.props.register(this);
	}

	render() {

		return (
				<Animated.View style={[style.tab, { opacity: this.props.rowData.style.opacity , width : this.props.rowData.style.textWidth }]} onLayout={this.onLayout.bind(this)}>
				<TouchableWithoutFeedback onPress={()=>{this.props.callback(this.props.rowData.categoryId)}} >
					<Animated.View style={{	flexDirection:'column',
											marginTop : 40,
											marginBottom : 92,
											transform : [{ scale : this.props.rowData.style.font }]}}>
						<Animated.Text style={style.text}>
							{this.props.rowData.label}
						</Animated.Text>
						{this.props.index!=0  && <Animated.Text style={[style.subtitle, { opacity : this.props.rowData.style.visibility } ]}>
							{this.props.balance}  €
						</Animated.Text> }
					</Animated.View>
				</TouchableWithoutFeedback>
			</Animated.View>
		);
	}
}

const asset = {
	circle : [
		require('../asset/circle_0.png'),
		require('../asset/circle_1.png'),
		require('../asset/circle_2.png'),
		require('../asset/circle_3.png'),
		require('../asset/circle_4.png'),
		require('../asset/circle_5.png'),
		require('../asset/circle_6.png'),
		require('../asset/circle_7.png'),
		require('../asset/circle_8.png')
	]
}

const style = StyleSheet.create({
	tab: {
		flex: 1,
      	alignItems: 'center',
      	justifyContent: 'center',
  	},
	text: {
		textAlign : 'center',
		color: '#120037',
		fontSize: 14,
		lineHeight : 14,
		height: 14,
		flexWrap: 'nowrap',
		fontFamily: 'Montserrat',
	},
	subtitle: {
		textAlign : 'center',
		color: '#120037',
		fontSize: 14,
		fontFamily: 'Montserrat',
	}

});

AccountTabTitle.propTypes = {
	text: React.PropTypes.string
	//onPress : React.PropTypes.func
};
