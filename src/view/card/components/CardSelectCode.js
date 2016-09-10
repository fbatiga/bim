import React from 'react';

import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../../styles/vars';
import Title from '../../../component/Title';
import asset from '../../../app/AppAsset';
import BackButton from '../../../component/BackButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: baseStyles.colors.deepBlue
	},
	top: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: baseStyles.colors.deepBlue
	},
	bottom: {
		backgroundColor: "white",
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row',
	},
	keyboardButton: {
		padding: 20,
		width: width * 0.33,
		textAlign: 'center',
		fontSize: 22
	}
});

export default
class AmountSelectionView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {amount: this.props.amount};
	}

	render() {
		return (
			<View style={styles.container}>
			<BackButton image={asset.back_green} back={this.props.back} />
			<Title>{this.props.title}</Title>
			<View style={styles.top}>
			<Text style={{
				color: baseStyles.colors.alternative,
				marginTop: 10,
				fontSize: 30,
				marginBottom: 25
			}}>
			{this.props.subtitle || 'B!MMER LA SOMME DE' }
			</Text>
			<View style={{ flexDirection: 'row' }}>
			<View style={{ borderBottomColor: baseStyles.colors.lightviolet, borderBottomWidth: 1, marginRight: 15 }}>
			<Text
			ref="amountInput"
			style={{
				color: 'white',
				textAlign: 'center',
				fontSize: 40,
				width: 30
			}}
			>
			{
				this.state.amount[0] || ' '
			}
			</Text>
			</View>
			<View style={{ borderBottomColor: baseStyles.colors.lightviolet, borderBottomWidth: 1, marginRight: 15 }}>
			<Text
			ref="amountInput"
			style={{
				color: 'white',
				textAlign: 'center',
				fontSize: 40,
				width: 30
			}}
			>
			{
				this.state.amount[1] || ' '
			}
			</Text>
			</View>
			<View style={{ borderBottomColor: baseStyles.colors.lightviolet, borderBottomWidth: 1, marginRight: 15 }}>
			<Text
			ref="amountInput"
			style={{
				color: 'white',
				textAlign: 'center',
				fontSize: 40,
				width: 30
			}}
			>
			{
				this.state.amount[2] || ' '
			}
			</Text>
			</View>
			<View style={{ borderBottomColor: baseStyles.colors.lightviolet, borderBottomWidth: 1 }}>
			<Text
			ref="amountInput"
			style={{
				color: 'white',
				textAlign: 'center',
				fontSize: 40,
				width: 30
			}}
			>
			{
				this.state.amount[3] || ' '
			}
			</Text>
			</View>
			</View>
			</View>
			<TouchableOpacity style={{
                    // flex: 1,
                    backgroundColor: baseStyles.colors.lightviolet,
                    padding: 15,
                    height: 70
                }}
                onPress={()=> {
                	console.log(this.state.amount.length);
                	if (this.state.amount.length === 4) {
                		this.props.confirm(this.state.amount)
                	}
                }}
                >
                <Text style={{padding: 10, textAlign: 'center', color: '#fff' }}>CONFIRMER</Text>
                </TouchableOpacity>
                <View style={styles.bottom}>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, key) => {
                	return (<TouchableOpacity style={{}} key={key} onPress={()=> {
                		this.parseInput(value)
                	}}>
                	<Text style={styles.keyboardButton} onPress={()=> {
                		this.parseInput(value)
                	}} >{value}</Text>
                	</TouchableOpacity>);
                })
            }
            <TouchableOpacity style={{}} onPress={()=> {
                        // this.parseInput(',')
                    }} >
                    <Text style={styles.keyboardButton} >,</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}}  onPress={()=> {
                    	this.parseInput('0')
                    }} >
                    <Text style={styles.keyboardButton} >0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.keyboardButton,{alignItems:'center'}]} onPress={()=> {
                    	this.parseInput('<')
                    }}>
                    <Image source={asset.keyboard['effacer']} style={{resizeMode: 'contain', width: 20}} />
                    </TouchableOpacity>
                    </View>
                    </View>
                    );
	}


	parseInput(input) {
		console.log(this.state.amount, input);
		console.log(this.state.amount[0]);
		console.log(this.state.amount[1]);
		console.log(this.state.amount[2]);
		console.log(this.state.amount[3]);
		var ln = this.state.amount.length;
		var append = '';
		switch (input) {
			case '<':
			console.log(this.amount, this.state.amount.substr(0, this.state.amount.length - 2));
			if (ln > 0) {
				append = this.state.amount.substr(0, this.state.amount.length - 1);
				this.setState({amount: append});
				append = undefined;
			}
			break;
			default:
			if (ln < 4) {
				append = input + "";
			}
		}

		if (append) {
			this.setState({amount: this.state.amount + append});
		}

	}

}

AmountSelectionView.propTypes = {
	title: React.PropTypes.string
};
