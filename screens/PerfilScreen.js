import React from 'react';
import { StyleSheet,AsyncStorage, View, Image, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Button, Text, Item, Label, Spinner } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import EditarPerfilScreen from './EditarPerfilScreen';
import { getUserInfo } from '../services/ApiService';
class PerfilScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: { nome: 'não foi', email: '', genero: 2, tipo:1}, imagemPassageiro:true,imageMotorista:false}
	}
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Seu perfil',
      headerTitle: 'Perfil',
      drawerLabel: 'Seu perfil',
      headerLeft: (
        <MaterialIcons
          style={{marginLeft: 12}}
          name="menu"
          size={32}
          onPress={() => navigation.openDrawer()}
          color="#fff"
        />
      ),
      headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
	  headerTintColor: '#fff',
    }
  }
	async componentDidMount() {
		let user = await AsyncStorage.getItem('user');
		userObj = JSON.parse(user);
		if(userObj.tipo==1){
			this.state.imagemPassageiro=true,
			this.state.imagemMotorista=false
		}else{
			if(userObj.tipo==2){
				this.state.imagemPassageiro=false,
				this.state.imagemMotorista=true
			}
		}
		this.setState({user: userObj});
	}
  render() {
    return (
		<Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
			<View style={styles.container}>

				<View style={styles.fotoContainer}>
					<Image
						style={ styles.foto}
						source={this.state.user.url_foto ? {uri:this.state.user.url_foto} : require('../assets/passageiro.png')}
					/>
				</View>
				<View style={{marginTop:10}}>
					<Text style={styles.label}>Nome:</Text>
					<Text style={styles.listItem} >{this.state.user.nome}</Text>
					<Text style={styles.label}>E-mail:</Text>
					<Text style={[styles.listItem]} >{this.state.user.email}</Text>
				</View>
				<Button style={{marginTop:16,backgroundColor:'#ffca28',width:158,height:40,elevation:0}} onPress={() => {this.props.navigation.navigate('Editar')}}>
					<Text uppercase={false} style={{fontSize:16,textAlign:'center',width:157,height:25,color:'#000'}}>Editar perfil</Text>
				</Button>
          </View>
		  <View style={{top:16.5,marginBottom:40,marginRight:18,marginLeft:18}}>
            <Text style={{textAlign: "center",fontSize:20}} >Trocar perfil:</Text>
			<View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
				<View style={{flexDirection:'column',justifyContent:'center'}}>
					<TouchableHighlight style={{borderRadius:45}} onPress={() => this.mudarTipo(1)}>
						<Image style={[this.getEstilo(this.state.imagemPassageiro),styles.fotoPerfil]} source={this.getFotoPassageiro(this.state.imagemPassageiro)}/>
					</TouchableHighlight> 
					<Text style={{fontSize:14,fontWeight:'bold',textAlign:'center',marginTop:5}}>Passageiro</Text>
				</View>
				<View>
					<TouchableHighlight style={{borderRadius:45}} onPress={() => this.mudarTipo(2)}>
						<Image style={[this.getEstilo(this.state.imagemMotorista),styles.fotoPerfil]} source={this.getFotoMotorista(this.state.imagemMotorista)}/>
					</TouchableHighlight> 
					<Text style={{fontSize:14,fontWeight:'bold',textAlign:'center',marginTop:5}}>Motorista</Text>
				</View>
			</View>
          </View>
		</Container>
    );
  }
  mudarTipo(tipo){
	  this.componentDidMount();
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
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#000',
	borderBottomWidth: 1.5,
	marginLeft: 18,
	marginRight:18,
    paddingBottom:28,
  },
  listItem: {
    marginTop: -4,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
  },
  foto:{
	height: 125,
	width: 125,
	borderRadius: 80,
  },
  fotoContainer:{
	position: "absolute",
	right:0,
	top:18,
	alignItems: "center",
  },
  fotoPerfil:{
	height: 90,
	width: 90,
	borderRadius: 45,
  },
});

export default createStackNavigator(
    {
        Perfil: PerfilScreen,
        Editar: EditarPerfilScreen,
    },
    {
        initialRouteName: 'Perfil',
    }
)