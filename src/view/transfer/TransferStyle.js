import {Dimensions, StyleSheet} from 'react-native';
import baseStyles from '../../asset/styles.js';


var width = Dimensions.get('window').width;

const TransferStyle = StyleSheet.create({
	container: {
        backgroundColor: baseStyles.colors.deepBlue
	},
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: baseStyles.colors.deepBlue,
        height: 400
    },
	bottom : {
        backgroundColor:"white",
        height: 400,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',

	},
    keyboardButton: {
        padding: 20,
        width: width * 0.33,
        textAlign:'center'
    }
});

export default TransferStyle;
