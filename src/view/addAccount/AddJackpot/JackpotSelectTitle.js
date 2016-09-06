import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import Title from '../../../component/Title.js';
import baseStyles from '../../../styles/vars';

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue
  },
  top: {
    justifyContent: 'center',
    backgroundColor: baseStyles.colors.deepBlue,
    height: height / 2
  },
  text: {
    // flex: 1,
    color: baseStyles.colors.alternative,
    marginTop: 10,
    fontSize: 35,
    marginLeft: 50,
    marginTop: 50
  },
  input: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    borderBottomWidth: 3,
    borderBottomColor: "white",
    fontSize: 40,
    height: 100
  }
});

export default class JackpotSelectTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title>{this.props.title}</Title>
        <View style={styles.top}>
          <Text style={styles.text}>
            {this.props.subtitle || 'Nommer cette cagnotte' }
          </Text>
          <TextInput
            autoCapitalize='sentences'
            autoCorrect={false}
            autoFocus
            returnKeyType='next'
            ref="titleInput"
            style={styles.input}
            onSubmitEditing={(event)=>{this.props.confirm(event.nativeEvent.text);}}
          />
        </View>
      </View>
    );
  }
}

JackpotSelectTitle.propTypes = {
  title: React.PropTypes.string
};
