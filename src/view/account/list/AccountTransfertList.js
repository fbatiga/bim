import React, {Component}from 'react';
import {
	Text,
	View,
	ListView,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView ,
	SegmentedControlIOS
} from 'react-native';
import moment from 'moment';
import AppGuideline from '../../../app/AppGuideline';
import AppAsset from '../../../app/AppAsset';
import AccountItem from '../item/AccountItem';

export default class AccounTransfertList extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		console.log('transactions', this.props.transactions);

		this.state = {
			filterIndex: 0,
			currentTab:  'all',
			dataSource: this.ds.cloneWithRows(this.props.transactions)
		};
	}

	componentDidMount() {
		let listView = this.refs.listView.getScrollResponder();

		if (this.props.registerScroll != undefined) {
			this.props.registerScroll(listView);
		}
	}

	filterByAll() {
		this.setState({
			dataSource:  this.ds.cloneWithRows(this.props.transactions)
		});
	}

	filterByDebit() {
		this.setState({
			dataSource: this.ds.cloneWithRows(this.props.transactions.filter((elm) => {
				return elm.type === 'debit';
			}))
		});
	}

	filterByCredit() {
		this.setState({
			dataSource: this.ds.cloneWithRows(this.props.transactions.filter((elm) => {
				return elm.type === 'credit';
			}))
		});
	}

	onChange(event) {
		switch (event.nativeEvent.selectedSegmentIndex) {
			case 0: this.filterByAll(); break;
			case 1: this.filterByDebit(); break;
			case 2: this.filterByCredit(); break;
		}
	}

	getTransactions(cat) {
		const source = this.props.transactions;

		if (cat) {
			this.state.currentTab = cat;
		}
		if (this.state.currentTab == 'all') {
			this.state.balance = this.props.account.balance;
			return source;
		} else {
			console.log('PREVIOUSMONTH', this.props.account.previousMonthBalance);
			let newBalance = this.props.account.previousMonthBalance;
			const out = source.filter((elm) => {
				if (elm.category.categoryId === this.state.currentTab) {
					newBalance += parseFloat(elm.amount);
					console.log(elm.label, elm.amount, this.state.balance + elm.amount);
					console.log('BALANCE AFTER OPERATION', this.state.balance);
					return true;
				} else {
					return false;
				}
				return;
			});

			this.setState({'balance': newBalance});
			return out;
		}
	}

	renderRow(row){
		if (row !== undefined && row.timestamp !== undefined) {
			return (<AccountItem rowData={row} />);
		}
		return null;
	}

	onScrollEnd(event){
		if (this.props.onScrollEnd != undefined) {
			this.props.onScrollEnd(event.nativeEvent);
		}
	}

	render() {
		return (
			<View style={this.props.style}>
				<View style={style.dateContainer}>
					<View style={style.dateLeft}>
						<Text style={style.previousMonth}>
							{this.props.previousMonth}
						</Text>
					</View>
					<View style={style.dateCenter}>
						<Text style={[AppGuideline.titles.h1, style.bottomTitle]}>
							{this.props.currentMonth}
						</Text>
					</View>
					<View style={style.dateRight} />
				</View>
				<View style={style.switchContainer}>
					<SegmentedControlIOS
						style={style.switch}
						tintColor={AppGuideline.colors.lightviolet}
						enabled={true}
						values={['Tout', 'Sorties', 'Entrées']}
						selectedIndex={this.state.filterIndex}
						onChange={this.onChange.bind(this)}
					/>
				</View>
				<View style={style.listView}>
					<ListView
						ref='listView'
						enableEmptySections={true}
						onMomentumScrollEnd={this.onScrollEnd.bind(this)}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	switchContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		marginBottom: 10
	},
	dateContainer: {
		flexDirection: 'row',
		height: 100
	},
	dateLeft: {
		width: 70,
		alignSelf: 'center'
	},
	dateCenter: {
		flex: 1,
		alignSelf: 'center'
	},
	dateRight: {
		width: 70,
		alignSelf: 'center'
	},
	bottomTitle: {
		color: AppGuideline.colors.deepBlue,
		fontFamily: 'Montserrat-Bold',
		fontSize: 24,
		textAlign: 'center',
		marginTop: 0
	},
	previousMonth: {
		color: AppGuideline.colors.lightGrey,
		fontSize: 24,
		fontFamily: 'Montserrat-Bold',
	},
	switch: {
		backgroundColor: '#F0F3F5',
		borderRadius: 0,
		borderWidth: 0,
		justifyContent: 'center',
		width: 200,
		borderColor: 'transparent',
		alignItems: 'center'
	},
	listView: {
		flex: 10,
	},
});
