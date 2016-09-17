'use strict';

import React, { Component } from 'react';
import { View, Text, Modal, ListView, Image, ScrollView, SegmentedControlIOS, TouchableOpacity, TouchableHighlight,StyleSheet,  Dimensions, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {firebaseDb} from  '../../app/AppFirebase';

import AppGuideline from '../../app/AppGuideline';
import AppAsset from '../../app/AppAsset';


import {connect} from 'react-redux';
import {addTransaction} from './AccountAction';
import AccountTab from './item/AccountTab';
import Title from '../common/title/Title';
import BackButton from '../common/button/BackButton';

import AccountTransfertModal from './modal/AccountTransfertModal';
import AccountTransfertList from './list/AccountTransfertList';

const {width, height} = Dimensions.get('window');
const themePreview = 50;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

class AccountView extends Component {

	constructor(props) {
		super(props);

		var categories = {};
		this.props.account.categories.map((value, key) => {
			categories[value.categoryId] = value;
		});
		this.categories = categories;

		this.state = {
			currentTab: 'all',
			previousMonth: 'Mai',
			currentMonth: 'Juin',
			balance: this.props.account.balance,
			modalVisible: false,
			fadeAnim: new Animated.Value(0),
			bounceValue: new Animated.Value(0),
			slideIn: new Animated.Value(100)
		};
	}

	componentWillMount(){
		const rootRef = firebaseDb.ref();
		this.transactionsRef = rootRef.child(this.props.login.username+'/transactions');
	}

	componentDidMount() {
		Animated.timing(
			this.state.fadeAnim,
			{
				toValue: 1
			}).start();

		Animated.timing(
			this.state.bounceValue,
			{
				delay: 200,
				toValue: 1,
				friction: 10,
				tension: 40
			}).start();

		Animated.timing(
			this.state.slideIn,
			{
				delay: 200,
				toValue: 0,
				friction: 10,
				tension: 40
			}).start();

		this.transactionsRef.once("value").then(function (snapshot) {

			snapshot.forEach((row) => {
				row = row.val();
				row.category = this.categories[row.category];
				this.props.dispatch(addTransaction(row));
			});

		}.bind(this), function (err) {
			console.log(err);
		});
		this.listenToTransactionChanges(this.transactionsRef);
	}

	listenToTransactionChanges(source) {
		var that = this;
		source.orderByChild('timestamp').on('child_added', (snapshot)=> {
			snapshot = snapshot.val();
            // console.log(snapshot);
            snapshot.category = that.categories[snapshot.category];
            // inserting at the beginning of the array

            that.props.account.transactions.unshift(snapshot);
           // this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.account.transactions)});
       });
	}

	showModal() {
		this.setState({modalVisible: true});
	}

	hideModal() {
		this.setState({modalVisible: false});
	}


	setCategory(category) {
		this.setState({category: category});
	}



	render() {
		return (
			<View style={{ flex: 1 }}>
			<TouchableOpacity style={style.transferButton} onPress={this.showModal.bind(this)}>
			<Image source={AppAsset.transfer}  style={style.transferButtonImage} />
			</TouchableOpacity>
			<ScrollView>
			{this.state.modalVisible && <AccountTransfertModal close={this.hideModal.bind(this)}/>}

			<View style={style.top}>

			<BackButton image={AppAsset.back_dark} back={Actions.overview} />
			<Title style={{color :AppGuideline.colors.deepBlue, marginBottom: 20}} >B!M</Title>

			<Animated.View style={[style.graph, { transform: [ {scale: this.state.bounceValue} ] }]}>
			<Image source={AppAsset.graphCircled}  style={style.graphCircle}>
			<Text style={style.graphLabel} >SOLDE ACTUEL</Text>
			<Text style={style.graphBalance} >{this.state.balance} €</Text>
			</Image>
			</Animated.View>

			<View style={style.tabs}>
			<ScrollView
			style={style.tabsContainer}
			contentContainerStyle={style.tabsContent}
			horizontal={true}
			automaticallyAdjustInsets={false}
			decelerationRate={0}
			snapToInterval={themeWidth + themeMargin*2}
			snapToAlignment="center">
			{this.props.account.categories.map((value, key) => {
				return (<AccountTab rowData={value} callback={this.setCategory.bind(this)} key={key} />);
			})}
			</ScrollView>
			</View>
			</View>

			<Animated.View style={[style.bottom, { marginTop: this.state.slideIn }]}>
			<AccountTransfertList
			previousMonth={this.state.previousMonth}
			currentMonth={this.state.currentMonth}
			category={this.state.category}
			transactions={this.props.account.transactions}
			/>
			</Animated.View>
			</ScrollView>
			</View>
			);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1
	},
	top: {
		height: (height - 225),
		backgroundColor: AppGuideline.colors.alternative,
		overflow: 'visible',
		zIndex: 10
	},
	tabs: {
		flex: 1
	},
	graph: {
		alignItems: 'center'
	},
	graphCircle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: null,
		height: 220,
		resizeMode: 'stretch',
	},
	graphLabel: {

		fontSize: 10,
		letterSpacing : 1.5,
		fontFamily: 'Montserrat',
		color: '#120037',
		fontWeight: '300',
		marginBottom: 5,
		width: 180,
		marginLeft: 20,
		marginRight: 20,
		overflow: 'hidden',
		textAlign: "center"
	},

	graphBalance: {
		fontSize: 36,
		color: '#120037',
		fontWeight: 'bold'
	},
	dotIcon: {
		alignItems: 'center',
		marginTop: 10
	},

	transferButton: {
		position: 'absolute',
		top: (height - 215),
		right: -10,
		borderRadius: 100,
		padding: 0,
		zIndex: 100
	},

	transferButtonImage: {},

	bottom: {
		backgroundColor: '#fff'
	},

	tabsContainer: {
		flex: 1
	},
	tabsContent: {
		paddingHorizontal: themePreview,
		alignItems: 'center',
		flex: 1
	}
});

function mapStateToProps(state) {
	return {
		account: state.account,
		login: state.login
	};
}

export default connect(mapStateToProps)(AccountView);
