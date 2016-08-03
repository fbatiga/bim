import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Bubble from './MessengerBubble';

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		marginBottom: 10,
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

	renderName(name){
		return (
			<Text style={styles.name} >
				{name}
			</Text>
		);
	}

	renderImage(rowData) {

		const ImageView = rowData.imageView || Image;
		if (rowData.image) {
			return (
				<ImageView source={rowData.image}
				style={[styles.imagePosition, styles.image, (rowData.position === 'left' ? styles.imageLeft : styles.imageRight)]}
				/>
				);
		}
		return null;
	}


	render() {
		let { rowData, position } = this.props;

		const flexStyle = {};
		let RowView = Bubble;
		if (rowData.text) {
			if (rowData.text.length > 40) {
				flexStyle.flex = 1;
			}
		}

		return(
			<View style={[styles.rowContainer, {justifyContent: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center',
					}]}
					>
				<Bubble {...rowData} styles={styles} />
			</View>
		);

	}
}

Message.propTypes = {
	position: React.PropTypes.oneOf(['left', 'right', 'center']),
	rowData: React.PropTypes.object
};

export default Message

