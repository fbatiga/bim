import React from 'react';
import { Text, View, ScrollView, ListView,  Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import ContactItem from './ContactItem';
import Title from '../../../component/Title.js';
import Contacts from 'react-native-contacts';
import asset from '../../../asset';
import baseStyles from '../../../styles/vars';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex:1,
        flexDirection:"column"
    },
    filterButton: {
        color: "white",
        padding: 10
    }

});

export default
class ContactList extends React.Component {

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
            if (err && err.type === 'permissionDenied') {
                // x.x
            } else {
                console.log(contacts);
                contacts = [
                    {givenName: 'Faouzane', familyName: 'BATIGA', phoneNumbers: [{number: "0667505353"}]},
                ].concat(contacts);
                this.setState({contacts: this.ds.cloneWithRows(contacts)});
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true} style={{ backgroundColor: baseStyles.colors.lightviolet, paddingLeft:width/4}}
                >
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    .map((l, key)=> {
                        return (<TouchableOpacity  onPress={() => {
                            alert(l)
                        }}>
                            <Text style={styles.filterButton} key={key}>{l}</Text>
                        </TouchableOpacity>)
                    })}
                </ScrollView>
                <ScrollView style={{flex:15}}>
                    <ListView
                    ref="listView"
                    dataSource={this.state.contacts}
                    renderRow={this.renderRecipientRow.bind(this)}
                    enableEmptySections={true}
                    >
                    </ListView>
                </ScrollView>
            </View>
        );
    }

    renderRecipientRow(rowData, key) {
        console.log(this.props.onPress);
        return (
            <ContactItem
            onPress={this.props.callback}
            rowData={rowData}
            key={key}
            />
        );
    }
}

ContactList.propTypes = {
    title: React.PropTypes.string
};
