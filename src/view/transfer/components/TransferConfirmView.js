import React from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: baseStyles.colors.deepBlue,
    flex: 1
  },
  top: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue,
    marginHorizontal: 20
  },
  imageContainer: {
    marginTop: 125,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageUser: {
    height: 90,
    width: 90
  },
  imageGif: {
    height: 100,
    width: 45
  },
});

export default class TransferConfirmView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {transferTitle: this.props.transferTitle};
	}

  renderConfimtext() {
    if (this.props.card) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color: '#fff', fontSize: 22, height: 35 }}>Création d'une carte prépayée </Text>
          <Text style={{color: '#fff', fontSize: 22, height: 35 }}>avec un </Text>
          <Text style={{color: baseStyles.colors.alternative, fontSize: 22, height: 35 }}>{this.props.duration}</Text>
          <Text style={{color: baseStyles.colors.alternative, fontSize: 22, height: 35 }}> de {this.props.amount} €</Text>
          <Text  style={{color: '#fff', fontSize: 22, height: 35 }}> pour </Text>
          <Text style={{color: baseStyles.colors.alternative, fontSize: 22, height: 35 }}>{this.props.recipient}.</Text>
        </View>
      );
    }

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text style={{color: baseStyles.colors.alternative, fontSize: 22}}>{this.props.transferTitle}</Text>
        <Text style={{color: '#fff', fontSize: 22 }}> de </Text>
        <Text style={{color: baseStyles.colors.alternative, fontSize: 22 }}>{this.props.amount} €</Text>
        <Text  style={{color: '#fff', fontSize: 22 }}> pour </Text>
        <Text style={{color: baseStyles.colors.alternative, fontSize: 22 }}>{this.props.transferRecipient}.</Text>
      </View>
    );
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
          {
            this.props.card ?
            null :
            this.props.subTitle || 'Confirmer le B!M'
          }</Text>
          {this.renderConfimtext()}
          <View style={styles.imageContainer}>
            <Image source={asset.transfertConfirm1} style={styles.imageUser}/>
            <Image source={asset.virementSpeed} style={styles.imageGif}/>
            <Image source={asset.transfertConfirm1} style={styles.imageUser}/>
          </View>
        </View>
        <TouchableOpacity style={{
          backgroundColor: baseStyles.colors.lightviolet,
          padding: 15
        }}
        onPress={()=> {
          this.props.confirm(this.props.amount)
        }}>
          <Text style={{ padding: 10, textAlign: 'center', color: '#FFF' }}>CONFIRMER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

TransferConfirmView.propTypes = {
  title: React.PropTypes.string
};
