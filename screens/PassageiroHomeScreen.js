import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Card, CardItem, Body, Text, Right, Button } from 'native-base';
import CardCarona from '../components/CardCarona';
import { mostraFeed } from '../services/ApiService';
import { NavigationEvents } from 'react-navigation';
import Modal from "react-native-modal";

export default class PassageiroHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { corridas: [], caronaAtual: null, avaliacao: {avaliar:false}, token: '', nota: 0 }
  }

  /* 
  avaliar: true
  data_hora: "2018-11-15 19:30:00"
  id: 12
  nome: "eu"
   */


  async componentDidMount() {
    
    const token = await AsyncStorage.getItem('userToken');
    const res = await mostraFeed(token,{filtroGenero: 3, filtroSaida: '', filtroHora: ''});

    let avaliacao = false;
    let caronaAtual = null;

    if(res[0].avaliar) {
      avaliacao = res.shift();
      if(!res.length) {
        this.setState({token, avaliacao});
        return;
      }
        
    }

    if(res[0].atual) {
      caronaAtual = res.shift();
      if(!res.length) {
        this.setState({token, caronaAtual, avaliacao});
        return;
      }
    }
      
    if(res != 'Falha na conexão')
      this.setState({token, corridas: res, caronaAtual, avaliacao});
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
          color="#fff"
        />),
      headerStyle: {backgroundColor: '#263238', height:57.5},
	  headerTintColor: '#fff',
    }
  }

  render() {

    let caronaAtualComponent = null;
    if(this.state.caronaAtual)
      caronaAtualComponent = (
        <View>
          <Text style={{textAlign:"center",fontSize:14,fontWeight:'bold',marginBottom:2}}>Carona atual</Text>
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
          <Text style={{textAlign:"center",fontSize:14,fontWeight:'bold',marginBottom:2,marginTop:2}}>Caronas disponíveis</Text>
        </View>
      );

    return (
      
        <Content style={{paddingLeft:8,paddingRight:8,paddingTop:18,paddingBottom:18}}>
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

          <Modal
            isVisible={this.state.avaliacao.avaliar}
            onBackdropPress={() => this._skipAvaliacao()}
            
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Deseja avaliar a carona?</Text>
              <Text style={styles.modalItem}>Você recebeu, recentemente, uma carona de <Text style={styles.modalMotorista}>{this.state.avaliacao.nome}</Text>.</Text>
              <Text style={styles.modalItem}>Que tal dar uma nota ao motorista que te ajudou? </Text>
              <View style={[styles.starsContainer, styles.modalItem]}>
                {this._createStars()}
              </View>
			  <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
				  <Button style={{borderColor:'#000',width:140,height:40,marginRight:5,marginTop:8}} bordered onPress={() => this.props.excluiCarona()}>
					  <Text uppercase={false} style={{color:'black',width:150,marginLeft:-3,height:27,fontSize:18}}>Não, obrigado</Text>
				  </Button>
				  <Button style={[{alignSelf:'center',width:140,height:40,backgroundColor:'#ffca28',color:'#000',elevation:0}, styles.modalItem]} onPress={() => this._avaliaCorrida()}>
					<Text uppercase={false} style={{color:'black',fontWeight:'bold',textAlign:'center',width:137,height:27,fontSize:18}}>
					  Avaliar
					</Text>
				  </Button>
			  </View>
            </View>
          </Modal>
 
        </Content>
      
    );
  }

  _createStars = () => {
    let stars = []
    let estrelasCompletas = this.state.nota;
    for(let i = 1; i <= 5; i++) {
      stars.push((
        <MaterialIcons
          key={i}
          size={38}
          color={(estrelasCompletas > 0) ? '#ffca28' : '#263238'}
          name={(estrelasCompletas > 0) ? 'star' : 'star-border'}
          onPress={() => {this.setState({nota:i})}}
        />
      ));
      estrelasCompletas--;
    }
    return stars;
  }

  _verificaCaronaAtual = () => {
    const caronaAtual = this.props.navigation.getParam('caronaAtual', false);
    if(caronaAtual !== false)
      this.setState({ caronaAtual });
  }

  _avaliaCorrida = () => {
    //avaliacao passando:
    //avaliacao.id como id_corrida
    //status_nota: 1
    //nota de 1 a 5 (ver quantas estrelas estao selecionadas)
    this.setState({ avaliacao:{avaliar: false} });
  }

  _skipAvaliacao = () => {
    //avaliacao passando:
    //avaliacao.id como id_corrida
    //status_nota: 2
    //nota: ''
    this.setState({ avaliacao:{avaliar: false} });
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
  modalContent: {
    height:270,
    backgroundColor:'#fff',
    padding:16,
    borderRadius: 5,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  modalMotorista: {
    fontWeight: "bold",
  },
  modalItem: {
    marginTop:8,
  },
  starsContainer: {
    flexDirection:'row',
    alignSelf:'stretch',
    justifyContent:'space-between',
    margin:12,
  }
});