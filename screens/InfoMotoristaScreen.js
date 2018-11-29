import React from 'react';
import { StyleSheet, View, AsyncStorage, Image, TouchableHighlight } from 'react-native';
import { Input, Container, Content, Item, Label, Button, Text, Picker } from 'native-base';
import { inserirInfosMotorista } from '../services/ApiService';
import { Subscribe } from 'unstated';
import UserContainer from '../stores/UserContainer';

export default class InfoMotoristaScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
			modeloCarro:null,
			corCarro:null,
			placaCarro:null,
    }
  }
	onValueChange(value) {
		this.setState({
		  corCarro: value
		});
	  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Informações de motorista',
      headerTitle: 'Informações de motorista',
      headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
			headerTintColor: '#fff',
		}
  }

  render() {
	let isDisabled = !(this.state.modeloCarro && this.state.corCarro && this.state.placaCarro);
	
    return (
	<Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
          <View style={styles.container}>
				<View style={{justifyContent:'center'}}>
					<Text style={{fontWeight:'bold'}}>Como é a sua primeira vez mudando de perfil para motorista é necessário que você insira algumas informações para poder criar caronas:</Text>
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
						<Subscribe to={[UserContainer]}>
							{container => (
							<Button 
								disabled={isDisabled} 
								onPress={() => this._enviaInfosMotorista(container.updateCarro)} 
								style={this.getEstadoBotao(isDisabled)}
							>
								<Text uppercase={false} style={this.getEstadoTextoBotao(isDisabled)}>Concluir</Text>
							</Button>
							)}
						</Subscribe>
					</Item>
			</View>
		  </View>
		</Content>
	</Container>
    );
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
			  fontSize:18,textAlign:'center',width:153,height:22,right:1
		  }
	  }else{
		  return {
			  fontSize:18,textAlign:'center',width:153,height:22,color:'#000',right:1
		  }
	  }
  }
  
	_enviaInfosMotorista = async updateCarro => {
    payload = {
			modeloCarro: this.state.modeloCarro,
			corCarro: this.state.corCarro,
			placaCarro: this.state.placaCarro,
    }
    const token = await AsyncStorage.getItem('userToken');
    const result = await inserirInfosMotorista(token, payload);

    if(result == "success") {
			updateCarro(this.state.modeloCarro, this.state.corCarro, this.state.placaCarro);
      this.props.navigation.navigate('MotoristaApp');
    }
    else
      alert(result);
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
});