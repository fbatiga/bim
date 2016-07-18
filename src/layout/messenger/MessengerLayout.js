import React, {
	Component,
} from 'react';
import {
	Text,
	View,
	ListView,
	TextInput,
	Dimensions,
	Animated,
	StyleSheet,
	Platform,
	PixelRatio,
} from 'react-native';

import Button from 'react-native-button';
import MessengerMain from './list/MessengerMain';
import MessengerBottom from './list/MessengerBottom';
import {connect} from 'react-redux';


const MessengerStyle = StyleSheet.create({
	bottom : {
		flex: 4,
	},
	main: {
		flex: 5,
		borderBottomWidth: 1,
		borderBottomColor : '#DDE6EC',
		backgroundColor : '#F8F8F8',
		padding : 10
	},
	container: {
		flex: 1,
		flexDirection : 'column',
		backgroundColor: '#FFF',
	}
});


class MessengerLayout extends Component {


	onSend(text) {

		this.props.dispatch(this.props.addMessage(text))
		;

		this.props.dispatch(this.props.getReply({
			msg : text,
			session : this.props.messenger.session
		}));

	}


	render(){
		return (
			<View  style={MessengerStyle.container}>
			<View style={ { height: 20 } } />
			<MessengerMain
			style={MessengerStyle.main}
			messages={this.props.messenger.messages}  />
			<MessengerBottom
			onLayout={this.onBottomLayout}
			style={MessengerStyle.bottom}
			choices={this.props.messenger.choices}
			onPress={this.onSend.bind(this)} />
			</View>
			);
	}
}

function mapStateToProps(state) {
	return {
		messenger: state.messenger
	};
}

export default connect(mapStateToProps)(MessengerLayout);
