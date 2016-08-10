import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import asset from '../../../asset';

const styles = StyleSheet.create({
    bubble: {
        position: 'absolute',
        right: 30,
        top: 10,
        width: 100,
        zIndex: 10
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch'
    }
});

export default
class MessengerFabButton extends React.Component {

    render() {
        return (
            <TouchableOpacity style={styles.botIcon} onPress={()=> {
                Actions.messenger()
            }}>
                <Image source={asset.c3po}  style={styles.image} />
            </TouchableOpacity>
        );
    }
};
