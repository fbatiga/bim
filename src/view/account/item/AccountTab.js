import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const tabStyles = StyleSheet.create({
    button: {
        margin: 10,
        borderRadius: 0,
        borderBottomWidth: 3,
        borderBottomColor: '#eee',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 1,
        paddingRight: 1,
        height: 30,
        backgroundColor: 'transparent'
    },
    text: {
        color: '#4F4367'
    }
});

export default
class AccountTab extends React.Component {

    render() {
        const flexStyle = {};
        return (
            <TouchableOpacity style={tabStyles.button} >
                <Text style={tabStyles.text}>
				{this.props.rowData.label}
                </Text>
            </TouchableOpacity>
        );
    }
}

AccountTab.propTypes = {
    text: React.PropTypes.string
    //onPress : React.PropTypes.func
};
