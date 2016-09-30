import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import Title from '../../common/title/Title';
import SubTitle from '../../common/title/SubTitle';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
    flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		backgroundColor: AppGuideline.colors.deepBlue,
		height: height / 2
	},
	topContent: {
		justifyContent: 'center',
		flex: 1
	},
	bottom: {
    flex: 1,
		backgroundColor: AppGuideline.colors.white
	},
  title: {
    alignSelf: 'center',
    color: AppGuideline.colors.alternative,
    fontSize: 36,
    marginBottom: 15
  },
  subtitle: {
    alignSelf: 'center',
    color: AppGuideline.colors.white,
    maxWidth: width / 1.3
  },
  form: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  inputText: {
    color: '#9FA2A7',
    fontSize: 12,
    marginBottom: 10
  },
  input: {
    width: width / 1.5,
    height: 45,
    borderRadius: 5,
    backgroundColor: AppGuideline.colors.lightGrey,
    marginBottom: 30
  },
  button: {
    // flex: 1,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppGuideline.colors.lightviolet
  },
  buttonText: {
    color: AppGuideline.colors.white
  }
});

export default class AccountSelectBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      pwd: ''
    }
  }

  handleChange(name, value) {
    this.setState({
      ...this.state,
      [name]: value
    })
  }

	render() {
		return (
			<View style={styles.container}>
				<ScrollView scrollEnabled={false} style={{ backgroundColor: 'white' }}>
          <View style={styles.top}>
            <BackButton image={asset.back_green} back={this.props.back} />
            <Title>{this.props.title}</Title>
            <View style={styles.topContent}>
              <Text style={styles.title}>{this.props.bank}</Text>
              <Text style={styles.subtitle}>Renseignez les mêmes identifiants de connexion que sur le site de votre banque.</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.form}>
              <Text style={styles.inputText}>IDENTIFIANT</Text>
              <TextInput
                style={styles.input}
                ref='id'
                onChangeText={(text) => { this.handleChange('id', text)}}
                autoCorrect={false}
                autoFocus
                returnKeyType='next'
                onSubmitEditing={() => {
                  this.refs.pwd.focus();
                }}
              />

              <Text style={styles.inputText}>MOT DE PASSE</Text>
              <TextInput
                style={styles.input}
                ref='pwd'
                onChangeText={(text) => { this.handleChange('pwd', text)}}
                autoCorrect={false}
                secureTextEntry
                returnKeyType='done'
                onSubmitEditing={() => {
                  this.props.save('user', this.state);
                }}
                />
            </View>
          </View>
        </ScrollView>
        <TouchableHighlight onPress={() => { this.props.save('user', this.state); }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>LANCER LA SYNCHRONISATION</Text>
          </View>
        </TouchableHighlight>
			</View>
		);
	}
}

AccountSelectBank.propTypes = {
  title: PropTypes.string,
	bank: PropTypes.string,
	back: PropTypes.func,
	save: PropTypes.func
};
