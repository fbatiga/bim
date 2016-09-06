'use strict'
import { StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../styles/vars.js';

const { width, height } = Dimensions.get('window');
const AddAccountStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue
  },
  top: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue,
    justifyContent: 'center',
  },
  bottom: {
    backgroundColor: baseStyles.colors.white
  },
  textTitle: {
    fontFamily : 'Montserrat-UltraLight',
    fontSize: 36,
	lineHeight : 36,
	marginTop: 24,
    marginLeft: width / 8,
    color: baseStyles.colors.alternative
  },
  lines: {
    borderBottomWidth: 1,
    borderBottomColor: baseStyles.colors.lightGrey,
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 25,
    alignItems: 'center',
    // flexWrap: 'wrap'
  },
  text: {
    color: baseStyles.colors.deepBlue,
    fontFamily : 'Montserrat-UltraLight',
    fontSize: 14,
	lineHeight : 14,
  },
  textLight: {
    color: baseStyles.colors.alternative
  }
});

export default AddAccountStyle;
