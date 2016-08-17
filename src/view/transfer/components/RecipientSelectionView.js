import React from 'react';
import { Text, View, ScrollView, ListView,  Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import RecipientItem from './RecipientItem';


import baseStyles from '../../../asset/styles.js';
import asset from '../../../asset';


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

export default
class RecipientSelectionView extends React.Component {

    constructor(props) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });

        super(props);
        this.state = {
            amount: this.props.amount,
            dataSource: ds.cloneWithRows([{contactName: 'Faou ABAITGA ', subTitle: 'BIM', picture: ''},
                {contactName: 'Faou ABAITGA ', subTitle: 'Societe generale', picture: ''},
                {contactName: 'MAx lamark ', subTitle: '0658430239', picture: ''}])
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={baseStyles.titles.h1}>{this.props.title || 'B!M'}</Text>
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
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRecipientRow.bind(this)}
                    enableEmptySections={true}
                    >
                    </ListView>
                </View>
            </View>
        );
    }

    renderRecipientRow(rowData, key) {
        return (
            <RecipientItem
            rowData={rowData}
            key={key}
            />
        );
    }
}

RecipientSelectionView.propTypes = {
    title: React.PropTypes.string
};