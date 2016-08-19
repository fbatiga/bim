import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../../asset/styles.js';
import Title from '../../../component/Title.js';


const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        backgroundColor: baseStyles.colors.deepBlue
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: baseStyles.colors.deepBlue,
        height: 400
    },
    bottom : {
        backgroundColor:"white",
        height: 400,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',

    },
    keyboardButton: {
        padding: 40,
        fontSize: 50,
        width: width * 0.33,
        textAlign:'center'
    }
});

export default
class TransferConfirmView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title : this.props.title};
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
                   {this.props.subtitle || 'Confirmer le B!M ' }</Text>
                     <Text style={{color:baseStyles.colors.alternative}}>{this.props.transfertTitle}</Text><Text> de </Text><Text style={{color:baseStyles.colors.alternative}}>{this.props.amount} €</Text><Text> pour
                    </Text><Text style={{color:baseStyles.colors.alternative}}>{this.props.recipient}</Text>

                    <TouchableOpacity style={{
                        width: 200,
                        backgroundColor: baseStyles.colors.lightviolet,
                        color: 'white',
                        alignItems: 'center',
                        padding: 15
                    }}
                    onPress={()=> {this.props.confirm(this.props.amount)}}
                    >
                        <Text style={{padding: 10, textAlign: 'center'}}>Confirmer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

TransferConfirmView.propTypes = {
    title: React.PropTypes.string
};
