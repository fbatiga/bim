import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import baseStyles from '../../../styles/vars.js';


const styles = StyleSheet.create({
    button: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: 0,
        borderRadius: 0,
        borderColor: '#9FA2A7',
        borderBottomWidth: 1,
        paddingTop: 30,
        paddingBottom: 30,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#fff'
    },

    leftPart: {
        flex: 5,
        backgroundColor: '#fff',
    },
    rightPart: {
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        flex: 2
    },

    timestamp: {
        color: '#BDC4C8',
        fontSize: 8
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
        textAlign:'right',
        fontSize: 18
    }
});

export default
class AccountItem extends React.Component {

    render() {
        return (
            <TouchableHighlight>
                <View style={styles.button}>
                    <View style={styles.leftPart}>
                        <Text style={styles.timestamp}>
				{this.props.rowData.createdAt || this.props.rowData.timestamp}
                        </Text>
                        <Text style={styles.label}>
				{this.props.rowData.label}
                        </Text>
                        <Text style={[styles.category, {color: baseStyles.colors[this.props.rowData.category.color]} ]}>
                         {this.props.rowData.category.label}
                        </Text>
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.amount}>
				{this.props.rowData.amount}
                        </Text>
                        <Text style={styles.amount}> €</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

AccountItem.propTypes = {
    text: React.PropTypes.string
    //onPress : React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        account: state.account
    };
}