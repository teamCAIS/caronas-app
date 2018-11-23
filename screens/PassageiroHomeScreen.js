import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableHighlight,RefreshControl, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Card, CardItem, Body, Text, Right, Button, Spinner } from 'native-base';
import CardCarona from '../components/CardCarona';
import { mostraFeed, avaliaCorrida } from '../services/ApiService';
import { NavigationEvents } from 'react-navigation';
import Modal from "react-native-modal";
import Filtro from '../components/Filtro';

export default class PassageiroHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { corridas: [],
      caronaAtual: null, 
      avaliacao: {avaliar:false}, 
      token: '', 
      nota: 0, 
      loading: true, 
      refreshing:false,
      filterVisibility: false,
    }
  }
  async componentDidMount() {

    //this.props.navigation.setParams({abreFiltro: this._openFilter});
    
    const token = await AsyncStorage.getItem('userToken');
    const res = await mostraFeed(token,{filtroGenero: 3, filtroSaida: '', filtroHora: ''});

    let avaliacao = false;
    let caronaAtual = null;
    if(res.length) {
      if(res[0].avaliar) {
        avaliacao = res.shift();
        if(!res.length) {
          this.setState({token, avaliacao, loading:false});
          return;
        }
          
      }
  
      if(res[0].atual) {
        caronaAtual = res.shift();
        if(!res.length) {
          this.setState({token, caronaAtual, avaliacao, loading:false});
          return;
        }
      }
        
      if(res != 'Falha na conexão')
        this.setState({token, corridas: res, caronaAtual, avaliacao, loading:false});
      else {
        this.setState({token, loading:false});
        alert('Houve um problema com a conexão');
      }
    }
    this.setState({loading:false});
      
  }
  
	 _onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount().then(() => {
		  this.setState({refreshing: false});
		});
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
      headerRight: (
        <MaterialIcons
          style={{marginRight: 12}}
          name="filter-list"
          size={32}
          onPress={navigation.getParam('abreFiltro')}
          color="#fff"
        />),
      headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
	    headerTintColor: '#fff',
    }
  }

  render() {

    if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

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
        <Content refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>} style={{marginRight:8,marginLeft:8,marginTop:18,marginBottom:18}} >
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
              <Button style={{borderColor:'#000',width:140,height:40,marginRight:5,marginTop:8}} bordered onPress={() => this._skipAvaliacao()}>
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
/*
<Modal
isVisible={this.state.filterVisibility}
onBackdropPress={() => this._closeFilter()}
animationIn="slideInRight"
animationOut="slideOutRight"
>
<View style={styles.filterContent}>

  <Filtro />
  
</View>

</Modal>
*/	
  _openFilter = () => {
    this.setState({filterVisibility:true});
  }
  _closeFilter = () => {
    this.setState({filterVisibility:false});
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
	this._onRefresh();
    if(caronaAtual !== false)
      this.setState({ caronaAtual });
  }

  _avaliaCorrida = async () => {
    const payload = {
      id_corrida: this.state.avaliacao.id,
      status_nota: 1,
      nota: this.state.nota
    }
    result = await avaliaCorrida(this.state.token, payload);
    if(result == 'success')
      this.setState({ avaliacao:{avaliar: false} });
    else
      alert(result);
  }

  _skipAvaliacao = async () => {
    const payload = {
      id_corrida: this.state.avaliacao.id,
      status_nota: 2,
      nota: ''
    }
    result = await avaliaCorrida(this.state.token, payload);
    this.setState({ avaliacao:{avaliar: false} });
  }
}

let {height, width} = Dimensions.get('window');

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
  },
  filterContent: {
    width:270,
    position:"absolute",
    right:-18,
    top:-18,
    backgroundColor:'#fff',
    height:height,
  }
});