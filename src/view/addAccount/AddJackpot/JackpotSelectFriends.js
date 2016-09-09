import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Title from '../../../component/Title.js';
import SubTitle from '../../../component/SubTitle.js';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';
import BackButton from '../../../component/BackButton.js';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue
  },
  top: {
    backgroundColor: baseStyles.colors.deepBlue,
    height: height / 2
  },
  topContent: {
    flex: 1,
    justifyContent: 'center'
  },
  bottom: {
    flex: 1,
    backgroundColor: baseStyles.colors.white
  },
  text: {
    color: baseStyles.colors.alternative,
    marginTop: 10,
    fontSize: 35,
    marginLeft: 50
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    borderColor: '#9FA2A7',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingLeft: 20,
    backgroundColor: '#fff',
    height : 100
  },
  leftPart: {
    backgroundColor: '#fff',
  },
  centerPart: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 20
  },
  rightPart: {
    backgroundColor: '#fff',
    marginRight: 20
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'stretch'
  },
  category: {
    color: '#9FA2A7',
    fontSize: 12
  },
  label: {
    color: '#4F4367',
    fontSize: 14,
    fontWeight: '500'
  },
  check: {
    width: 20,
    height: 22
  },
  confirm: {
    backgroundColor: baseStyles.colors.lightviolet,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmText: {
    color: baseStyles.colors.white
  },
  button: {
    position: 'absolute',
    right: 0,
    bottom: 90
  }
});

export default class JackpotSelectFriends extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
          <View style={styles.topContent}>
 			<SubTitle>{this.props.subtitle}</SubTitle>
          </View>
        </View>
        <ScrollView style={styles.bottom}>
          <View style={styles.item}>
            <View style={styles.leftPart}>
              <Image source={asset.users['1']} style={styles.image}/>
            </View>
            <View style={styles.centerPart}>
              <Text style={styles.label}>
                Gabriel Hofman
              </Text>
              <Text style={styles.category}>
               06 64 85 65 06
              </Text>
            </View>
            <View style={styles.rightPart}>
              <Image source={asset.check} style={styles.check}/>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.leftPart}>
              <Image source={asset.users['1']} style={styles.image}/>
            </View>
            <View style={styles.centerPart}>
              <Text style={styles.label}>
                Gabriel Hofman
              </Text>
              <Text style={styles.category}>
               06 64 85 65 06
              </Text>
            </View>
            <View style={styles.rightPart}>
              {/* <Image source={asset.check} style={styles.check}/> */}
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.leftPart}>
              <Image source={asset.users['1']} style={styles.image}/>
            </View>
            <View style={styles.centerPart}>
              <Text style={styles.label}>
                Gabriel Hofman
              </Text>
              <Text style={styles.category}>
               06 64 85 65 06
              </Text>
            </View>
            <View style={styles.rightPart}>
              <Image source={asset.check} style={styles.check}/>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.leftPart}>
              <Image source={asset.users['1']} style={styles.image}/>
            </View>
            <View style={styles.centerPart}>
              <Text style={styles.label}>
                Gabriel Hofman
              </Text>
              <Text style={styles.category}>
               06 64 85 65 06
              </Text>
            </View>
            <View style={styles.rightPart}>
              {/* <Image source={asset.check} style={styles.check}/> */}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={()=> {
            this.props.confirm();
        }}>
          <View style={styles.confirm}>
            <Text style={styles.confirmText}>CONFIRMER</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

JackpotSelectFriends.propTypes = {
  title: React.PropTypes.string
};
