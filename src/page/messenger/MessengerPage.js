'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, ListView,  StyleSheet } from 'react-native';
import {getReply, addMessage} from './MessengerAction';
import MessengerMain from './layout/MessengerMain';
import MessengerBottom from './layout/MessengerBottom';
import MessengerStyle from './MessengerStyle';

class MessengerPage extends Component {


	componentDidMount(){
		this.props.dispatch(getReply({
			msg : 'hello',
			session : this.props.messenger.session
		}));
	}

	onSend(text) {

		this.props.dispatch(addMessage(text));

		this.props.dispatch(getReply({
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
		messenger : state.messenger
	};
}

export default connect(mapStateToProps)(MessengerPage);
