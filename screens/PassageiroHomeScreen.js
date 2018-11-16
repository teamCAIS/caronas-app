import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Card, CardItem, Body, Text, Right } from 'native-base';
import CardCarona from '../components/CardCarona';
import { mostraFeed } from '../services/ApiService';
import { NavigationEvents } from 'react-navigation';

export default class PassageiroHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { corridas: [], caronaAtual: null, avaliar: false, token: '' }
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

    let caronaAtualComponent = null;
    if(this.state.caronaAtual)
      caronaAtualComponent = (
        <View>
          <Text style={{textAlign:"center"}}>Carona Atual</Text>
          <TouchableHighlight
            underlayColor='#eee9' 
            onPress={() => 
              this.props.navigation.navigate('Details', {corrida: this.state.caronaAtual, 
                token: this.state.token,
                atual: 'atual'
              })
            }
          >
            <CardCarona 
              corrida={this.state.caronaAtual}
            />
          </TouchableHighlight>
          <Text style={{textAlign:"center"}}>Caronas Disponíveis</Text>
        </View>
      );

    return (
      
        <Content style={{padding:8}}>
          <NavigationEvents 
            onWillFocus={payload => this._verificaCaronaAtual()}
          />

          {caronaAtualComponent}

          {this.state.corridas.map((corrida, i) => (
            <TouchableHighlight 
              key={i} 
              underlayColor='#eee9' 
              onPress={() => this.props.navigation.navigate('Details', {corrida, token: this.state.token})}
            >
              <CardCarona 
                corrida={corrida}
              />
            </TouchableHighlight>
          ))}
 
        </Content>
      
    );
  }

  _verificaCaronaAtual = () => {
    const caronaAtual = this.props.navigation.getParam('caronaAtual', false);
    if(caronaAtual !== false)
      this.setState({ caronaAtual });
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