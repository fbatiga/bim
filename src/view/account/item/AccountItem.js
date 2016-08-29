import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import baseStyles from '../../../styles/vars.js';
import moment from 'moment';

const styles = StyleSheet.create({
  date: {
    color: '#BDC4C8',
    fontSize: 22
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    margin: 0,
    borderColor: '#E3E4E3',
    borderBottomWidth: 1,
    paddingTop: 30,
    paddingBottom: 30,
    marginLeft: 10,
    marginRight: 40,
    backgroundColor: '#fff'
  },
  leftPart: {
    flex: 1,
  },
  rightPart: {
    flexDirection: 'row'
  },
  timestamp: {
    color: '#BDC4C8',
    fontSize: 8
  },
  category: {
    color: '#BDC4C8',
    fontSize: 8,
    marginTop: 3
  },
  label: {
    color: '#4F4367',
    fontSize: 14
  },
  amount: {
    color: baseStyles.colors.deepBlue,
    fontSize: 15
  }
});

export default class AccountItem extends React.Component {
  render() {
    return (
      <TouchableHighlight>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ paddingTop: 25 }}>
            <Text style={styles.date}>{moment(this.props.rowData.timestamp).format('D')}</Text>
          </View>
          <View style={styles.button}>
            <View style={styles.leftPart}>
              <Text style={styles.label}>
                {this.props.rowData.label}
              </Text>
              <Text style={styles.category}>
                {this.props.rowData.category.label}
              </Text>
            </View>
            <View style={styles.rightPart}>
              <Text style={styles.amount}>
              {(this.props.rowData.type === 'debit' ? '-' :'')  +   this.props.rowData.amount}
              </Text>
              <Text style={styles.amount}> €</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

AccountItem.propTypes = {
  text: React.PropTypes.string
  //onPress : React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    account: state.account
  };
}
