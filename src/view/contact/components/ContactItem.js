import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
        borderColor: '#9FA2A7',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingLeft: 20,
        backgroundColor: '#fff',
        height : 100
    },

    leftPart: {
        backgroundColor: '#fff',
    },
    rightPart: {
        // alignItems: 'flex-start',
        backgroundColor: '#fff',
        flex: 1,
        paddingLeft: 20
    },

    image: {
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    },

    category: {
        color: '#9FA2A7',
        fontSize: 12
    },
    label: {
        color: '#4F4367',
        fontSize: 14,
        fontWeight: '500'
    },
    amount: {
        color: baseStyles.colors.deepBlue,
        textAlign: 'right',
        fontSize: 18
    }
});

export default
class ContactItem extends React.Component {

    render() {
        return (
            <TouchableHighlight onPress={() => {this.props.onPress(this.props.rowData)} }>
                <View style={styles.item}>
                    <View style={styles.leftPart}>
                        <Image source={asset.users['1']} style={styles.image}/>
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.label}>
                        {this.props.rowData.givenName} {this.props.rowData.familyName}
                        </Text>
                        <Text style={styles.category}>
                         {this.props.rowData.phoneNumbers !== undefined  && this.props.rowData.phoneNumbers[0] !== undefined  &&  this.props.rowData.phoneNumbers[0].number}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

ContactItem.propTypes = {
    text: React.PropTypes.string
    //onPress : React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        account: state.transfer
    };
}
