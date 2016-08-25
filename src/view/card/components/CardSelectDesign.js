'use strict'
import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Title from '../../../component/Title.js';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const { width, height } = Dimensions.get('window');
const boxMargin = 10;
const boxPreview = 25;
const boxSize = width - (boxMargin + boxPreview ) * 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue
  },
  top: {
    justifyContent: 'center',
    backgroundColor: baseStyles.colors.deepBlue,
    flex: 1
  },
  bottom: {
    marginBottom: 25
  },
  text: {
    color: baseStyles.colors.alternative,
    marginTop: 10,
    fontSize: 35,
    marginLeft: 50,
    width: width / 2
  },
  image: {
    width: boxSize,
    height: boxSize
  },
  tabsContainer: {
    flex: 1
  },
  tabsContent: {
    paddingHorizontal: boxPreview,
  },
  tab: {
    flex: 1,
    width: boxSize,
    margin: boxMargin,
    alignItems: 'center',
    justifyContent: 'center',
    }
});

export default class JackpotSelectDesign extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title title={this.props.title} />
        <View style={styles.top}>
          <Text style={styles.text}>
            {this.props.subtitle || 'Design de la cagnotte' }
          </Text>
        </View>
        <View style={styles.bottom}>
          <ScrollView
            style={styles.tabsContainer}
            contentContainerStyle={styles.tabsContent}
            horizontal={true}
            automaticallyAdjustInsets={false}
            decelerationRate={0}
            snapToInterval={boxSize + boxMargin*2}
            snapToAlignment='start'>
            <View style={styles.tab}>
              <TouchableOpacity onPress={()=> {
                  this.props.confirm();
              }}>
                <Image source={asset.burger} style={styles.image} />
              </TouchableOpacity>
            </View>
            <View style={styles.tab}>
              <TouchableOpacity onPress={()=> {
                  this.props.confirm();
              }}>
                <Image source={asset.bim} style={styles.image} />
              </TouchableOpacity>
            </View>
            <View style={styles.tab}>
              <TouchableOpacity onPress={()=> {
                  this.props.confirm();
              }}>
                <Image source={asset.batiment} style={styles.image} />
              </TouchableOpacity>
            </View>
            <View style={styles.tab}>
              <TouchableOpacity onPress={()=> {
                  this.props.confirm();
              }}>
                <Image source={asset.pasteque} style={styles.image} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

JackpotSelectDesign.propTypes = {
  title: React.PropTypes.string
};
