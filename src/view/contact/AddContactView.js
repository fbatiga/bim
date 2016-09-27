import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppGuideline from '../../app/AppGuideline';

class AddContact extends Component {
  render() {
    return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textGrey}>Patience,</Text>
        <Text style={styles.textBlue}>Vous pourrez</Text>
        <Text style={styles.textBlue}>bientôt inviter</Text>
        <Text style={styles.textBlue}>vos contacts</Text>
        <Text style={styles.textBlue}>sur BiM.</Text>
      </View>
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={() => { Actions.pop(); }}>
          <Image source={asset.close} style={styles.close} />
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppGuideline.colors.white
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textGrey: {
    fontSize: 36,
    textAlign: 'center',
    color: AppGuideline.colors.lightGrey,
    marginBottom: 5
  },
  textBlue: {
    fontSize: 36,
    textAlign: 'center',
    color: AppGuideline.colors.deepblue,
    marginBottom: 5
  },
  closeButton: {
    bottom: 50
  },
  close: {
    width: 50,
    height: 50
  }
});

const asset = {
	close: require('./asset/close.png'),
};

export default AddContact;
