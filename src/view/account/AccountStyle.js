import {StyleSheet} from 'react-native';
import baseStyles from '../../styles/vars';


console.log(baseStyles);
const AccountStyle = StyleSheet.create({
    container: {},
    top: {
        height: 420,
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
        height: 240,
        resizeMode: 'stretch',
        padding: 10,
        marginBottom: 10
    },
    graphLabel: {
        fontSize: 8,
        color: '#9FA2A7',
        fontWeight: '300',
        marginBottom: 12,
        width: 180,
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
        marginTop: 10
    },
    transferButton: { 'position': 'absolute', top: 420, right: 10, borderRadius:100, padding:0, zIndex:100 },

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
