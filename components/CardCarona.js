import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, CardItem, Body, Text, Right } from 'native-base';

export default class CardCarona extends React.Component {

  render() {
    return (
          <Card>
            <CardItem>
              <Body>
                <Text style={[styles.label, {marginTop:0}]}>Motorista:</Text>
                <Text style={styles.listItem} >{this.props.corrida.nome}</Text>
                <Text style={styles.label}>Destino:</Text>
                <Text style={styles.listItem} >{this.props.corrida.saida}</Text>
                <Text style={styles.label}>Horário:</Text>
                <Text style={styles.listItem} >{this.props.corrida.hora}</Text>
              </Body>
              <Right>
                <View style={styles.fotoMotoristaContainer}>
                  <Image
                      style={ styles.fotoMotorista }
                      source={{
                          uri: this.props.url_foto
                      }}
                  />
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                      <Text>{this.props.corrida.nota}</Text><MaterialIcons size={24} name="star" />
                  </View>
                </View>
              </Right>
            </CardItem>
          </Card>
    );
  }
}

const styles = StyleSheet.create({
  fotoMotorista: {
    height: 80, 
    width: 80,
    borderRadius: 40,
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