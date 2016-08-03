import {StyleSheet} from 'react-native';
import baseStyles from '../../asset/styles.js';


const AccountStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'

    },
    top: {
        flex: 3,
        justifyContent: 'flex-start',
        flexDirection: "column",
        alignItems: 'stretch',
        backgroundColor: baseStyles.colors.deepBlue,
        paddingTop: 15
    },
    bottom : {
        flex: 5,
        justifyContent: 'flex-start',
        flexDirection: "column",
        alignItems: 'stretch',
	},
    graph: {
        flex: 1,
        height: 200,
        alignItems: 'center'
    }
});

export default AccountStyle;
