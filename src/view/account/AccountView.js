'use strict';
import React, { Component } from 'react';
import { View, Text, Modal, Image, ScrollView, SegmentedControlIOS, StyleSheet, Dimensions, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { firebaseDb } from  '../../app/AppFirebase';
import { connect } from 'react-redux';

import AppGuideline from '../../app/AppGuideline';
import AppAsset from '../../app/AppAsset';
import { swipeTo, configureSwipe } from '../menu/MenuAction';

import AccountTab from './item/AccountTab';
import AccountTabTitle from './item/AccountTabTitle';


import Title from '../common/title/Title';
import BackButton from '../common/button/BackButton';
import AccountTransfertModal from './modal/AccountTransfertModal';
import AccountTransfertList from './list/AccountTransfertList';

import { addTransaction, setTransactions } from './AccountAction';

const {width, height} = Dimensions.get('window');
const themePreview = 50;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

class AccountView extends Component {
	constructor(props) {
		super(props);

		let categories = {};

		this.props.account.categories.map((value, key) => {
			categories[value.categoryId] = value;
		});
		this.categories = categories;
		this.position = 0;
		this.scrollTransactionPosition= 0;
		this.scrollTransactionHeight = height;

		this.state = {
			currentTab: 'all',
			previousMonth: 'Sept',
			currentMonth: 'Oct',
			balance: this.props.account.balance,
			modalVisible: false,
			fadeAnim: new Animated.Value(0),
			slideIn: new Animated.Value(100),
			tabs: []
		};

		this.categories = {};

		this.props.account.categories.map((value, key) => {
			this.categories[value.categoryId] = value;

			value.style = {
					bounce: new Animated.Value(key == 0 ? 1 : 0.7),
					opacity: new Animated.Value(key == 0 ? 1 : 0.2),
					font: new Animated.Value(key == 0 ? 1 : 0.7),
					textWidth: new Animated.Value(key == 0 ? width : 50),
				};
			this.state.tabs.push(value);
		});

		this.position = 0;
		this.scrollTransactionPosition= 0;
		this.scrollTransactionHeight = height;
		this.selected= 0;
		this.tabs=[];
		this.TitleTabs=[];

		this.state.tabs[this.selected].selected = true;

	}


	componentWillMount(){
		const rootRef = firebaseDb.ref();

		this.transactionsRef = rootRef.child(this.props.username+'/transactions');
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
				this.state.slideIn,
				{
					duration: 200,
					toValue: 0
				}
			)
		);

		Animated.sequence(animations).start();

		this.transactionsRef.once("value").then(function (snapshot) {
			let transactions = [];

			snapshot.forEach((row) => {
				row = row.val();
				transactions.push(row);
			});

			this.props.dispatch(setTransactions(transactions));
			this.listenToTransactionChanges(this.transactionsRef);

		}.bind(this), function (err) {
			console.log(err);
		});

		this.mainView = this.refs.mainView.getScrollResponder();
		this.tabView = this.refs.tabView.getScrollResponder();
		this.tabTitleView = this.refs.tabTitleView.getScrollResponder();

	}

	listenToTransactionChanges(source) {
		source.orderByChild('timestamp').on('child_added', (snapshot)=> {
			snapshot = snapshot.val();

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
				onVerticalLargeSwipe : this.onVerticalSwipe.bind(this),
				onHorizontalSwipe : this.onHorizontalSwipe.bind(this),
				onHorizontalLargeSwipe : this.onHorizontalSwipe.bind(this)
			})
		);
	}

	registerScroll(scroll){
		this.transferScroll = scroll;
	}

	select(index){

		console.log('select', index);

		let animations = [];


		if(this.tabs[index] != undefined){

			if(this.tabs[this.selected] != undefined){

				animations.push(
					Animated.timing(
					this.tabs[this.selected].props.style.opacity,
					{
						duration: 200,
						toValue: 0.2
					}),
					Animated.timing(
						this.tabs[this.selected].props.style.font,
						{
							duration: 200,
							toValue: 0.7
					})
				);




			}






			animations.push(
				Animated.timing(
					this.tabs[index].props.style.opacity,
					{
						duration: 200,
						toValue: 1
				}),
				Animated.timing(
					this.tabs[index].props.style.font,
					{
						duration: 200,
						toValue: 1
				})
			);

			this.tabView.scrollTo({
				x : this.tabs[index].position - ((width - this.tabs[index].width)/2),
				animated:true
			});

			this.tabTitleView.scrollTo({
				x : this.TitleTabs[index].position - ((width - this.TitleTabs[index].width)/2),
				animated:true
			});

			this.selected = index;

		}

		Animated.parallel(animations).start();

	}

	onHorizontalSwipe(distance, position) {

		if(distance > 0){

			this.select(this.selected + 1);

		}else{

			this.select(this.selected - 1);
		}

	}

	onVerticalSwipe(distance, position) {
		if (this.position == 0 && position.y > 500) {
			this.scrollTo(500);
		} else if (position.y < 100 && distance < 0) {
			this.scrollTo(0);
		} else {
			let pos = this.scrollTransactionPosition + distance;

			if (distance< 100) {
				distance = distance *2;
			}
			if (pos < 0) {
				pos = 0;
			}
			if (pos > this.scrollTransactionHeight - 500) {
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


	registerTabs(item){
		this.tabs[item.props.index] = item;
	}


	registerTitleTabs(item){
		this.TitleTabs[item.props.index] = item;
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

			<View style={style.tabs}>
				<ScrollView
					style={style.tabsContainer}
					contentContainerStyle={style.tabsContent}
					horizontal={true}
					ref='tabView'
					bounces ={false}
					scrollEnabled ={false}
					snapToAlignment="center">
					{this.state.tabs.map((value, key) => {
						return (<AccountTab rowData={value} style={value.style} register={this.registerTabs.bind(this)} callback={this.setCategory.bind(this)} key={key} index={key} balance={this.props.account.balance} />);
					})}
					</ScrollView>
					<ScrollView
					style={style.titleTabsContainer}
					contentContainerStyle={style.tabsContent}
					horizontal={true}
					ref='tabTitleView'
					bounces ={false}
					scrollEnabled ={false}
					snapToAlignment="center">
					{this.state.tabs.map((value, key) => {
						return (<AccountTabTitle rowData={value} style={value.style} register={this.registerTitleTabs.bind(this)} callback={this.setCategory.bind(this)} key={key} index={key} balance={this.props.account.balance} />);
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
					transactions={this.props.transactions}
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
	titleTabsContainer :{
		flex: 1,

	},
	tabsContainer: {
		flex: 2,

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
		username: state.login.username,
		transactions: state.account.transactions
	};
}

export default connect(mapStateToProps)(AccountView);
