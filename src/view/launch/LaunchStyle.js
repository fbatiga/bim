import {StyleSheet} from 'react-native';

const LaunchStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null
    },
    loading : {
    	backgroundColor : 'transparent',
        color: '#FFFFFF'
    },
    background : {
        flex: 1,
	    flexDirection: "column",
	    justifyContent: "flex-start",
	    alignItems: "stretch"
    },
    bottom : {
		flex: 3,
	    flexDirection: "column",
	    justifyContent: "flex-start",
        alignItems: 'center',
	},
	top: {
		flex: 4,
	    flexDirection: "column",
	    justifyContent: "flex-end",
	    alignItems: "center"
	}
});

export default LaunchStyle;
