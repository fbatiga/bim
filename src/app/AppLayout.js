'use strict'
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
})

export default class AppLayout extends Component {
  render() {
    return (
      <View style={styles.viewContainer} >
        {this.props.children}
      </View>
      )
  }
}



