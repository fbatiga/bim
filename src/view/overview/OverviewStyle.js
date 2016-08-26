import {StyleSheet} from 'react-native';
import baseStyles from '../../styles/vars.js';


const OverviewStyle = StyleSheet.create({
    container: {
        backgroundColor:  baseStyles.colors.deepBlue,
    },
    top: {
        alignItems: 'stretch',
        backgroundColor: baseStyles.colors.deepBlue,
        paddingTop: 15,
        top: 0,
        left: 0
    },
    tabs: {
        overflow: 'hidden', height:100
    },
    graph: {
        alignItems: 'center'
    },
    graphCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        padding: 10,
        marginBottom: 10,
        // backgroundColor:  baseStyles.colors.alternative,
        borderRadius: 145
    },
    graphLabel: {
        fontSize: 10,
        color: baseStyles.colors.deepBlue,
        fontWeight: '300',
        marginBottom: 5,
        overflow: 'hidden',
        textAlign: "center"
    },
    graphBalance: {
        fontSize: 36,
        color: baseStyles.colors.deepBlue,
        fontWeight: 'bold'

    },

    bottom: {
       /*

            justifyContent: 'flex-start',
            flexDirection: "column",
            alignItems: 'stretch',

        */
        backgroundColor: '#fff'
    },
    bottomTitle: {
        color: baseStyles.colors.deepBlue,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'

    },
    switchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        marginBottom: 10
    },

    switch: {
        backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        justifyContent: 'center',
        width: 200,
        alignItems: 'center'
    },

    listView: {
        flex: 10,
        borderColor: "red"
    },
    addIcon: {
      alignItems: 'flex-end',
      marginRight: -15,
      marginBottom: 15
    }

});

export default OverviewStyle;
