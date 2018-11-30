import React from 'react';
import { StyleSheet, AsyncStorage,View,Image,TouchableHighlight } from 'react-native';
import { Container, Content,Text,  Button, Item, Label, Input,Picker, Spinner} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import { getUserInfo, editarPerfil } from '../services/ApiService';
import { Subscribe } from 'unstated';
import UserContainer from '../stores/UserContainer';
import ModalAlert from '../components/ModalAlert';

export default class EditarPerfilScreen extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			user: { nome: 'não foi', email: '', genero: 2, tipo:1},
			password: '',
			cpassword:'',
			fotoURL:'',
			fotoNOME:'',
			fotoTIPO:'',
			token: '',
			loading:false,
			concluirUpdate:false,
		}
	}
	onValueChange(value) {
		this.setState({
			user: {
				...this.state.user,
				genero: value
			}
		});
	  }
	 onCorChange(value){
		 this.setState({
			 user: {
				...this.state.user,
				corCarro:value
			 }
		 });
	 }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Editar perfil',
      headerTitle: 'Editar perfil',
      headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
	  	headerTintColor: '#fff',
		}
  }
	async componentDidMount() {
		const user = this.props.navigation.getParam('user');
		const token = this.props.navigation.getParam('token');
		this.setState({user: {...user, genero:`${user.genero}`}, token});
	}
  render() {

		if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

		let disabled = this.state.password == '' || this.state.cpassword == '';
	let componentMotorista = null
	if(this.state.user.tipo==2){
		componentMotorista = (
		<View>
			<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				<Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Modelo do carro </Label>
				<Input value={this.state.user.modelo} 
					onChangeText={text => this.setState({user:{...this.state.user,modelo: text}})} />
			</Item>

			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				<Picker
					note
					mode="dropdown"
					style={{ color:'#727272',right:15,width: 360,height:55, transform: [
						{ scaleX: 0.90 }, 
						{ scaleY: 0.90 },
					]}}
					selectedValue={this.state.user.corCarro}
					onValueChange={this.onCorChange.bind(this)}
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

			<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				<Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Placa do carro </Label>
				<Input value={this.state.user.placa} 
					onChangeText={text => this.setState({user:{...this.state.user,placa: text}})} />
			</Item>
			</View>
		);
	}
  return (
    <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
			<Content>
				<View style={styles.container}>
					<Item style={{borderColor:'transparent', flexDirection:'column'}}>
						<TouchableHighlight style={{borderRadius:80}} onPress={() => {this._pickImage()}}>
							<Image 
								style={styles.fotoPerfil}
								source={this.state.user.url_foto ? {uri: this.state.user.url_foto} : require('../assets/perfil.png')}
							/>
						</TouchableHighlight> 
						<Text style={{marginTop:5,fontSize:14,fontWeight:'bold',textAlign:'center'}}>Alterar Foto</Text>
					</Item>

					<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:10,width:328,height:55}}>   
						<Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Nome </Label>			
						<Input value={this.state.user.nome} onChangeText={text => this.setState({user: {...this.state.user,nome: text}})} />
					</Item>

					<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>   
						<Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>E-mail </Label>			
						<Input 
							textContentType="emailAddress" 
							keyboardType="email-address" 
							value={this.state.user.email} 
							onChangeText={text => this.setState({user:{...this.state.user,email: text}})} 
						/>
					</Item>

					<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
						<Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Senha </Label>
						<Input 
							textContentType="password" 
							secureTextEntry={true} 
							value={this.state.password} 
							onChangeText={text => this.setState({password: text})} 
						/>
					</Item>

					<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
						<Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Confirmar senha </Label>
						<Input textContentType="password" secureTextEntry={true} value={this.state.cpassword} onChangeText={text => this.setState({cpassword: text})} />
					</Item>

					<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
						<Picker
							note
							mode="dropdown"
							style={{ color:'#727272',right:15,width: 360,height:55, transform: [
							{ scaleX: 0.90 }, 
							{ scaleY: 0.90 },
							]}}
							selectedValue={this.state.user.genero}
							onValueChange={this.onValueChange.bind(this)}
						>
							<Picker.Item label="Gênero" value="3" />
							<Picker.Item label="Masculino" value="0" />
							<Picker.Item label="Feminino" value="1" />
							<Picker.Item label="Prefiro não especificar" value="2" />
						</Picker>
					</Item>
					{componentMotorista}
					<Item style={{marginTop:18,marginBottom:18}}>
						<Subscribe to={[UserContainer]}>
							{container => (<Button 
									style={this.getEstadoBotao(disabled)}
									onPress={() => this._editarPerfil(container.updateUser)}
									disabled={disabled}
								>
									<Text uppercase={false} style={this.getEstadoTextoBotao(disabled)}>Salvar edições</Text>
								</Button>
							)}
						</Subscribe>
					</Item>
				</View>
					<ModalAlert
            visibility={this.state.concluirUpdate}
            dismiss={() => this.setState({concluirUpdate:false})}
          >
            Suas informações foram alteradas :)
          </ModalAlert>
			</Content>
	  </Container>
    );
	}
	
	_editarPerfil = async updateUser => {
		this.setState({loading:true});

		if(this.state.password != this.state.cpassword) {
			alert('Verifique se a senha foi digitada corretamente');
			return;
		}

		const payload = this.state;
		const result = await editarPerfil(this.state.token, payload);

		if(result.status == 'success') {
			updateUser(this.state.user);
			this.setState({
				concluirUpdate:true
			});
		} else {
			alert('Não foi possível editar seu perfil');
		}

		this.setState({loading:false});
	}

  _pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  allowsEditing: true,
		  aspect: [1,1],
		});
		this.setState({
		    fotoURL:result.uri,
		});
		this.state.user.url_foto= result.uri;
		this.setState({
			fotoNOME:result.uri.split('/').pop(),
		});
		let match = /\.(\w+)$/.exec(this.state.fotoNOME);
		this.setState({
			fotoTIPO: match ? `image/${match[1]}` : `image`			
		});
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
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginRight:18,
		marginLeft:18,
		marginTop:18,
		padding:0,
		paddingTop:18,
		paddingBottom:18,
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