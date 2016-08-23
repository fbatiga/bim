'use strict';

import React, { Component , StyleSheet} from 'react';
import { View, Text, Image} from 'react-native';


const style = StyleSheet.create({
	container : {}
});


export default  class Base extends Component {

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {

	}

	render(){
		return (
			<View {...this.props} style={[style.container,this.props.style]}></View>
		);
	}
}
