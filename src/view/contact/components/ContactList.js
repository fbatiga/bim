import React from 'react';
import { Text, View, ScrollView, ListView, PanResponder, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import ContactItem from './ContactItem';
import LetterItem from './LetterItem';
import Title from '../../../component/Title.js';
import Contacts from 'react-native-contacts';
import asset from '../../../asset';
import baseStyles from '../../../styles/vars';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

	container: {
		backgroundColor: "white",
		flex: 1,
	}
});

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lettersIndex = {
	'A': false,
	'B': false,
	'C': false,
	'D': false,
	'E': false,
	'F': false,
	'G': false,
	'H': false,
	'I': false,
	'J': false,
	'K': false,
	'L': false,
	'M': false,
	'N': false,
	'O': false,
	'P': false,
	'Q': false,
	'R': false,
	'S': false,
	'T': false,
	'U': false,
	'V': false,
	'W': false,
	'X': false,
	'Y': false,
	'Z': false
};

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

		this.selected = null;
		let  contacts = [ ];

		var idx = 0;
		for(var i in contacts){
			var l = contacts[i].givenName.substring(0,1);
			if(!lettersIndex[l]){
				lettersIndex[l] = idx;
			}
			idx++;
		}

		this.state = {
			amount: this.props.amount,
			contacts: contacts,
			scrollHeight: 0
		};


		console.time('START CONTACTRECUP');
		Contacts.getAll((err, contacts) => {
			if (err && err.type === 'permissionDenied') {
				console.log(err);
			} else {
				console.timeEnd('START CONTACTRECUP');

				contacts = [
				{givenName: 'Faouzane', familyName: 'BATIGA', phoneNumbers: [{number: "0667505353"}], type:'bim'},
				{givenName: 'Faouzane', familyName: 'BATIGA', phoneNumbers: [{number: "0667505353"}], type:'bim'},
				{givenName: 'Faouzane', familyName: 'BATIGA', phoneNumbers: [{number: "0667505353"}], type:'bim'},
				{givenName: 'Faouzane', familyName: 'BATIGA', phoneNumbers: [{number: "0667505353"}], type:'bim'},
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



                // GET CONTACT HEADERS
                var idx = 0;
                for (var i in contacts) {
                	var l = contacts[i].givenName.substring(0, 1);
                	if (!lettersIndex[l]) {
                		lettersIndex[l] = idx;
                	}
                	idx++;
                }
                this.setState({contacts: contacts});
            }
        });



	}


	setPosition(index){
		console.log("setPosition", index);
	}



	componentDidMount(){
		this.headerScroll = this.refs.header.getScrollResponder();
		this.listViewScroll = this.refs.listView.getScrollResponder();
	}



	handlePanResponderRelease(evt, gestureState) {
		let start = gestureState.moveX;
		let dest = gestureState.x0;
		let distance = dest - start;

 		// this.headerScroll.scrollTo({
 		// 	y: 0,
 		// 	x: distance,
 		// 	animated : true
 		// });
 		//alert(distance);

 		//this.setPosition(this.position + direction);
 	}


 	save(item){
 		if(this.items[item.props.rowData.name[0]] == undefined || this.items[item.props.rowData.name[0]].layout.y > item.layout.y){
 			this.items[item.props.rowData.name[0]] = item;
 		}
 	}

 	saveLetter(item){
 		this.letters[item.props.children] = item;

 		console.log('letter',item.props.children, item.layout.x);

 	}

 	onScroll(event){

 		console.log('letter', event.nativeEvent.contentOffset);



 		for(var letter in this.letters ){
 			let item = this.letters[letter];

 			if( (event.nativeEvent.contentOffset.x + this.spacerWidth ) > ( item.layout.x ) && ( event.nativeEvent.contentOffset.x + this.spacerWidth ) <= (item.layout.x + item.layout.width ) ) {
 				console.log('letter',letter);

 				item.setState({
 					color : 'black'
 				});

 				this.selected = item;

 			}else{
 				item.setState({
 					color : 'white'
 				});

 			}
 		}

 	}


 	render() {
 		return (
 			<View
 			style={[styles.container, this.props.style]} >
 			<View style={{ height: 80, paddingTop:20, backgroundColor: baseStyles.colors.lightviolet }}>
 			<View style={{ position: 'absolute',  backgroundColor: 'red', left: width / 2 - 35/2, top: 22.5, width:35, height: 35 , borderRadius: 20}}></View>
 			<ScrollView horizontal={true}
 			scrollEventThrottle={200}

 			onScroll={this.onScroll.bind(this)}
 			ref='header'
 			>
 			<View style={{ width: width / 2 - 35/2, backgroundColor: 'transparent'}} />
 			{letters.map((letter, index)=> {
 				return ( <LetterItem key={index} save={this.saveLetter.bind(this)}>{letter}</LetterItem>)
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

 ContactList.propTypes = {
 	title: React.PropTypes.string
 };
