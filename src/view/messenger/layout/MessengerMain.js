'use strict';

import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MessengerMessage from '../item/MessengerMessage';


let scrollPosition = 0;

class MessengerMain extends Component {


	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => (r1 !== r2)
		});

		this.state = {
			dataSource: ds.cloneWithRows([])
		};
	}


	setMessages(messages, choices) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(messages),
			choices
		});
	}

	renderRow(rowData = {}) {
		return (

			<View>
				<MessengerMessage rowData={rowData}  setButtons={this.props.setButtons} position={rowData.position} />
			</View>
		);
	}

	componentDidMount() {
		this.scrollResponder = this.refs.listView.getScrollResponder();
		this.setMessages(this.props.messages);
	}

	componentWillReceiveProps(nextProps) {
		this.setMessages(nextProps.messages);
	}

	scrollToBottom(contentWidth, contentHeight) {
		if(contentHeight > this._listHeight){
			scrollPosition = - (this._listHeight - contentHeight)+ 20;
			this.scrollResponder.scrollTo({
				y: scrollPosition,
				x: 0,
				animated:  true,
			});
		}
	}

	saveListHeight(event) {

		this._listHeight = event.nativeEvent.layout.height;

		this.scrollResponder.scrollTo({
				y:scrollPosition-10,
		 		animated:  true,
		});
	}

	render(){
		return (
			<ListView
			ref="listView"
			onLayout={this.saveListHeight.bind(this)}
			dataSource={this.state.dataSource}
			onContentSizeChange={this.scrollToBottom.bind(this)}
			renderRow={this.renderRow.bind(this)}
			enableEmptySections={true}
			viewSize={this.props.messages.length}
			{...this.props}
			/>
			);
	}
}

MessengerMain.defaultProps = {
	messages: []
};

MessengerMain.propTypes = {
	messages: React.PropTypes.array,
	setButtons: React.PropTypes.func
};

export default MessengerMain;
