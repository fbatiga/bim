import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import baseStyles from '../../../asset/styles.js';
import asset from '../../../asset';


const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: 0,
        borderRadius: 0,
        borderColor: '#9FA2A7',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        backgroundColor: '#fff'
    },

    leftPart: {
        flex: 2,
        backgroundColor: '#fff',
    },
    rightPart: {
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        flex: 6
    },

    image: {
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    },

    category: {
        color: '#00A6FF',
        fontSize: 8
    },
    label: {
        color: '#4F4367',
        fontSize: 14
    },
    amount: {
        color: baseStyles.colors.deepBlue,
        textAlign: 'right',
        fontSize: 18
    }
});

export default
class RecipientItem extends React.Component {

    render() {
        return (
            <TouchableHighlight>
                <View style={styles.item}>
                    <View style={styles.leftPart}>
                        <Image source={asset.users['1']} style={styles.image}/>
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.label}>
                        {this.props.rowData.contactName}
                        </Text>
                        <Text style={styles.category}>
                         {this.props.rowData.subTitle}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

RecipientItem.propTypes = {
    text: React.PropTypes.string
    //onPress : React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        account: state.transfer
    };
}