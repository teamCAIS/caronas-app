import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, CardItem, Body, Text, Right } from 'native-base';

export default class CardCarona extends React.Component {

  render() {
    return (
          <Card style={{top:18}}>
            <CardItem>
              <Body>
				<View style={{flexDirection:'row'}}>
					<MaterialIcons name="person"  size={24} style={{marginTop:5}} color="#000"  />
					<View style={{marginLeft:5}}>
						<Text style={[styles.label, {marginTop:0}]}>Motorista:</Text>
						<Text style={styles.listItem} >{this.props.corrida.nome}</Text>
					</View>
				</View>
				<View style={{flexDirection:'row'}}>
					<MaterialIcons name="room"  size={24} style={{marginTop:12}} color="#000"  />
					<View style={{marginLeft:5}}>
						<Text style={styles.label}>Destino:</Text>
						<Text style={styles.listItem} >{this.props.corrida.saida}</Text>
					</View>
				</View>
				<View style={{flexDirection:'row'}}>
					<MaterialIcons name="query-builder"  size={24} style={{marginTop:12}}  color="#000"  />
					<View style={{marginLeft:5}}>
						<Text style={styles.label}>Horário:</Text>
						<Text style={styles.listItem} >{this.props.corrida.hora.substring(0,5)}</Text>
					</View>
				</View>
              </Body>
              <Right>
                <View style={styles.fotoMotoristaContainer}>
                  <Image
                      style={ styles.fotoMotorista }
                      source={this.props.corrida.url_foto ? {uri: this.props.corrida.url_foto} : require('../assets/motorista.png')}
                  />
                  {this._showNota()}
                  
                </View>
              </Right>
            </CardItem>
          </Card>
    );
  }
  _showNota = () => {
    if(this.props.corrida.nota > 0)
    return (
      <View style={{flexDirection:"row", alignItems:"center",marginTop:5}}>
        <Text>{this.props.corrida.nota}</Text><MaterialIcons size={18} name="star" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fotoMotorista: {
    height: 90, 
    width: 90,
    borderRadius: 45,
    backgroundColor: '#222',
  },
  fotoMotoristaContainer: {
      alignItems: "center",
  },
  listItem: {
    marginTop: -4,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
  },
});