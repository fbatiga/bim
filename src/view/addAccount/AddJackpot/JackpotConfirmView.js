import React, { Component } from 'react';
import { Text, View,  TouchableOpacity, StyleSheet, Image } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseStyles.colors.deepBlue,
    flex: 1
  },
  top: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    marginTop: 100
  },
  image: {
    height: 200,
    width: 184
  },
});

export default class JackportConfirmView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={baseStyles.titles.h1}>{this.props.title || 'B!M'}</Text>
        <View style={styles.top}>
          <Text style={{
            color: baseStyles.colors.white,
            marginTop: 10,
            marginBottom: 25,
            fontSize: 25
          }}>
          {this.props.subTitle || 'Confirmer le B!M' }</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{color: baseStyles.colors.alternative, fontSize: 25}}>{this.props.name}</Text>
            <Text style={{color: '#fff', fontSize: 25 }}> avec </Text>
            <Text style={{color: '#fff', fontSize: 25 }}>un versement unique de </Text>
            <Text style={{color: baseStyles.colors.alternative, fontSize: 25 }}>{this.props.amount} €.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={asset.cagnotteConfirm} style={styles.image} resizeMode='contain'/>
          </View>
        </View>
        <TouchableOpacity style={{
          backgroundColor: baseStyles.colors.lightviolet,
          padding: 15
        }}
        onPress={()=> {
          this.props.confirm();
        }}>
          <Text style={{padding: 10, textAlign: 'center', color: '#FFF'}}>CONFIRMER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

JackportConfirmView.propTypes = {
  title: React.PropTypes.string
};
