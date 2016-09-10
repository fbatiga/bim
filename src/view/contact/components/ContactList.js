import React from 'react';
import { Text, View, ScrollView, ListView, PanResponder, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import ContactItem from './ContactItem';
import LetterItem from './LetterItem';
import Title from '../../../component/Title';
import Contacts from 'react-native-contacts';
import asset from '../../../app/AppAsset';
import baseStyles from '../../../styles/vars'

const {width, height} = Dimensions.get('window');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default
class ContactList extends React.Component {

	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => (r1 !== r2)
		});

		this.items = [];
		this.letters = [];

		this.spacerWidth = width / 2 - 35/2;

		this.scrollPos = null;
		let  contacts = [ ];

		var idx = 0;


		for(var i in letters){
			this.letters[i] = this.letters[letters[i-1]] ;
		}


		this.state = {
			amount: this.props.amount,
			contacts: contacts,
		};





		console.time('START CONTACTRECUP');
		Contacts.getAll((err, contacts) => {
			if (err && err.type === 'permissionDenied') {
				console.log(err);
			} else {
				console.timeEnd('START CONTACTRECUP');

				contacts = [
				{givenName: 'Faouzane', familyName: 'BATIGA', phoneNumbers: [{number: "0667505353"}], type:'bim'},
				].concat(contacts);


				contacts = contacts.sort((a,b) => {
					if(a.givenName >  b.givenName){
						return 1;
					} else if (a.givenName ===  b.givenName){
						return 0;
					}
					else {
						return -1
					}
				});


				this.setState({contacts: contacts});
			}
		});



	}


	componentDidMount(){
		this.headerScroll = this.refs.header.getScrollResponder();
		this.listViewScroll = this.refs.listView.getScrollResponder();
	}


	save(item){
		if(this.items[item.props.rowData.name[0]] == undefined || this.items[item.props.rowData.name[0]].layout.y > item.layout.y){
			this.items[item.props.rowData.name[0]] = item;
		}
	}

	saveLetter(item){
		this.letters[item.props.children] = item;

	}

	onScroll(event){

		this.scrollPos = event.nativeEvent.contentOffset.x;

	}

	onLetterPress(index){

		let letter = letters[index];

		let pos =  this.letters[letter].layout.x - this.spacerWidth ;
		this.headerScroll.scrollTo({
			y: 0,
			x: pos,
			animated : true
		});


		this.scrollToLetter(index);
	}


	scrollToLetter(index){

		if(letters[index] != undefined){
			let letter = letters[index];

			if(this.items[letter] != undefined){
				this.listViewScroll.scrollTo({
					y: this.items[letter].layout.y,
					x: 0,
					animated : true
				});
			}else{
				this.scrollToLetter(index-1);
			}

		}
	}


	render() {
		return (
			<View
			style={[styles.container, this.props.style]} >
			<View style={{ height: 80, paddingTop:20, backgroundColor: baseStyles.colors.lightviolet }}>
			<View style={{ position: 'absolute',  backgroundColor: '#998BB8', left: width / 2 - 35/2, top: 22.5, width:35, height: 35 , borderRadius: 20}}></View>
			<ScrollView horizontal={true}
			scrollEventThrottle={200}

			onScroll={this.onScroll.bind(this)}
			ref='header'
			>
			<View style={{ width: width / 2 - 35/2, backgroundColor: 'transparent'}} />
			{letters.map((letter, index)=> {
				return ( <LetterItem key={index} onPress={()=>{ this.onLetterPress(index) }} save={this.saveLetter.bind(this)}>{letter}</LetterItem>)
			})}
			<View style={{ width : width / 2 - 35/2, backgroundColor: 'transparent'}} />
			</ScrollView>

			</View>
			<View  style={{flex:1}}>
			<ScrollView
			horizontal={false}
			scrollEventThrottle={200}
			ref='listView'

			>
			{this.state.contacts.map((contact, index) =>{

				let name = [];

				if(contact.givenName != undefined){
					name.push(contact.givenName);
				}

				if(contact.familyName != undefined){
					name.push(contact.familyName);
				}

				contact.name = name.join(' ');

				return (
					<ContactItem
					onPress={this.props.callback}
					rowData={contact}
					save={this.save.bind(this)}
					rowData={contact}
					/>
					);

			})}

			</ScrollView>
			</View>



			</View>
			);
	}



}


const styles = StyleSheet.create({

	container: {
		backgroundColor: "white",
		flex: 1,
	}
});


ContactList.propTypes = {
	title: React.PropTypes.string
};
