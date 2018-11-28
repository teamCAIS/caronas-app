import React from 'react';
import { StyleSheet, AsyncStorage,View,Image,TouchableHighlight } from 'react-native';
import { Container, Content,Text,  Button, Item, Label, Input,Picker} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import { getUserInfo } from '../services/ApiService';

export default class EditarPerfilScreen extends React.Component {

	constructor(props){
		super(props);
		this.state = {user: { nome: 'não foi', email: '', genero: 2, tipo:1},nome:'',email: '',password: '',cpassword:'',genero: '3',fotoURL:null,fotoNOME:null,fotoTIPO:null}
	}
	onValueChange(value) {
		this.setState({
		  genero: value
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
		let user = await AsyncStorage.getItem('user');
		userObj = JSON.parse(user);
		this.setState({user: userObj});
	}
  render() {
    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
		<Content>
			<View style={styles.container}>
				<Item style={{borderColor:'transparent', flexDirection:'column'}}>
					<TouchableHighlight style={{borderRadius:80}} onPress={() => {this._pickImage()}}>
						<Image style={styles.fotoPerfil} source={{uri:this.state.user.url_foto}}/>
					</TouchableHighlight> 
					<Text style={{marginTop:5,fontSize:14,fontWeight:'bold',textAlign:'center'}}>Alterar Foto</Text>
				</Item>
				<Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:10,width:328,height:55}}>   
				  <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>Nome </Label>			
				  <Input value={this.state.nome} onChangeText={text => this.setState({nome: text})} />
				</Item>
				<Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>   
				  <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>E-mail </Label>			
				  <Input textContentType="emailAddress" keyboardType="email-address" value={this.state.email} onChangeText={text => this.setState({email: text})} />
				</Item>
				<Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				  <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>Senha </Label>
				  <Input textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />
				</Item>
				<Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				  <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>Confirmar senha </Label>
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
					  selectedValue={this.state.genero}
					  onValueChange={this.onValueChange.bind(this)}
					>
					  <Picker.Item label="Gênero" value="3" />
					  <Picker.Item label="Masculino" value="0" />
					  <Picker.Item label="Feminino" value="1" />
					  <Picker.Item label="Prefiro não especificar" value="2" />
					</Picker>
				</Item>
				<Item style={{marginTop:18,marginBottom:18}}>
					<Button style={{backgroundColor:'#ffca28',width:157.5,height:40, elevation:0}}>
						<Text uppercase={false} style={{color:'black',fontSize:18,textAlign:'center',width:153,height:27}}>Salvar edições</Text>
					</Button>
				</Item>
			</View>
		</Content>
	  </Container>
    );
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
		alert(this.state.fotoTIPO);
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