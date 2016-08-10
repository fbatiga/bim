import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import asset from '../../../asset';
const tabStyles = StyleSheet.create({
    button: {
        margin: 10,
        borderRadius: 0,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 1,
        paddingRight: 1,
        height: 30,
        backgroundColor: 'transparent',
        alignItems:'center'
    },
    text: {
        color: '#fff',
        fontSize: 14
    }
});

export default
class AccountTab extends React.Component {

    render() {
        const flexStyle = {};
        return (
            <TouchableOpacity style={tabStyles.button} onPressIn={()=>{this.props.callback(this.props.rowData.categoryId)}} >
                <Text style={tabStyles.text}>
				{this.props.rowData.label}
                </Text>
                <Image source={asset.tabs[this.props.rowData.color]} style={{marginTop: 5}}/>
            </TouchableOpacity>
        );
    }

    handlePressIn() {
        this.state;
    }
}

AccountTab.propTypes = {
    text: React.PropTypes.string
    //onPress : React.PropTypes.func
};
