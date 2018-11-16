import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CaronaInfo from '../components/CaronaInfo';
import { Button, Text, Container } from 'native-base';
import { entraCorrida } from '../services/ApiService';

export default class CaronaDetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    const corrida = this.props.navigation.getParam('corrida');
    const token = this.props.navigation.getParam('token');
    this.state = {token, corrida}
  }

  static navigationOptions = ({ navigation }) => {
    const atual = navigation.getParam('atual', '')
    return {
      title: `Detalhes da carona ${atual}`,
      headerTitle: `Detalhes da carona ${atual}`,
    }
  }

  render() {

    let ButtonComponent = (
      <Button style={styles.button} onPress={() => this._entrarCarona()}>
        <Text>Aceitar</Text>
      </Button>
    );

    if(this.props.navigation.getParam('atual', ''))
      ButtonComponent = (
        <Button style={styles.button} onPress={() => this._desistirCarona()}>
          <Text>Desistir da carona</Text>
        </Button>
      );

    return (
      <Container>
        <CaronaInfo corrida={this.state.corrida}/>
        {ButtonComponent}
      </Container>
      
    );
  }
  _entrarCarona = async () => {
    const id_corrida = this.state.corrida.id;
    const result = await entraCorrida(this.state.token, {id_corrida});
    if(result == "success")
      this.props.navigation.navigate('PassageiroHome', { caronaAtual: this.state.corrida });
    else
      alert(result);
  }
  _desistirCarona = () => {
    this.props.navigation.navigate('PassageiroHome', { caronaAtual: null });
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    marginTop: 16,
  }
});