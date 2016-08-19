mport React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

class TransferModal extends Component {

    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{marginTop: 22}}>


                <TouchableHighlight onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>

            </View>
        );
    }
}