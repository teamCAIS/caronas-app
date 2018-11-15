import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Card, CardItem, Body, Text, Right } from 'native-base';
import CardCarona from '../components/CardCarona';
import { mostraFeed } from '../services/ApiService';

export default class PassageiroHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { corridas: [], caronaAtual: null, avaliar: false }
  }

  async componentDidMount() {

    const token = await AsyncStorage.getItem('userToken');
    const res = await mostraFeed(token,{filtroGenero: 3, filtroSaida: '', filtroHora: ''});

    let avaliar = false;
    let caronaAtual = null;

    if(res[0].avaliar) {
      res.shift();
      avaliar = true;
    }

    if(res[0].atual) 
      caronaAtual = res.shift();

    if(res != 'Falha na conexão')
      this.setState({token, corridas: res, caronaAtual, avaliar});
    else
      alert('Houve um problema com a conexão');
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Caronas disponíveis',
      headerTitle: 'Caronas disponíveis',
      headerLeft: (
        <MaterialIcons
          style={{marginLeft: 12}}
          name="menu"
          size={32}
          onPress={() => navigation.openDrawer()}
          color="#000"
        />
      ),
    }
  }

  render() {
    return (
      
        <Content style={{padding:8}}>

          {this.state.corridas.map((corrida, i) => (
            <TouchableHighlight key={i} underlayColor='#eee9' onPress={() => this.props.navigation.navigate('Details', {corrida})}>
              <CardCarona 
                corrida={corrida}
              />
            </TouchableHighlight>
          ))}
 
        </Content>
      
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