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
        flex: 1,
    },
    filterButton: {
        color: "white",
        padding: 10,
        fontSize:18
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

        console.time('START CONTACTRECUP');
        Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
                console.log(err);
            } else {
                console.timeEnd('START CONTACTRECUP');
                contacts = [
                    {givenName: 'Faouzane', familyName: 'BATIGA', phoneNumbers: [{number: "0667505353"}]},
                ].concat(contacts);
                for (var i = 0; i < 1000; i++) {
                    contacts.push({
                        givenName: 'Faouzane',
                        familyName: 'BATIGA',
                        phoneNumbers: [{number: "0667505353"}]
                    });
                }
                this.setState({contacts: this.ds.cloneWithRows(contacts)});
            }
        });
    }

    render() {
        return (
            <ListView
            ref="listView"
            style={[styles.container, this.props.style]}
            dataSource={this.state.contacts}
            renderRow={this.renderRecipientRow.bind(this)}
            renderSectionHeader={this.renderHeader.bind(this)}
            enableEmptySections={true}
            >
            </ListView>
        );
    }

    renderHeader() {
        return (<ScrollView horizontal={true} containerContentStyle={{}} style={{
            height: 45,
            backgroundColor: baseStyles.colors.lightviolet,
            paddingLeft: width / 4
        }}
        >
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    .map((l, key)=> {
                        return (<TouchableOpacity key={key} onPress={() => {
                            alert(l)
                        }}>
                            <Text style={styles.filterButton}>{l}</Text>
                        </TouchableOpacity>)
                    })}
        </ScrollView>)

    }

    renderRecipientRow(rowData) {
        return (
            <ContactItem
            onPress={this.props.callback}
            rowData={rowData}
            />
        );
    }
}

ContactList.propTypes = {
    title: React.PropTypes.string
};
