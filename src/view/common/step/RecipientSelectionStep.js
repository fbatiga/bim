import React from 'react';
import { Text, View, ScrollView, ListView,  Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import RecipientItem from '../item/RecipientItem';
import ActionItem from '../item/ActionItem';

import Title from '../title/Title';
import ContentTitle from '../title/ContentTitle';
import AppAsset from '../../../app/AppAsset';
import AppGuideline from '../../../app/AppGuideline';
import BackButton from '../button/BackButton';
import {loadContacts} from '../../contact/ContactAction';
import {connect} from 'react-redux';



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

export default class RecipientSelectionStep extends React.Component {

	componentDidMount(){
		this.props.dispatch(loadContacts());
	}


	renderRow(contact){

		if(contact.type !== undefined && contact.type =='action' && this.props.qrCode !== undefined ){
			return (<ActionItem
						confirm={this.props.qrCode}
						image={AppAsset.qrcode}
						text={contact.text} />
					);
		}

		return <RecipientItem
						confirm={this.props.confirm}
						rowData={contact}
					/>
	}


	render() {
		return (
			<View style={styles.container}>
			<BackButton image={AppAsset.back_green} back={this.props.back} />

			<Title>{this.props.title}</Title>
			<View style={styles.top}>
			<ContentTitle>{this.props.subtitle}</ContentTitle>
			</View>

			<View style={styles.bottom}>

			{this.props.contact.list.length== 0  && this.props.contact.loading == true && <Text>Chargement...</Text>}

			<ListView
			ref='listView'
			dataSource={this.props.contact.dataSource}
			renderRow={this.renderRow.bind(this)}
			/>

			</View>
			</View>
			);
	}
}

RecipientSelectionStep.propTypes = {
	title: React.PropTypes.string
};

function mapStateToProps(state) {
	return {
		contact: state.contact
	};
}

export default connect(mapStateToProps)(RecipientSelectionStep);
