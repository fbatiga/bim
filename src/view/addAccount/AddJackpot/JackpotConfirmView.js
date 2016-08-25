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
    justifyContent: 'center',
    backgroundColor: baseStyles.colors.deepBlue,
  },
  imageContainer: {
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center'
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
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              color: baseStyles.colors.white,
              marginTop: 10,
              fontSize: 25,
              height: 40
            }}>
            {this.props.subTitle || 'Confirmer le B!M' }</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Text style={{color: baseStyles.colors.alternative, fontSize: 25, height: 40}}>{this.props.name}</Text>
            <Text style={{color: '#fff', fontSize: 25, height: 40 }}> avec </Text>
            <Text style={{color: baseStyles.colors.alternative, fontSize: 25, height: 40}}>{this.props.duration}</Text>
            <Text style={{color: '#fff', fontSize: 25, height: 40 }}> de </Text>
            <Text style={{color: baseStyles.colors.alternative, fontSize: 25, height: 40 }}>{this.props.amount} €.</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={asset.cagnotteConfirm} style={styles.image} resizeMode='contain'/>
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
