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
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImage: {
    width: 271,
    height: 171
  },
  cardDetails: {
    flex: 1,
    backgroundColor: baseStyles.colors.white
  },
  cardLayout: {
    backgroundColor: baseStyles.colors.lightGrey,
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  cardLayoutHeader: {
    flexDirection: 'row',
    marginTop: 30
  },
  cardLayoutLeft: {
    width: 60,
    justifyContent: 'center',
  },
  cardLayoutCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardLayoutRight: {
    width: 60
  },
  lines: {
    height: 85,
    borderBottomWidth: 1,
    borderBottomColor: baseStyles.colors.lightGrey,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  lineLeft: {
    flex: 1
  },
  pictoLock: {
    width: 14,
    height: 20
  },
  pictoArrow: {
    width: 22,
    height: 20
  },
  pictoSwitch: {
    width: 50,
    height: 20
  },
  pictoBack: {
    width: 30,
    height: 16
  },
  pictoBim: {
    width: 78,
    height: 30
  },
  pictoCard: {
    width: 200,
    height: 100
  },
  cardPicto: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardNumber: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  textNumber: {
    fontSize: 22,
    color: baseStyles.colors.red
  },
  cardInfos: {
    flexDirection: 'row',
    marginTop: 25
  },
  cardInfosLeft: {
    flex: 1,
    marginLeft: 20
  },
  cardInfosRight: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20
  },
  cardText: {
    color: baseStyles.colors.deepBlue
  }
});

export default CardStyle;
