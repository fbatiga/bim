'use strict';

import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MessengerMessage from '../item/MessengerMessage';

class MessengerMain extends Component {


	constructor(props) {
		super(props);
		this._firstDisplay = true;
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => (r1 !== r2)
		});

		this.state = {
			dataSource: ds.cloneWithRows([])
		};
	}


	setMessages(messages) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(messages)
		});
	}


	renderRow(rowData = {}) {
		return (
			<View>
				<MessengerMessage rowData={rowData} position={rowData.position} />
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
			this.scrollResponder.scrollTo({
				y: - (this._listHeight - contentHeight)+ 10,
				x: 0,
				animated:  true,
			});
		}
	}

	saveListHeight(event) {
		this._listHeight = event.nativeEvent.layout.height;
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
	messages: React.PropTypes.array
};

export default MessengerMain;
