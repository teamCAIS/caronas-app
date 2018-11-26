import React from 'react';
import { StyleSheet, AsyncStorage,View,Image,TouchableHighlight } from 'react-native';
import { Container, Content,Text,  Button, Item, Label, Input,Picker, Spinner} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { getUserInfo } from '../services/ApiService';

export default class EditarCaronaScreen extends React.Component {

	constructor(props){
		super(props);
		this.state = {saida: '', pontoEncontro: '', horario: '', vagas: '', loading: false}
	}

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Editar carona',
      headerTitle: 'Editar carona',
      headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
	  headerTintColor: '#fff',
	}
  }
	async componentDidMount() {
		
	}
  render() {
	  if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

    let isDisabled = !(this.state.saida && this.state.horario && this.state.pontoEncontro && this.state.vagas);
    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
		<Content>
			<View style={styles.container}>
				<Item style={{borderColor:'#727272',backgroundColor:'#fff',width:328,height:55}}>
				<Picker
				  placeholder="Destino"
				  mode="dropdown"
				  style={styles.picker}
				  selectedValue={this.state.saida}
			
				  onValueChange={(value) => this.setState({saida: value})}
				>
				  <Picker.Item enabled={false} label="Destino" value={null}/>
				  <Picker.Item label="Humberto Monte" value="Humberto Monte" />
				  <Picker.Item label="Educação Física" value="Educação Física" />
				  <Picker.Item label="Mister Hull" value="Mister Hull" />
				</Picker>
			</Item>
			<Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>   
			  <Label style={{position:'relative',left:18,top:10,fontSize:14,color:'#000'}}>Ponto de Encontro     </Label>			
              <Input value={this.state.pontoEncontro} onChangeText={text => this.setState({pontoEncontro: text})} />
            </Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				<Picker
				  mode="dropdown"
				  style={styles.picker}
				  selectedValue={this.state.horario}
				  onValueChange={(value) => this.setState({horario: value})}
				>
				  <Picker.Item enabled={false} label="Horário de saída" value={null}/>
				  <Picker.Item label="18:30" value="18:30:00" />
				  <Picker.Item label="19:00" value="19:00:00" />
				  <Picker.Item label="19:30" value="19:30:00" />
				  <Picker.Item label="20:00" value="20:00:00" />
				  <Picker.Item label="20:30" value="20:30:00" />
				  <Picker.Item label="21:00" value="21:00:00" />
				  <Picker.Item label="21:30" value="21:30:00" />
				  <Picker.Item label="22:00" value="22:00:00" />
				  <Picker.Item label="22:30" value="22:30:00" />
				</Picker>
			</Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				<Picker
				  mode="dropdown"
				  style={styles.picker}
				  selectedValue={this.state.vagas}
				  onValueChange={(value) => this.setState({vagas: value})}
				>
				  <Picker.Item enabled={false} label="Quantidade de vagas" value={null}/>
				  <Picker.Item label="1" value="1" />
				  <Picker.Item label="2" value="2" />
				  <Picker.Item label="3" value="3" />
				  <Picker.Item label="4" value="4" />
				</Picker>
            </Item>
			<Item style={{marginTop:18}}>
				<Button
				  disabled={isDisabled}
				  style={this.getEstadoBotao(isDisabled)}
				  onPress={this._handleSubmit}
				>
				  <Text uppercase={false} style={this.getEstadoTextoBotao(isDisabled)}>Salvar edições</Text>
				</Button>
			</Item>
			</View>
		</Content>
	  </Container>
    );
  }
  getEstadoBotao(estado){
	  if(estado==true){
		  return {
			  alignSelf: "center",width:157.5,height:40
		  }
	  }else{
		  return {
			  alignSelf: "center",width:157.5,height:40,backgroundColor:'#ffca28',color:'#000'
		  }
	  }
  }
  getEstadoTextoBotao(estado){
	  if(estado==true){
		  return {
			  fontSize:18,textAlign:'center',width:157,height:25
		  }
	  }else{
		  return {
			  fontSize:18,textAlign:'center',width:157,height:25,color:'#000'
		  }
	  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginRight:18,
	marginLeft:18,
	marginTop:18,
	padding:0,
	flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  fotoPerfil:{
	  width:125,
	  height:125,
	  borderRadius:60
  }
});