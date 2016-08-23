import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';


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
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
      marginTop: 150
    },
    image: {
        height: 100,
        width: 237
    },
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
                    <Text style={{
                      color: baseStyles.colors.alternative,
                      marginTop: 10,
                      marginBottom: 25,
                      fontSize: 22
                    }}>
                    {this.props.subTitle || 'Confirmer le B!M' }</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{color: baseStyles.colors.alternative, fontSize: 22}}>{this.props.transferTitle}</Text>
                      <Text style={{color: '#fff', fontSize: 22 }}> de </Text>
                      <Text style={{color: baseStyles.colors.alternative, fontSize: 22 }}>{this.props.amount} €</Text>
                      <Text  style={{color: '#fff', fontSize: 22 }}> pour </Text>
                      <Text style={{color: baseStyles.colors.alternative, fontSize: 22 }}>{this.props.transferRecipient}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                      <Image source={asset.userTransfert} style={styles.image}/>
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: baseStyles.colors.lightviolet,
                    padding: 15
                  }}
                  onPress={()=> {
                    this.props.confirm(this.props.amount)
                  }}
                >
                  <Text style={{padding: 10, textAlign: 'center', color: '#FFF'}}>CONFIRMER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

TransferConfirmView.propTypes = {
  title: React.PropTypes.string
};
