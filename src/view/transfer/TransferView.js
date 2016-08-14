'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import TransferStyle from './TransferStyle';
import baseStyles from '../../asset/styles.js';

import {connect} from 'react-redux';
import {init} from './TransferAction';
import MessengerFabButton from '../messenger/item/MessengerFabButton.js';


class TransferView extends Component {

    constructor(props) {
        super(props);


        this.state = {
            amount: '',
        };
    }


    componentDidMount() {
        this.props.dispatch(init());
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View style={TransferStyle.container}>
                <Text style={baseStyles.titles.h1}>B1M</Text>
                <View style={TransferStyle.top}>
                    <Text style={{
                        flex: 1,
                        color: baseStyles.colors.alternative,
                        height: 30,
                        marginTop: 10,
                        width: null
                    }}>
                    B!mer la somme de
                    </Text>
                    <Text
                    ref="amountInput"
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
                    >{this.state.amount ? this.state.amount + ' €' : 'Votre montant...'}</Text>
                </View>

                <View style={TransferStyle.bottom}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, key) => {
                            return (<TouchableOpacity style={{}} key={key} onPress={()=> {
                                this.parseInput(value)
                            }}>
                                <Text style={TransferStyle.keyboardButton}>{value}</Text>
                            </TouchableOpacity>);
                        })
                            }
                    <TouchableOpacity style={{}} >
                        <Text style={TransferStyle.keyboardButton} onPress={()=> {
                            this.parseInput('.')
                        }} >.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} >
                        <Text style={TransferStyle.keyboardButton} onPress={()=> {
                            this.parseInput('0')
                        }} >0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} >
                        <Text style={TransferStyle.keyboardButton} onPress={()=> {
                            this.parseInput('<')
                        }} > {'<'} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                        backgroundColor: baseStyles.colors.lightviolet,
                        color: 'white',
                        textAlign: 'center',
                        padding: 15
                    }}>
                        <Text style={{padding: 10, textAlign: 'center'}}>Confirmer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    parseInput(input) {
        console.log(this.state);
        var ln = this.state.amount.length;
        var append = '';
        switch (input) {
            case '0':
                if (ln > 0) {
                    append = '0';
                }
                break;
            case '<':
                console.log(this.state.amount, this.state.amount.substr(0, this.state.amount.length - 2));
                if (ln > 0) {
                    append = this.state.amount.substr(0, this.state.amount.length - 1);
                    this.setState({amount: append});
                    append = undefined;
                }
                break;
            case '.':
                if (ln == '0') {
                    append = '0.';
                }
                else if (this.state.amount.indexOf('0') == -1) {
                    append = '.'
                }
                break;
            default:
                append = input + "";
        }

        if (append) {
            this.setState({amount: this.state.amount + append});
        }

    }
}

function mapStateToProps(state) {
    return {
        transfer: state.transfer
    };
}

export default connect(mapStateToProps)(TransferView);
