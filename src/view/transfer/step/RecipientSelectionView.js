import React from 'react';
import { Text, View, ScrollView, ListView,  Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import RecipientItem from '../item/RecipientItem';
import Title from '../../common/item/title/Title';
import Contacts from 'react-native-contacts';
import asset from '../../../app/AppAsset';
import AppGuideline from '../../../app/AppGuideline';
import BackButton from '../../common/item/button/BackButton';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: AppGuideline.colors.deepBlue,
        height: (height / 2 - 70)
    },
    bottom: {
    	backgroundColor: "white",
    	height: (height / 2),
    	flexDirection: 'row',
        // paddingBottom: 70
    }
});

export default class RecipientSelectionView extends React.Component {

	constructor(props) {

		super(props);
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => (r1 !== r2)
		});

		this.state = {
			amount: this.props.amount,
			contacts: this.ds.cloneWithRows([])
		};


		Contacts.getAll((err, contacts) => {
			if(err && err.type === 'permissionDenied'){
                // x.x
            } else {
            	console.log(contacts);
            	this.setState({contacts: this.ds.cloneWithRows(contacts)});
            }
        });

	}

	render() {
		return (
			<View style={styles.container}>
			<BackButton image={asset.back_green} back={this.props.back} />

			<Title>{this.props.title}</Title>
			<View style={styles.top}>
			<Text
			style={{
				color: AppGuideline.colors.alternative,
				marginLeft: 50,
				fontSize: 40,
				fontSize:36,
				fontFamily : 'Montserrat-UltraLight',
			}}
			>{this.props.subTitle || 'Destinataire:'}</Text>
			</View>

			<View style={styles.bottom}>
			<ListView
			ref="listView"
			dataSource={this.state.contacts}
			renderRow={this.renderRecipientRow.bind(this)}
			enableEmptySections={true}
			>
			</ListView>
			</View>
			</View>
			);
	}

	renderRecipientRow(rowData, key) {
		console.log(this.props.confirm);
		return (
			<RecipientItem
			confirm={this.props.confirm}
			rowData={rowData}
			key={key}
			/>
			);
	}
}

RecipientSelectionView.propTypes = {
	title: React.PropTypes.string
};