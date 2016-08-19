import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../../styles/vars';


const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        backgroundColor: baseStyles.colors.deepBlue,
        flex: 1,
        alignItems: 'stretch',
        flexDirection: "column",
    },
    top: {
        flex: 1,
        backgroundColor: baseStyles.colors.deepBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        alignItems: 'center'
    }
});

export default
class TransferConfirmView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {transferTitle: this.props.transferTitle};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={baseStyles.titles.h1}>{this.props.title || 'B!M'}</Text>
                <View style={styles.top}>
                    <View style={styles.box}>
                        <Text style={{
                            flex: 1,
                            color: baseStyles.colors.alternative,
                            height: 30,
                            marginTop: 10,
                            width: null
                        }}>
                        {this.props.subTitle || 'Confirmer le B!M' }</Text>
                        <View>
                            <Text>
                                <Text style={{
                                    color: baseStyles.colors.alternative
                                }}>{this.props.transferTitle}</Text>
                                <Text style={{color: '#fff'}}> de </Text>
                                <Text style={{color: baseStyles.colors.alternative}}>{this.props.amount} €</Text>
                                <Text  style={{color: '#fff'}}> pour </Text>
                                <Text style={{color: baseStyles.colors.alternative}}>{this.props.transferRecipient}</Text>
                                </Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: baseStyles.colors.lightviolet,
                            padding: 15,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}
                        onPress={()=> {
                            this.props.confirm(this.props.amount)
                        }}
                        >
                            <Text style={{padding: 10, textAlign: 'center'}}>Confirmer</Text>
                        </TouchableOpacity>
                    </View>
                );
                }
                }

                TransferConfirmView.propTypes = {
                    title: React.PropTypes.string
                    };