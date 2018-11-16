import React from 'react';
import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { Input, Container, Content, Item, Label, Button, Text } from 'native-base';
import { cadastroFinal } from '../services/ApiService';

export default class CadastroFinalScreen extends React.Component {

  constructor(props) {
    super(props);
    const codigoValidacao = this.props.navigation.getParam('codigoValidacao', '');
    this.state = { 
        codigoValidacao:'',
        tipoUsuario: '',
    }
  }

  static navigationOptions = {
    title: 'Escolha de perfil',
	headerStyle: {backgroundColor: '#263238', height:57.5},
    headerTintColor: '#fff',
	headerLeft:null
  }

  render() {
    return (
	<Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
          <View style={styles.container}>
			<Item style={{borderColor:'transparent'}}>
				<Image
				  style={{width:90, height:90, marginRight:38.25}}
				  source={require('../assets/perfil.png')}
				/>
				<Image
				  style={{width:90, height:90, marginLeft:38.5}}
				  source={require('../assets/perfil.png')}
				/>
			</Item>
			<Item style={{borderColor:'transparent',marginTop:12.5}}>
				<Text uppercase={false} style={{color:'black',fontSize:12,textAlign:'center',width:85,height:50,marginRight:40}}>Eu sou um(a){"\n"}<Text style={{fontWeight:'bold',fontSize:12}}>Passageiro</Text></Text>
				<Text uppercase={false} style={{color:'black',fontSize:12,textAlign:'center',width:85,height:50,marginLeft:42}}>Eu sou um(a){"\n"}<Text style={{fontWeight:'bold',fontSize:12}}>Motorista</Text></Text>
			</Item>
			<Item style={{marginTop:27.5}}>
				<Button onPress={this._enviaCodigo} style={{backgroundColor:'#ffca28',width:160,height:40}}>
					<Text uppercase={false} style={{color:'black',fontSize:18,textAlign:'center',width:180,height:27,right:8}}>Finalizar cadastro</Text>
				</Button>
			</Item>
		  </View>
		</Content>
	</Container>
    );
  }

  _enviaCodigo = async () => {
    payload = {
      tipo: 1,
      codigo_validacao: this.state.codigoValidacao,
      url_foto: ''
    }
    const token = await AsyncStorage.getItem('userToken');
    const result = await cadastroFinal(token, payload);

    if(result == "success") {
      if(payload.tipo == 1)
        this.props.navigation.navigate('PassageirosApp');
      if(payload.tipo == 2)
        this.props.navigation.navigate('MotoristaApp');
    }
    else
      alert(result);
      
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight:17,
	marginLeft:17,
	padding:0,
	flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
});