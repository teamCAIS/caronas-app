import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Text, Container } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { getCorridaAtual } from '../services/ApiService'
import CaronaAtualMotorista from '../components/CaronaAtualMotorista';

export default class MotoristaHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { token: '', corrida: {} }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    

    //chamar função que verifica se já tem carona
    const corridaArray = await getCorridaAtual(token);
    const corrida = corridaArray[0];

    if(corrida) {
      this.setState({ token, corrida });
    }
    else
      this.setState({token});

  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Início',
      headerTitle: 'Sua carona',
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

    if(!this.state.corrida)
      return (
        
        <Container style={styles.container}>
          <NavigationEvents 
            onWillFocus={payload => this._verificaCarona()}
          />
          <Text>Você ainda não criou uma carona</Text>
          <Button
            onPress={() => {this.props.navigation.navigate('AdicionarCarona')}}
            style={{alignSelf: "center", marginTop: 24}}
            title="Criar uma carona"
          >
          <Text>Criar uma carona</Text>
          </Button>
        </Container>
      
      );
    
      return (

        <CaronaAtualMotorista corrida={this.state.corrida} />

      );

  }

  _verificaCarona = () => {
    const novaCarona = this.props.navigation.getParam('novaCarona', false);
    if(novaCarona)
      this.setState({ corrida: novaCarona });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});