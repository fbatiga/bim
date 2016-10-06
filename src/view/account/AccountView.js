'use strict';
import React, { Component } from 'react';
import { View, Text, Modal, Image, ScrollView, TouchableWithoutFeedback, SegmentedControlIOS, StyleSheet, Dimensions, Animated } from 'react-native';
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
			modalVisible: false,
			fadeAnim: new Animated.Value(0),
			slideIn: new Animated.Value(100),
			bounce: new Animated.Value(1),
			selected : 0,
			tabs: []
		};

		this.categories = {};

		this.props.account.categories.map((value, key) => {
			this.categories[value.categoryId] = value;

			value.style = {
					visibility: new Animated.Value(key == 0 ? 1 : 0),
					opacity: new Animated.Value(key == 0 ? 1 : 0.2),
					font: new Animated.Value(key == 0 ? 1 : 0.7),
					textWidth: new Animated.Value(key == 0 ? width-100 : 100),
				};
			this.state.tabs.push(value);
		});

		this.position = 0;
		this.scrollTransactionPosition= 0;
		this.scrollTransactionHeight = height;
		this.selected= 0;
		this.tabs=[];

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
				},
			Animated.timing(
				this.state.bounce,
				{
					duration: 200,
					toValue: 1
				})
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
					}),
					Animated.timing(
						this.tabs[this.selected].props.style.visibility,
						{
							duration: 200,
							toValue: 0
					}),
					Animated.timing(
						this.tabs[this.selected].props.style.textWidth,
						{
							duration: 200,
							toValue: 50
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
				}),
				Animated.timing(
					this.tabs[index].props.style.textWidth,
					{
						duration: 200,
						toValue: width-100
				}),
					Animated.timing(
						this.tabs[index].props.style.visibility,
						{
							duration: 200,
							toValue: 1
					})
			);


			this.tabView.scrollTo({
				x : index*50,
				animated:true
			});


			this.selected = index;

			Animated.parallel(animations).start(()=>{
				this.setState({
					selected : index
				});
			});

			this.setCategory(this.state.tabs[this.selected].categoryId);

		}



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


	register(item){
		this.tabs[item.props.index] = item;
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
					<Animated.View style={[style.graph, { transform: [ {scale: this.state.bounce} ] }]}>
						<View style={style.tab}>
							{this.state.selected == 0  && (
								<Image source={asset.circle[this.state.selected]}  style={style.graphCircle}>
								<Text style={style.graphLabel} >SOLDE ACTUEL</Text>
								<Text style={style.graphBalance} >{this.props.account.balance} €</Text>
								</Image>
							)}

							{this.state.selected !=0 && <Image source={asset.circle[this.state.selected]}  style={style.graphCircle} /> }
							</View>
					</Animated.View>
					<ScrollView
					style={style.tabsContainer}
					contentContainerStyle={style.tabsContent}
					horizontal={true}
					ref='tabView'
					bounces ={false}
					scrollEnabled ={false}
					snapToAlignment="center">
					{this.state.tabs.map((value, key) => {
						return (<AccountTabTitle rowData={value} style={value.style} register={this.register.bind(this)} callback={()=>{this.select(key)}} key={key} index={key} balance={this.props.account.balance} />);
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
		flex: 1,
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
	tabsContainer :{
		flex: 1,
	},
	tabsContent: {
		paddingLeft: 50,
		alignItems: 'center',
		flex: 1
	},
	graph: {
		flexDirection : 'column',
		alignItems: 'center',
	},
	graphCircle: {
		flexDirection : 'column',
		justifyContent: 'center',
		padding : 25,
	},
	graphLabel: {
		fontSize: 10,
		letterSpacing : 1.5,
		fontFamily: 'Montserrat',
		color: '#120037',
		fontWeight: '300',
		textAlign: "center"
	},
	graphBalance: {
		fontSize: 36,
		color: '#120037',
		textAlign: "center",
		fontWeight: 'bold'
	},
	tab: {
		flex: 1,
		flexDirection : 'column',
      alignItems: 'center',
      justifyContent: 'center',
  }
});

const asset = {
	circle : [
		require('./asset/circle_0.png'),
		require('./asset/circle_1.png'),
		require('./asset/circle_2.png'),
		require('./asset/circle_3.png'),
		require('./asset/circle_4.png'),
		require('./asset/circle_5.png'),
		require('./asset/circle_6.png'),
		require('./asset/circle_7.png'),
		require('./asset/circle_8.png')
	]
}

function mapStateToProps(state) {
	return {
		account: state.account,
		username: state.login.username,
		transactions: state.account.transactions
	};
}

export default connect(mapStateToProps)(AccountView);
