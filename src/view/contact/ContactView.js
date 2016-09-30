'use strict';
import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, PanResponder, Image, TouchableOpacity, TouchableHighlight, Animated, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppGuideline from '../../app/AppGuideline';
import AppAsset from '../../app/AppAsset';

import Title from '../common/title/Title';
import ContactItem from './item/ContactItem';
import LetterItem from './item/LetterItem';

import {connect} from 'react-redux';
import {loadContacts} from './ContactAction';


const {width, height} = Dimensions.get('window');
const letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class ContactView extends Component {
	constructor(props) {
		super(props);

		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.items = [];
		this.letters = [];

		this.spacerWidth = width / 2 - 35/2;
		this.scrollPos = null;
		this.letterNb = null;

		this.state = {
			animButton : new Animated.Value(0.00001),
			users: this.props.contact.users,
			filteredUsers: this.props.contact.users
		};

		for(var i in letters){
			this.letters[i] = this.letters[letters[i-1]] ;
		}
	}

	componentDidMount(){
		//this.headerScroll = this.refs.header.getScrollResponder();
		this.listViewScroll = this.refs.listView.getScrollResponder();

		//this.props.dispatch(loadContacts([]));

		Animated.timing(
			this.state.animButton,
			{
				delay : 300,
				duration : 300,
				toValue : 1
			}).start();
	}

	saveLetter(item){
		this.letters[item.props.children] = item;
	}

	onScroll(event){
		this.scrollPos = event.nativeEvent.contentOffset.x;
		this.letterNb = event.nativeEvent.contentOffset.x / 35;

		let filteredUsers = [];

		if (letters[this.letterNb] !== undefined) {
			this.state.users.map((user) => {
				if (user.givenName.charAt(0) === letters[this.letterNb]) {
					filteredUsers.push(user)
				} else if (letters[this.letterNb] === '') {
					filteredUsers = this.state.users;
				}
			})

			console.log(filteredUsers);

			this.setState({
				...this.state,
				selectedLetter: letters[this.letterNb],
				filteredUsers
			});
		}
	}

	// onLetterPress(index){
	// 	let letter = letters[index];
	//
	// 	let pos =  this.letters[letter].layout.x - this.spacerWidth ;
	// 	this.headerScroll.scrollTo({
	// 		y: 0,
	// 		x: pos,
	// 		animated : true
	// 	});
	//
	// 	this.scrollToLetter(index);
	// }

	// scrollToLetter(index){
	// 	if(letters[index] != undefined){
	// 		let letter = letters[index];
	//
	// 		if (this.items[letter] != undefined) {
	// 			this.listViewScroll.scrollTo({
	// 				y: this.items[letter].layout.y,
	// 				x: 0,
	// 				animated : true
	// 			});
	// 		} else {
	// 			this.scrollToLetter(index-1);
	// 		}
	// 	}
	// }

	openContact(contact) {
		Actions.contactDetails({contact});
	}

	save(item) {
		if (this.items[item.props.rowData.name[0]] == undefined || this.items[item.props.rowData.name[0]].layout.y > item.layout.y) {
			this.items[item.props.rowData.name[0]] = item;
		}
	}

	renderRow(contact) {
		if (contact.type !== undefined && contact.type =='action' ) {
			return null;
		}

		return (
			<ContactItem
				onPress={this.openContact.bind(this)}
				rowData={contact}
				save={this.save.bind(this)}
				rowData={contact}
			/>
		);
	}

	searchContacts(value) {
		let filteredUsers = [];

		this.state.users.map((user) => {
			let name = `${user.givenName} ${user.familyName}`
			if (name.indexOf(value) > -1) {
				filteredUsers.push(user);
			}
		});

		this.setState({
			...this.state,
			filteredUsers
		});
	}

	render() {
		const dataSource = this.ds.cloneWithRows(this.state.filteredUsers);

		console.log(dataSource);
		console.log(this.state.users);

		return (
			<View style={style.container}>
				<Title style={{color: AppGuideline.colors.deepblue, height: 80}} >CONTACTS</Title>
				{
					true && (
					<View style={{ height: 80, paddingTop:20, backgroundColor: AppGuideline.colors.lightviolet }}>
						<View style={{ position: 'absolute',  backgroundColor: '#998BB8', left: width / 2 - 35/2, top: 22.5, width:35, height: 35 , borderRadius: 20}}></View>
						<ScrollView
							style={{ flex: 1 }}
							horizontal={true}
							scrollEventThrottle={200}
							automaticallyAdjustInsets={false}
							decelerationRate={0}
							snapToInterval={35}
							snapToAlignment='start'
							showsHorizontalScrollIndicator={false}
							onScroll={this.onScroll.bind(this)}
							ref='header'
						>
							<View style={{ width: width / 2 - 35/2, backgroundColor: 'transparent'}} />
								{
									letters.map((letter, index)=> {
										return (<LetterItem key={index} onPress={()=>{ console.log(index) }} save={this.saveLetter.bind(this)}>{letter}</LetterItem>)
									})
								}
							<View style={{ width : width / 2 - 35/2, backgroundColor: 'transparent'}} />
						</ScrollView>
					</View>
					)
				}
				{
					false &&
					<View style={{ flexDirection: 'row', height: 80, paddingTop:20, backgroundColor: AppGuideline.colors.lightviolet }}>
						<TextInput
							style={{height: 40, width: width /1.5, borderColor: '#FFF', borderWidth: 1}}
							autoCapitalize='words'
							onChangeText={(text) => this.searchContacts(text)}
						/>
						<View style={{ flex: 1, marginTop: 13, alignItems: 'center'}}>
							<Text style={{ color: '#fff' }}>ANNULER</Text>
						</View>
					</View>
				}
				<View  style={{flex:1}}>
					{this.props.contact.list.length === 0  && this.props.contact.loading === true && <Text>Chargement...</Text>}
					<ListView
						ref='listView'
						dataSource={dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</View>
				<View style={style.addIcon}>
					<TouchableOpacity onPress={() => {
						// Actions.addContact();
					}}>
						<Animated.Image source={AppAsset.add} style={{ transform: [ {scale :this.state.animButton }] }} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	addIcon: {
		position : 'absolute',
		bottom: 50,
		right : -10
	}
});

function mapStateToProps(state) {
	return {
		contact: state.contact
	};
}

export default connect(mapStateToProps)(ContactView);
