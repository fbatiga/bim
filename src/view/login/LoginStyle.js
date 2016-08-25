import {StyleSheet} from 'react-native';

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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

export default LoginStyle;
