'use strict';

import React, { Component } from 'react';
import { View, Text, Modal, ListView, Image, ScrollView, SegmentedControlIOS, TouchableOpacity, TouchableHighlight,StyleSheet,  Dimensions, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {firebaseDb} from  '../../app/AppFirebase';

import AppGuideline from '../../app/AppGuideline';
import AppAsset from '../../app/AppAsset';
import {swipeTo, configureSwipe} from '../menu/MenuAction';


import {connect} from 'react-redux';
import {addTransaction, setTransactions} from './AccountAction';
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
		this.position = 0;
		this.scrollTransactionPosition= 0;
		this.scrollTransactionHeight = height;

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


		let animations = [];
		animations.push(
			Animated.timing(
				this.state.fadeAnim,
				{
					duration: 50,
					toValue: 1
				}),
			Animated.timing(
				this.state.bounceValue,
				{
					duration: 200,
					toValue: 1
				}),
			Animated.timing(
				this.state.slideIn,
				{
					duration: 200,
					toValue: 0
				})
			);

		Animated.sequence(animations).start();

		this.transactionsRef.once("value").then(function (snapshot) {

			let transactions = [];
			snapshot.forEach((row) => {
				row = row.val();
				row.category = this.categories[row.category];
				transactions.push(row);
			});

			this.props.dispatch(setTransactions(transactions));
			this.listenToTransactionChanges(this.transactionsRef);

		}.bind(this), function (err) {
			console.log(err);
		});

		this.mainView = this.refs.mainView.getScrollResponder();
	}

	listenToTransactionChanges(source) {
		source.orderByChild('timestamp').on('child_added', (snapshot)=> {
			snapshot = snapshot.val();
            // console.log(snapshot);
            snapshot.category = this.categories[snapshot.category];
            // inserting at the beginning of the array

            this.props.dispatch(addTransaction(snapshot));
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

	configureScroll(){
		this.props.dispatch(
			configureSwipe({
				onVerticalSwipe : this.onVerticalSwipe.bind(this),
				onVerticalLargeSwipe : this.onVerticalSwipe.bind(this)
			})
			);
	}

	registerScroll(scroll){

		this.transferScroll = scroll;

	}

	onVerticalSwipe(distance, position) {

		if(this.position == 0 && position.y > 500){

			this.scrollTo(500);

		}else if(position.y < 100 && distance < 0){
			this.scrollTo(0);

		}else{

			if(distance< 100){
				distance = distance *2;
			}

			let pos = this.scrollTransactionPosition + distance;


			if(pos<0){
				pos = 0;
			}

			if( pos > this.scrollTransactionHeight - 500){

				pos = this.scrollTransactionHeight -  500;

			}

			this.transferScroll.scrollTo({
				y: pos,
				animated : true
			});
		}
	}


	scrollTo(y){
		this.mainView.scrollTo({
			y: y,
			x: 0,
			animated : true
		});
		this.position = y;
	}

	onScrollTransactionEnd(nativeEvent){
		this.scrollTransactionPosition = nativeEvent.contentOffset.y;
		this.scrollTransactionHeight = nativeEvent.contentSize.height;

	}

	render() {
		return (
			<View style={{ flex: 1 }} onLayout={this.configureScroll.bind(this)} >

			<ScrollView
			bounces={false}
			scrollEnabled={false}
			ref='mainView'
			>

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
			bounces ={false}
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
			registerScroll={this.registerScroll.bind(this)}
			onScrollEnd={this.onScrollTransactionEnd.bind(this)}
			previousMonth={this.state.previousMonth}
			currentMonth={this.state.currentMonth}
			category={this.state.category}
			account={this.props.account}
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
		height: 485,
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
		flex: 1,
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
