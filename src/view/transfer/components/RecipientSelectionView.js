import React from 'react';
import { Text, View, ScrollView, ListView,  Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import RecipientItem from './RecipientItem';
import Title from '../../../component/Title.js';
import Contacts from 'react-native-contacts';
import asset from '../../../asset';
import baseStyles from '../../../styles/vars';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        backgroundColor: baseStyles.colors.deepBlue
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: baseStyles.colors.deepBlue,
        height: 200
    },
    bottom: {
        backgroundColor: "white",
        height: 400,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row'
    }
});

export default class RecipientSelectionView extends React.Component {

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
            if(err && err.type === 'permissionDenied'){
                // x.x
            } else {
                console.log(contacts);
                this.setState({contacts: this.ds.cloneWithRows(contacts)});
            }
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Title title={this.props.title} />
                <View style={styles.top}>
                    <Text
                    style={{
                        flex: 1,
                        color: baseStyles.colors.alternative,
                        textAlign: 'center',
                        borderBottomWidth: 3,
                        borderBottomColor: "white",
                        fontSize: 40,
                        fontWeight: '200',
                        marginTop: 100,
                        width: null
                    }}
                    >{ 'Destinataire:'}</Text>
                </View>

                <View style={styles.bottom}>
                    <ListView
                    ref="listView"
                    dataSource={this.state.contacts}
                    renderRow={this.renderRecipientRow.bind(this)}
                    enableEmptySections={true}
                    >
                    </ListView>
                </View>
            </View>
        );
    }

    renderRecipientRow(rowData, key) {
        console.log(this.props.confirm);
        return (
            <RecipientItem
                confirm={this.props.confirm}
            rowData={rowData}
            key={key}
            />
        );
    }
}

RecipientSelectionView.propTypes = {
    title: React.PropTypes.string
};
