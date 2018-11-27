import React from 'react';
import { StyleSheet, View, AsyncStorage, RefreshControl, TouchableNativeFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Text, Container, Spinner,Content } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { getCorridaAtual, concluirCorrida, cancelarCorrida } from '../services/ApiService'
import CaronaAtualMotorista from '../components/CaronaAtualMotorista';
import Modal from 'react-native-modal';
import ModalConfirmacao from '../components/ModalConfirmacao';

export default class MotoristaHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      token: '', 
      corrida: null, 
      loading: true, 
      refreshing:false, 
      modalVisibility:false,
      concluindoCarona: false,
      cancelandoCarona: false,
    }
  }
  _onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount().then(() => {
		  this.setState({refreshing: false});
		});
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

    if(!this.state.corrida)
      return (
        
        <Content refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>} contentContainerStyle={styles.container}>
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
        </Content>
      
      );
    
      return (
        <Content style={{backgroundColor:'#f5f5f6'}} refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
          <CaronaAtualMotorista 
            corrida={this.state.corrida} 
            excluiCarona={() => this.setState({cancelandoCarona:true})} 
            concluiCarona={() => this.setState({concluindoCarona:true})}
            editarCarona={() => {this.props.navigation.navigate('EditarCarona')}}
          />

          <Modal
            isVisible={this.state.modalVisibility}
          >
            <View style={styles.modalContent}>
              <Text>Você publicou uma carona com sucesso!</Text>
              <Text>Você pode encerrar a carona após ter deixado os passageiros</Text>
              <Button onPress={() => this.setState({modalVisibility:false})}
                style={{backgroundColor:'#ffca28'}}
              >
                <Text>Ok</Text>
              </Button>
            </View>
          </Modal>

          <ModalConfirmacao
            visibility={this.state.cancelandoCarona}
            confirm={this._excluiCarona}
            dismiss={() => this.setState({cancelandoCarona:false})}
          >
            Você deseja realmente cancelar essa carona?
          </ModalConfirmacao>

          <ModalConfirmacao
            visibility={this.state.concluindoCarona}
            confirm={this._concluiCarona}
            dismiss={() => this.setState({concluindoCarona:false})}
          >
            Você deixou seus passageiros e já vai encerrar a carona?
          </ModalConfirmacao>
          
        </Content>
      );
	
  }

  _verificaCarona = () => {
    const novaCarona = this.props.navigation.getParam('novaCarona', this.state.corrida);
    if(novaCarona)
      this.setState({ modalVisibility:true, loading:true });
    this._onRefresh();
    
  }

  _excluiCarona = async () => {
    const result = await cancelarCorrida(this.state.token);
    if(result.status == 'success')
      this.setState({corrida: null,cancelandoCarona:false});
    else
      alert('Não foi possível excluir a corrida');
  }

  _concluiCarona = async () => {
    const result = await concluirCorrida(this.state.token);
    if(result.status == 'success')
      this.setState({corrida: null, concluindoCarona:false});
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
  modalContent: {
    height:270,
    backgroundColor:'#fff',
    padding:16,
    borderRadius: 5,
  },
});