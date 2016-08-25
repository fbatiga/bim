import {StyleSheet} from 'react-native';
import baseStyles from '../../styles/vars.js';

const CardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue
  },
  bottomRighticon: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    marginRight: -10
  }
});

export default CardStyle;
