import {StyleSheet, Dimensions} from 'react-native';
import baseStyles from '../../styles/vars';

const {width, height} = Dimensions.get('window');
const themePreview = 100;
const themeMargin = 5;
const themeWidth = width - (themePreview + themeMargin) * 2;

const AccountStyle = StyleSheet.create({
    container: {
    	flex: 1
    },
    top: {
        height: 440,
        // alignItems: 'stretch',
        backgroundColor: baseStyles.colors.alternative,
        paddingTop: 15,
        // position: 'relative',
        // top: 0,
        // left: 0,
        overflow: 'visible',
        zIndex: 10
    },
    // tabs: {
    //     overflow: 'hidden',
    //     height: 75
    // },
    graph: {
        alignItems: 'center'
    },
    graphCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: 240,
        resizeMode: 'stretch',
        padding: 10,
        marginBottom: 10
    },
    graphLabel: {
        fontSize: 10,
        color: '#120037',
        fontWeight: '300',
        marginBottom: 5,
        width: 180,
        marginLeft: 20,
        marginRight: 20,
        overflow: 'hidden',
        textAlign: "center"
    },

    graphBalance: {
        fontSize: 36,
        color: '#120037',
        fontWeight: 'bold'
    },
    dotIcon: {
        alignItems: 'center',
        marginTop: 10
    },

    transferButton: {
      position: 'absolute',
      top: (height - 250),
      right: -10,
      borderRadius: 100,
      padding: 0,
      zIndex: 100
    },

    closeModalButton: { 'position': 'absolute', top: -70, right: -40, padding:0, width: 100, zIndex: 10 },

    transferButtonImage: {},

    bottom: {
        /*

         justifyContent: 'flex-start',
         flexDirection: "column",
         alignItems: 'stretch',

         */
        backgroundColor: '#fff'
    },
    dateContainer: {
      flexDirection: 'row',
      height: 100
    },
    dateLeft: {
      width: 70,
      alignSelf: 'center'
    },
    dateCenter: {
      flex: 1,
      alignSelf: 'center'
    },
    dateRight: {
      width: 70,
      alignSelf: 'center'
    },
    bottomTitle: {
      color: baseStyles.colors.deepBlue,
      fontSize: 24,
      textAlign: 'center',
      fontWeight: '400',
      marginTop: 0
    },
    previousMonth: {
      color: baseStyles.colors.lightGrey,
      fontSize: 24,
      fontWeight: '400'
    },
    switchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginBottom: 10
    },

    switch: {
        backgroundColor: '#F0F3F5',
        borderRadius: 0,
        borderWidth: 0,
        justifyContent: 'center',
        width: 200,
        borderColor: 'transparent',
        alignItems: 'center'
    },

    listView: {
        flex: 10,
        borderColor: "red"
    },

    modalList: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15,
      height: 110,
      borderBottomWidth: 1,
      borderBottomColor: '#E3E4E3',
      justifyContent: 'center'
    },
    modalContent: {
      marginLeft: 25
    },

    tabsContainer: {
      flex: 1
    },
    tabsContent: {
      marginTop: 20,
      paddingHorizontal: themePreview,
      alignItems: 'center',
      flex: 1
    },
    tab: {
      flex: 1,
      width: themeWidth,
      margin: themeMargin,
      // height: themeWidth,
      alignItems: 'center',
      justifyContent: 'center',
    }

});

export default AccountStyle;
