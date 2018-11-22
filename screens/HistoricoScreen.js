import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableHighlight,TouchableNativeFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Card, CardItem, Body, Text, Right, Button, Spinner } from 'native-base';
import CardCarona from '../components/CardCarona';
import { getHistoricoMotorista, getHistoricoPassageiro } from '../services/ApiService'
import { createStackNavigator } from 'react-navigation';
import CaronaDetailsScreen from '../screens/CaronaDetailsScreen';

class HistoricoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {lista: [], token:'', loading: true};
  }

  async componentDidMount() {
    
    const token = await AsyncStorage.getItem('userToken');
    const usuarioString = await AsyncStorage.getItem('user');
    const usuario = JSON.parse(usuarioString);
    const tipo = usuario.tipo;
    let res;
    if(tipo == 1) {
      res = await getHistoricoPassageiro(token);
    }
    if(tipo == 2)
      res = await getHistoricoMotorista(token);

        
    if(res != 'Falha na conexão')
      this.setState({token, lista: res, loading:false});
    else {
      this.setState({token, loading:false});
      alert('Houve um problema com a conexão');
    }
      
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: 'HIstórico',
      headerTitle: 'Histórico',
      headerLeft: (
        <TouchableNativeFeedback onPress={() => navigation.openDrawer()}>
          <View style={{padding:12}}>
            <MaterialIcons
              name="menu"
              size={32}
              color="#fff"
            />
          </View>
        </TouchableNativeFeedback>
      ),
      headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
      headerTintColor: '#fff'
    }
  }

  render() {

    if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

    return (
      <Content>
        {this.state.lista.map((corrida, i) => (
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
}

const styles = StyleSheet.create({
  
});

export default HistoricoNav = createStackNavigator({
  Historico: HistoricoScreen,
  Details: CaronaDetailsScreen,
})