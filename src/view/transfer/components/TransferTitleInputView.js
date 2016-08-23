import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../../asset/styles.js';
import Title from '../../../component/Title.js';
import baseStyles from '../../../styles/vars';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        backgroundColor: baseStyles.colors.deepBlue
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: baseStyles.colors.deepBlue,
        height: height / 2
    },
    bottom : {
        backgroundColor:"white",
        height: height / 2,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row'
    },
    keyboardButton: {
        padding: 40,
        fontSize: 50,
        width: width * 0.33,
        textAlign:'center'
    }
});

export default
class TransferTitleInputView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title : this.props.title};
    }
    componentDidMount() {
        this.refs.titleInput.focus();
    }
    render() {
        return (
            <View style={styles.container}>
                <Title title={this.props.title} />
                <View style={styles.top}>
                    <Text style={{
                        flex: 1,
                        color: baseStyles.colors.alternative,
                        height: 30,
                        marginTop: 10,
                        width: null
                    }}>
                   {this.props.subtitle || 'B!MER LA SOMME DE' }
                    </Text>
                    <TextInput
                    ref="titleInput"
                    style={{
                        flex: 1,
                        color: 'white',
                        textAlign: 'center',
                        borderBottomWidth: 3,
                        borderBottomColor: "white",
                        fontSize: 40,
                        height: 100,
                        width: null
                    }}
                    onSubmitEditing={(event)=>{this.props.confirm(event.nativeEvent.text);}}
                    />
                </View>
            </View>
        );
    }



}

TransferTitleInputView.propTypes = {
    title: React.PropTypes.string
};
