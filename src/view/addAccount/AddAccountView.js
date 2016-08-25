'use strict'
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions as routing } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { init } from './AddAccountAction';
import MessengerFabButton from '../messenger/item/MessengerFabButton.js';
import AddAccountStyle from './AddAccountStyle';
import asset from '../../asset';
import baseStyles from '../../styles/vars.js';

class addAccount extends Component {
  componentDidMount() {
    this.props.dispatch(init());
  }

  render() {
    return (
      <View style={AddAccountStyle.container}>
        <Text style={baseStyles.titles.h1}>Comptes</Text>

        <View style={AddAccountStyle.top}>
          <View>
            <Text style={AddAccountStyle.textTitle}>Type de</Text>
            <Text style={AddAccountStyle.textTitle}>compte :</Text>
          </View>
        </View>
        <View style={AddAccountStyle.bottom}>
          <View style={AddAccountStyle.lines}>
            <Text style={AddAccountStyle.text}>Ajouter un compte éxistant</Text>
          </View>
          <View style={AddAccountStyle.lines}>
            <TouchableOpacity onPress={()=> {
                routing.addJackpot();
            }}>
              <Text style={AddAccountStyle.text}>Créer une cagnotte</Text>
            </TouchableOpacity>
          </View>
          <View style={AddAccountStyle.lines}>
            <Text style={AddAccountStyle.text}>Ouvrir un compte épargne </Text>
            <Text style={AddAccountStyle.textLight}>(Bientôt disponible)</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect()(addAccount);
