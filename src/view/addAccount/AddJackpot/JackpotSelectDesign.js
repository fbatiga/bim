import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  text: {
    color: baseStyles.colors.alternative,
    marginTop: 10,
    fontSize: 35,
    marginLeft: 50
  },
  redBox: {
    backgroundColor: baseStyles.colors.pink,
    width: boxSize,
    height: boxSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 15
  },
  image: {
    width: 127,
    height: 130
  },
  greenBox: {
    backgroundColor: '#B5EF00',
    height: boxSize,
    flex: 1,
    borderRadius: 10,
    marginLeft: -10
  },
  blueBox: {
    backgroundColor: baseStyles.colors.blue,
    height: boxSize,
    flex: 1,
    borderRadius: 10,
    marginRight: -10
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
          <View style={styles.greenBox} />
          <TouchableOpacity onPress={()=> {
              this.props.confirm();
          }}>
            <View style={styles.redBox}>
              <Image source={asset.jackpot} style={styles.image} />
            </View>
          </TouchableOpacity>
          <View style={styles.blueBox} />
        </View>
      </View>
    );
  }
}

JackpotSelectDesign.propTypes = {
  title: React.PropTypes.string
};
