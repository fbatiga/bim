import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Bubble from './MessengerBubble';
import {loadButtons} from '../MessengerAction';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
	rowContainer: {
		flex: 2,
		flexDirection: 'row',
		marginBottom: 20,
	},
	name: {
		color: '#aaaaaa',
		fontSize: 12,
		marginLeft: 55,
		marginBottom: 5,
	},
	nameInsideBubble: {
		color: '#666666',
		marginLeft: 0,
	},
	imagePosition: {
		height: 30,
		width: 30,
		alignSelf: 'flex-end',
		marginLeft: 8,
		marginRight: 8,
	},
	image: {
		alignSelf: 'center',
		borderRadius: 15,
	},
	spacer: {
		width: 10,
	},
	status: {
		color: '#aaaaaa',
		fontSize: 12,
		textAlign: 'right',
		marginRight: 15,
		marginBottom: 10,
		marginTop: -5,
	},
});


class Message extends Component {

	constructor(props){
		super(props);
		this.state = {
			visibility : 'new'
		};
	}

	componentDidMount(){

		if( this.props.position == 'left' && this.state.visibility == 'new'){

			if( this.props.rowData.loaded == true){
				this.setState({
					visibility : 'show'
				});

				if(this.props.rowData.buttons.length >0){
					this.props.setButtons(this.props.rowData.buttons);
				}

			}else{

				setTimeout(()=>{
					this.setState({
						visibility : 'loading'
					});
				}, this.props.rowData.index*2000);

			}
		}


	}

	componentDidUpdate(){
		if(this.state.visibility == 'loading'){
			setTimeout(()=>{
				this.setState({
					visibility : 'show'
				});

				if(this.props.rowData.buttons.length >0){
					this.props.setButtons(this.props.rowData.buttons);
				}

			}, 1500);
		}

	}

	render() {
		let { rowData, position } = this.props;

		if(rowData.text == '' &&  rowData.image == false){
			return null;
		}

		let loading = (this.state.visibility == 'show' )? false : true;

		if( position == 'left'){
			style =	{ justifyContent: 'flex-start'};
		}else{
			 style = {  justifyContent: 'flex-end' };
		}

		return(
			<View style={[styles.rowContainer,style]}>
				{ this.state.visibility != 'new' && position === 'left' && <Bubble {...rowData} loading={loading} />}
				{ position  !== 'left'  && <Bubble {...rowData} loading={false} />}
			</View>
			);

	}
}

Message.propTypes = {
	position: React.PropTypes.oneOf(['left', 'right', 'center']),
	rowData: React.PropTypes.object
};


function mapStateToProps(state) {
	return {
		messenger : state.messenger
	};
}

export default connect(mapStateToProps)(Message);

