import {Dimensions, StyleSheet} from 'react-native';
import baseStyles from '../../asset/styles.js';


var width = Dimensions.get('window').width;
const width = Dimensions.get('window').width;

const TransferStyle = StyleSheet.create({
	container: {
        backgroundColor: baseStyles.colors.deepBlue
	},
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: baseStyles.colors.deepBlue,

    },
	bottom : {
        backgroundColor:"white",
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row'

	},
});

export default TransferStyle;
