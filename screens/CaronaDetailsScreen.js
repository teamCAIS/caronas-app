import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CaronaInfo from '../components/CaronaInfo';
import { Button, Text, Container } from 'native-base';
import { entraCorrida, sairCorrida } from '../services/ApiService';

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
	  headerStyle: {backgroundColor: '#263238', height:57.5},
	  headerTintColor: '#fff',
    }
  }

  render() {

    let ButtonComponent = (
      <Button style={styles.button} onPress={() => this._entrarCarona()}>
        <Text uppercase={false} style={{color:'black',fontWeight:'bold',textAlign:'center',width:155,height:27,fontSize:18}}>Aceitar</Text>
      </Button>
    );

    if(this.props.navigation.getParam('atual', ''))
      ButtonComponent = (
        <Button style={styles.button} onPress={() => this._desistirCarona()}>
          <Text uppercase={false} style={{color:'black',fontWeight:'bold',textAlign:'center',width:157,height:27,fontSize:18}}>Sair da carona</Text>
        </Button>
      );

    return (
      <Container style={{backgroundColor:'#f5f5f6'}}>
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
  _desistirCarona = async () => {
    const result = await sairCorrida(this.state.token);
    if(result == 'success')
      this.props.navigation.navigate('PassageiroHome', { caronaAtual: null });
    else
      alert(result);
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    marginTop: 5,
	backgroundColor:'#ffca28',
	width:158,
	height:40,
	elevation:0,
  }
});