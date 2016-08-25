import React, { Component } from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const { width, height } = Dimensions.get('window');
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
  image: {
    height: 50,
    width: 50,
    marginTop: 100
  },
  cardImage: {
    width: 271,
    height: 171
  }
});

export default class CardSuccessView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={baseStyles.titles.h1}>{this.props.title || 'Cartes'}</Text>
        <View style={styles.top}>
          <View style={{ alignItems: 'center' }}>
            <Image source={asset.carte1} style={styles.cardImage}/>
          </View>
            <Image source={asset.success} style={styles.image}/>
            <Text style={{
              color: '#fff',
              fontSize: 20,
              marginTop: 15
            }}>
              {this.props.subTitle || 'Carte Crée !' }
            </Text>
        </View>
      </View>
    );
  }
}

CardSuccessView.propTypes = {
  title: React.PropTypes.string,
  subTitle: React.PropTypes.string
};
