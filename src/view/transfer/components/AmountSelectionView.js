import React from 'react';

import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../../styles/vars.js';
import Title from '../../../component/Title.js';
import asset from '../../../asset';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: baseStyles.colors.deepBlue
    },
    top: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: baseStyles.colors.deepBlue
    },
    bottom: {
      // flex: 1,
      backgroundColor: "white",
      // height: (height / 2 + 70),
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      flexDirection: 'row',

    },
    keyboardButton: {
      padding: 20,
      width: width * 0.33,
      textAlign: 'center',
      fontSize: 22
    }
});

export default
class AmountSelectionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {amount: this.props.amount};
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
                        width: null,
                        fontSize: 22,
                        marginBottom: 25
                    }}>
                    {this.props.subtitle || 'B!MMER LA SOMME DE' }
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
                <TouchableOpacity style={{
                    // flex: 1,
                    backgroundColor: baseStyles.colors.lightviolet,
                    padding: 15,
                    height: 70
                }}
                onPress={()=> {
                    this.props.confirm(this.state.amount)
                }}
                >
                    <Text style={{padding: 10, textAlign: 'center', color: '#fff' }}>CONFIRMER</Text>
                </TouchableOpacity>
                <View style={styles.bottom}>

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, key) => {
                            return (<TouchableOpacity style={{}} key={key} onPress={()=> {
                                this.parseInput(value)
                            }}>
                                <Text style={styles.keyboardButton} onPress={()=> {
                                    this.parseInput(value)
                                }} >{value}</Text>
                            </TouchableOpacity>);
                        })
                            }
                    <TouchableOpacity style={{}} onPress={()=> {
                        this.parseInput(',')
                    }} >
                        <Text style={styles.keyboardButton} >,</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}}  onPress={()=> {
                        this.parseInput('0')
                    }} >
                        <Text style={styles.keyboardButton} >0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.keyboardButton,{alignItems:'center'}]} onPress={()=> {
                        this.parseInput('<')
                    }}>
                        <Image source={asset.keyboard['effacer']} style={{resizeMode: 'contain', width: 20}} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    parseInput(input) {
        console.log(this.state.amount, input);
        var ln = this.state.amount.length;
        var append = '';
        switch (input) {
            case '0':
                if (ln > 0) {
                    append = '0';
                }
                break;
            case '<':
                console.log(this.amount, this.state.amount.substr(0, this.state.amount.length - 2));
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
                else if (this.state.amount.indexOf('.') == -1) {
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

AmountSelectionView.propTypes = {
    title: React.PropTypes.string
};
