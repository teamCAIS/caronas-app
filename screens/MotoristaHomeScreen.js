import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Text, Container, Spinner } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { getCorridaAtual, concluirCorrida } from '../services/ApiService'
import CaronaAtualMotorista from '../components/CaronaAtualMotorista';

export default class MotoristaHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { token: '', corrida: null, loading: true }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    

    //chamar função que verifica se já tem carona
    const res = await getCorridaAtual(token);
    const corrida = res[0];

    if(res != 'Falha na conexão') {
      this.setState({ token, corrida, loading: false });
    }
    else
      this.setState({token, loading: false});

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
          color="#fff"
        />
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

    if(!this.state.corrida)
      return (
        
        <Container style={styles.container}>
          <NavigationEvents 
            onWillFocus={payload => this._verificaCarona()}
          />
          <Text>Você ainda não criou uma carona</Text>
          <Button
            onPress={() => {this.props.navigation.navigate('AdicionarCarona')}}
            style={{alignSelf: "center", marginTop: 24,backgroundColor:'#ffca28',width:170,height:40,elevation:0}}
            title="Criar uma carona"
          >
          <Text style={{color:'black',fontWeight:'bold'}}>Criar uma carona</Text>
          </Button>
        </Container>
      
      );
    
      return (

        <CaronaAtualMotorista 
          corrida={this.state.corrida} 
          excluiCarona={() => this._excluiCarona()} 
          concluiCarona={() => this._concluiCarona()}
        />

      );
	
  }

  _verificaCarona = () => {
    const novaCarona = this.props.navigation.getParam('novaCarona', this.state.corrida);    
    this.setState({ corrida: novaCarona });
  }

  _excluiCarona = () => {
    this.setState({corrida: null});
  }

  _concluiCarona = async () => {
    const result = await concluirCorrida(this.state.token);
    if(result.status == 'success')
      this.setState({corrida: null});
    else
      alert('Não foi possível concluir a corrida');
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
	padding:0,
	flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
});