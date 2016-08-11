import {StyleSheet} from 'react-native';
import baseStyles from '../../asset/styles.js';


const AccountStyle = StyleSheet.create({
    container: {},
    top: {
        height: 550,
        alignItems: 'stretch',
        backgroundColor: baseStyles.colors.deepBlue,
        paddingTop: 15,
        position: 'relative',
        top: 0,
        left: 0,
        overflow: 'visible',
        zIndex: 10
    },
    tabs: {
        overflow: 'hidden', height: 100
    },
    graph: {
        alignItems: 'center'
    },
    graphCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: 290,
        resizeMode: 'stretch',
        padding: 10,
        marginBottom: 10
    },
    graphLabel: {
        fontSize: 8,
        color: '#9FA2A7',
        fontWeight: '300',
        marginBottom: 12,
        width: 230,
        marginLeft: 20,
        marginRight: 20,
        overflow: 'hidden',
        textAlign: "center"
    },

    graphBalance: {
        fontSize: 36,
        color: '#FFF',
        fontWeight: 'bold'

    },

    dotIcon: {
        alignItems: 'center',
        marginTop: 25
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
    }

});

export default AccountStyle;
