import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, Animated } from 'react-native';
import AppAsset from '../../../app/AppAsset';


const {width, height} = Dimensions.get('window');
const themePreview = 50;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

export default class AccountTabTitle extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			width : null
		};
	}


	componentDidUpdate(){
		this.props.register(this);
	}

	onLayout(event){

		if(this.position == undefined){
			this.position = event.nativeEvent.layout.x;

			Animated.timing(
				this.props.rowData.style.textWidth,
				{
				duration: 0,
				toValue: event.nativeEvent.layout.width
			}).start();

			this.setState({
				width : event.nativeEvent.layout.width
			});

		}
	}

	render() {

		let textStyle = { opacity: this.props.rowData.style.opacity }
		if(this.state.width !== null){
			textStyle = { opacity: this.props.rowData.style.opacity , width: this.props.rowData.style.textWidth}
		}

		return (
				<Animated.View style={[style.tab,textStyle]} onLayout={this.onLayout.bind(this)}>
				<TouchableWithoutFeedback onPress={()=>{this.props.callback(this.props.rowData.categoryId)}} >
					<Animated.View style={{	flexDirection:'column',
											marginTop : 40,
											marginBottom : 92}}>
						<Text style={style.text}>
							{this.props.rowData.label}
						</Text>
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
      	alignItems: 'center',
      	overflow : 'visible',
      	justifyContent: 'flex-start',
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
