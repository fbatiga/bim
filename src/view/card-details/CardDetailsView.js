'use strict';
import React, { Component } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardStyle from '../card/CardStyle';
import asset from '../../asset';

class CardDetailsView extends Component {
	render(){
		return (
			<View style={CardStyle.cardDetails}>
        <ScrollView>
          <View style={CardStyle.cardLayout}>
            <View style={CardStyle.cardLayoutHeader}>
              <View style={CardStyle.cardLayoutLeft}>
                <TouchableOpacity onPess={() => { Actions.pop(); }}>
                  <Image source={asset.arrowBackRed} style={CardStyle.pictoBack}/>
                </TouchableOpacity>
              </View>
              <View style={CardStyle.cardLayoutCenter}>
                <Image source={asset.bimWhite} style={CardStyle.pictoBim}/>
              </View>
              <View style={CardStyle.cardLayoutRight} />
            </View>
            <View style={CardStyle.cardPicto}>
              <Image source={asset.pastequePicto} style={CardStyle.pictoCard}/>
            </View>
            <View style={CardStyle.cardNumber}>
              <Text style={CardStyle.textNumber}>4974</Text>
              <Text style={CardStyle.textNumber}>9066</Text>
              <Text style={CardStyle.textNumber}>2819</Text>
              <Text style={CardStyle.textNumber}>3332</Text>
            </View>
            <View style={CardStyle.cardInfos}>
              <View style={CardStyle.cardInfosLeft}>
                <Text style={CardStyle.cardText}>Pierre Delbosse</Text>
                <Text style={CardStyle.cardText}>EXPIRE FIN 01/19</Text>
              </View>
              <View style={CardStyle.cardInfosRight}>
                <Text style={CardStyle.cardText}>CCV</Text>
                <Text style={CardStyle.cardText}>468</Text>
              </View>
            </View>
          </View>
          <View style={CardStyle.cardOptions}>
            <View style={CardStyle.lines}>
              <Text style={CardStyle.lineLeft}>Vérouiller ma carte</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                <Image source={asset.lockOpen} style={CardStyle.pictoLock}/>
              </View>
            </View>
            <View style={CardStyle.lines}>
              <Text style={CardStyle.lineLeft}>Changer mon code</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                <Image source={asset.arrowRight} style={CardStyle.pictoArrow}/>
              </View>
            </View>
            <View style={CardStyle.lines}>
              <Text style={CardStyle.lineLeft}>Gérer mes plafonds</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                <Image source={asset.arrowRight} style={CardStyle.pictoArrow}/>
              </View>
            </View>
            <View style={CardStyle.lines}>
              <Text style={CardStyle.lineLeft}>Recevoir cette carte pour 10€</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                <Image source={asset.arrowRight} style={CardStyle.pictoArrow}/>
              </View>
            </View>
            <View style={CardStyle.lines}>
              <Text style={CardStyle.lineLeft}>Payer à l'étranger</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                <Image source={asset.switchOn} style={CardStyle.pictoSwitch}/>
              </View>
            </View>
            <View style={CardStyle.lines}>
              <Text style={CardStyle.lineLeft}>Payement sur internet</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                <Image source={asset.switchOff} style={CardStyle.pictoSwitch}/>
              </View>
            </View>
            <View style={CardStyle.lines}>
              <Text style={CardStyle.lineLeft}>Retrait au distributeur</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                <Image source={asset.switchOn} style={CardStyle.pictoSwitch}/>
              </View>
            </View>
          </View>
        </ScrollView>
			</View>
		);
	}
}

export default CardDetailsView;
