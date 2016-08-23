'use strict'
import { StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../styles/vars.js';

const { width, height } = Dimensions.get('window');
const JackpotStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  top: {
    height: height / 1.7,
    backgroundColor: baseStyles.colors.pink,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    backgroundColor: baseStyles.colors.white,
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  jackpotImage: {
    width: 127,
    height: 130,
    marginBottom: 25
  },
  textTitle: {
    fontSize: 19,
    marginBottom: 3,
    textAlign: 'center',
    color: baseStyles.colors.deepBlue
  },
  amount: {
    marginTop: 15,
    fontSize: 25,
    textAlign: 'center',
    color: baseStyles.colors.deepBlue
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  userImage: {
    width: width / 9,
    height: width / 9,
    borderWidth: 2,
    borderColor: baseStyles.colors.alternative,
    borderRadius: 20
  },
  addFriend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90
  },
  addImage: {
    width: 25,
    height: 25,
    marginRight: 15
  },
  addContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0
  },
  addIcon: {
    width: 70,
    height: 70,
    marginRight: -10
  }
});

export default JackpotStyle;
