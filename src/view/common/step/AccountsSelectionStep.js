import React, { Component, PropTypes } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../../common/title/Title';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';

const { width, height } = Dimensions.get('window');
const boxMargin = 10;
const boxPreview = 25;
const boxSize = width - (boxMargin + boxPreview ) * 2;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		backgroundColor: AppGuideline.colors.deepBlue,
		height: height / 2
	},
	topContent: {
		justifyContent: 'center',
		flex: 1
	},
	bottom: {
    flex: 1,
		backgroundColor: AppGuideline.colors.white
	},
	text: {
		color: AppGuideline.colors.alternative,
		marginTop: 10,
		fontSize: 35,
		marginLeft: 50
	},
	lines: {
		borderBottomWidth: 1,
		borderBottomColor: AppGuideline.colors.lightGrey,
		flexDirection: 'row',
		paddingHorizontal: 25,
    paddingVertical: 45,
		alignItems: 'center'
	},
	linkText: {
		color: AppGuideline.colors.deepBlue,
		flex: 1
	},
	amount: {
		color: AppGuideline.colors.deepBlue
	}
});

class AccountsSelectionStep extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.top}>
					<BackButton image={asset.back_green} back={this.props.back} />
					<Title>{this.props.title}</Title>
					<View style={styles.topContent}>
						<Text style={styles.text}>
							{this.props.subtitle || 'Compte à débiter :' }
						</Text>
					</View>
				</View>

				<ScrollView style={styles.bottom}>
          {
            this.props.accounts.map((account) => {
              return (
                <TouchableOpacity key={account.id} onPress={()=> {
      						this.props.confirm(account.label);
      					}}>
      						<View style={styles.lines}>
      							<Text style={styles.linkText}>{account.label}</Text>
      							<Text style={styles.amount}>{`${account.balance} €`}</Text>
      						</View>
      					</TouchableOpacity>
              );
            })
          }
				</ScrollView>
			</View>
		);
	}
}

AccountsSelectionStep.propTypes = {
	title: PropTypes.string,
  subtitle: PropTypes.string,
  back: PropTypes.func,
  confirm: PropTypes.func,
  accounts: PropTypes.array
};

export default AccountsSelectionStep;
