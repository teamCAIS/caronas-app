import React from 'react';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Picker, Text, Item, Label, Input, Spinner } from 'native-base';
import { criarCorrida, getCorridaAtual } from '../services/ApiService';
import Modal from 'react-native-modal';

export default class AdicionarCaronaScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {saida: '', pontoEncontro: '', horario: '', vagas: '', loading: false, }
      }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Criar carona',
      headerTitle: 'Criar carona',
	  headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
      headerTintColor: '#fff',
	}
  }

  render() {

	if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

    let isDisabled = !(this.state.saida && this.state.horario && this.state.pontoEncontro && this.state.vagas);

    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
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
				  <Text uppercase={false} style={this.getEstadoTextoBotao(isDisabled)}>Publicar</Text>
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
			  fontSize:18,textAlign:'center',width:153,height:25
		  }
	  }else{
		  return {
			  fontSize:18,textAlign:'center',width:153,height:25,color:'#000'
		  }
	  }
  }
  _handleSubmit = async () => {
		this.setState({loading:true});

		const payload = {
			saida: this.state.saida,
			pontoEncontro: this.state.pontoEncontro,
			horario: this.state.horario,
			vagas: this.state.vagas,
		}

		const token = await AsyncStorage.getItem('userToken');
		this.setState({token});

    const result = await criarCorrida(token, payload);
    
    if(result == "success") {
			this.props.navigation.navigate('MotoristaHome', {novaCarona:true});
    }
    else {
			this.setState({loading:false});
			alert("Não foi possível publicar uma nova carona");
		}
	}
	
	_navigateSuccess = async () => {
		//this.setState({modalVisibility:false, loading:true});
		//const resp = await getCorridaAtual(this.state.token);
		//const novaCarona = resp[0];
		//this.props.navigation.navigate('MotoristaHome');
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
  picker: {
    marginBottom: 16,
		right:12,
		top:8,
		width: 360,
		height:55, 
		transform: [{ scaleX: 0.87 },{ scaleY: 0.87 }],
	},
});