import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import asset from '../../../asset';

const styles = StyleSheet.create({
    botIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 100,
        zIndex: 10
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch',
        width:80,
        height:80
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
