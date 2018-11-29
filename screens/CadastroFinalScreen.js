import React from 'react';
import { StyleSheet, View, AsyncStorage, Image, TouchableHighlight } from 'react-native';
import { Input, Container, Content, Item, Label, Button, Text, Picker } from 'native-base';
import { cadastroFinal } from '../services/ApiService';

export default class CadastroFinalScreen extends React.Component {

  constructor(props) {
    super(props);
    const codigoValidacao = this.props.navigation.getParam('codigoValidacao', '');
    this.state = { 
			codigoValidacao:codigoValidacao,
			tipoUsuario: '',
			imagemPassageiro:null,
			imagemMotorista:null,
			modeloCarro:null,
			corCarro:null,
			placaCarro:null,
			loading:false,
    }
  }
	onValueChange(value) {
		this.setState({
		  corCarro: value
		});
	  }
  static navigationOptions = {
    title: 'Escolha de perfil',
	headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
    headerTintColor: '#fff',
	headerLeft:null
  }

  render() {

	if(this.state.loading)
		return (
			<Spinner color='#ffca28'/>
		);

	let infosMotorista = null;
	let finalizarPassageiro = null;
	let isDisabled = !(this.state.modeloCarro && this.state.corCarro && this.state.placaCarro);
	if(this.state.imagemMotorista){
		infosMotorista = (
			<View style={{justifyContent:'center'}}>
				<Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				  <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>Modelo do carro </Label>
				  <Input value={this.state.modeloCarro} onChangeText={text => this.setState({modeloCarro: text})} />
				</Item>
				<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				  <Picker
				  note
				  mode="dropdown"
				  style={{ color:'#727272',right:15,width: 360,height:55, transform: [
					 { scaleX: 0.90 }, 
					 { scaleY: 0.90 },
				  ]}}
				  selectedValue={this.state.corCarro}
				  onValueChange={this.onValueChange.bind(this)}
				>
				  <Picker.Item label="Cor do carro" value={null}/>
				  <Picker.Item label="Preto" value="Preto" />
				  <Picker.Item label="Branco" value="Branco" />
				  <Picker.Item label="Prata" value="Prata" />
				  <Picker.Item label="Vermelho" value="Vermelho" />
				  <Picker.Item label="Azul" value="Azul" />
				  <Picker.Item label="Amarelo" value="Amarelo" />
				</Picker>
				</Item>
				<Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				  <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>Placa do carro </Label>
				  <Input value={this.state.placaCarro} onChangeText={text => this.setState({placaCarro: text})} />
				</Item>
				<Item style={{marginTop:27.5,borderColor:'transparent',width:328,justifyContent:'center'}}>
					<Button disabled={isDisabled} onPress={this._enviaCadastroMotorista} style={this.getEstadoBotao(isDisabled)}>
						<Text uppercase={false} style={this.getEstadoTextoBotao(isDisabled)}>Finalizar cadastro</Text>
					</Button>
				</Item>
			</View>
			);
	}else if(this.state.imagemPassageiro){
		finalizarPassageiro = (
			<Item style={{marginTop:27.5,borderColor:'transparent',width:328,justifyContent:'center'}}>
				<Button onPress={this._enviaCadastroPassageiro} style={{alignSelf: "center",width:157.5,height:40,backgroundColor:'#ffca28',color:'#000',elevation:0}}>
					<Text uppercase={false} style={{fontSize:16,textAlign:'center',width:160,height:22,color:'#000',right:1}}>Finalizar cadastro</Text>
				</Button>
			</Item>
		);
	}
    return (
	<Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
          <View style={styles.container}>
			<View style={{flexDirection:'row',justifyContent:'space-around'}}>
				<View style={{marginRight:38}}>
					<TouchableHighlight style={{borderRadius:45}} onPress={() => this.mudarTipo(1)}>
						<Image style={[this.getEstilo(this.state.imagemPassageiro),styles.fotoPerfil]} source={this.getFotoPassageiro(this.state.imagemPassageiro)}/>
					</TouchableHighlight> 
				</View>
				<View style={{marginLeft:29.5}}>
					<TouchableHighlight style={{borderRadius:45}} onPress={() => this.mudarTipo(2)}>
						<Image style={[this.getEstilo(this.state.imagemMotorista),styles.fotoPerfil]} source={this.getFotoMotorista(this.state.imagemMotorista)}/>
					</TouchableHighlight> 
				</View>
			</View>
			<Item style={{borderColor:'transparent',marginTop:12.5}}>
				<Text uppercase={false} style={{color:'black',fontSize:12,textAlign:'center',width:85,height:50,marginRight:39}}>Eu sou um(a){"\n"}<Text style={{fontWeight:'bold',fontSize:12}}>Passageiro</Text></Text>
				<Text uppercase={false} style={{color:'black',fontSize:12,textAlign:'center',width:85,height:50,marginLeft:34}}>Eu sou um(a){"\n"}<Text style={{fontWeight:'bold',fontSize:12}}>Motorista</Text></Text>
			</Item>
			{infosMotorista}
			{finalizarPassageiro}
		  </View>
		</Content>
	</Container>
    );
  }
	mudarTipo(tipo){
		if(tipo==1)
		  this.setState({
			  imagemPassageiro:true,
			  imagemMotorista:null,
		  });
		else
		  this.setState({
			  imagemMotorista:true,
			  imagemPassageiro:null,
		  });
  }
  getEstadoBotao(estado){
	  if(estado==true){
		  return {
			  alignSelf: "center",width:157.5,height:40,elevation:0
		  }
	  }else{
		  return {
			  alignSelf: "center",width:157.5,height:40,backgroundColor:'#ffca28',color:'#000',elevation:0
		  }
	  }
  }
  getEstadoTextoBotao(estado){
	  if(estado==true){
		  return {
			  fontSize:16,textAlign:'center',width:160,height:22,right:1
		  }
	  }else{
		  return {
			  fontSize:16,textAlign:'center',width:160,height:22,color:'#000',right:1
		  }
	  }
  }
  getEstilo(estado){
	  if(estado){
		  return {borderColor:'#ffca28',borderWidth:3}
	  }
  }
  getFotoPassageiro(estado){
	  if(estado){
		  return require('../assets/passageiro.png');
	  }else{
		  return require('../assets/passageiro_desabilitado.png');
	  }
  }
  getFotoMotorista(estado){
	  if(estado){
		  return require('../assets/motorista.png');
	  }else{
		  return require('../assets/motorista_desabilitado.png');
	  }
  }
  _enviaCadastroPassageiro = async () => {
		this.setState({loading:true});
    payload = {
      tipo: 1,
      codigo_validacao: this.state.codigoValidacao,
      url_foto: ''
    }
    const token = await AsyncStorage.getItem('userToken');
    const result = await cadastroFinal(token, payload);

    if(result == "success") {
				this.props.navigation.navigate('PassageirosApp');
				return;
    }
    else {
			this.setState({loading:false});
			alert(result);
		}
      
	}
	
	_enviaCadastroMotorista = async () => {
		this.setState({loading:true});
    payload = {
      tipo: 2,
      codigo_validacao: this.state.codigoValidacao,
			url_foto: '',
			modelo: this.state.modeloCarro,
			corCarro: this.state.corCarro,
			placa: this.state.placaCarro,
    }
    const token = await AsyncStorage.getItem('userToken');
    const result = await cadastroFinal(token, payload);

    if(result == "success") {
				this.props.navigation.navigate('MotoristaApp');
				return;
    }
    else {
			alert(result);
			this.setState({loading:false});
		}
	}

}

const styles = StyleSheet.create({
  container: {
	flex:1,
    marginRight:17,
	marginLeft:17,
	padding:0,
	flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  fotoPerfil:{
	height: 90,
	width: 90,
	borderRadius: 45,
  },
});