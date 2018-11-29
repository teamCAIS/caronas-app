import React from 'react';
import { StyleSheet,AsyncStorage, View, Image, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Button, Text, Item, Label, Spinner } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import EditarPerfilScreen from './EditarPerfilScreen';
import InfoMotoristaScreen from './InfoMotoristaScreen';
import { getUserInfo, mudarPerfil } from '../services/ApiService';
import ModalConfirmacao from '../components/ModalConfirmacao';
import { Subscribe } from 'unstated';
import UserContainer from '../stores/UserContainer';

class PerfilScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			modalVisible: false,
			loading:false,
		}
	}
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Seu perfil',
      headerTitle: 'Perfil',
      drawerLabel: 'Seu perfil',
      headerLeft: (
        <TouchableNativeFeedback onPress={() => navigation.openDrawer()}>
          <View style={{padding:12}}>
            <MaterialIcons
              name="menu"
              size={32}
              color="#fff"
            />
          </View>
        </TouchableNativeFeedback>
      ),
      headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
	  headerTintColor: '#fff',
    }
  }
	async componentDidMount() {
		const token = await AsyncStorage.getItem('userToken');
		this.setState({token});
	}


  render() {

		if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

    return (
		<Subscribe to={[UserContainer]}>
		{userContainer => (<Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
			<View style={styles.container}>

				<View style={styles.fotoContainer}>
					<Image
						style={ styles.foto}
						source={userContainer.state.user.url_foto ? {uri:userContainer.state.user.url_foto} : require('../assets/passageiro.png')}
					/>
				</View>
				<View style={{marginTop:10}}>
					<Text style={styles.label}>Nome:</Text>
					<Text style={styles.listItem} >{userContainer.state.user.nome}</Text>
					<Text style={styles.label}>E-mail:</Text>
					<Text style={[styles.listItem]} >{userContainer.state.user.email}</Text>
				</View>
				<Button 
					style={{marginTop:16,backgroundColor:'#ffca28',width:158,height:40,elevation:0}} 
					onPress={() => {this.props.navigation.navigate('Editar', {'user': userContainer.state.user, 'token': this.state.token})}}
				>
					<Text uppercase={false} style={{fontSize:16,textAlign:'center',width:157,height:25,color:'#000'}}>Editar perfil</Text>
				</Button>
          </View>
		  <View style={{top:16.5,marginBottom:40,marginRight:18,marginLeft:18}}>
            <Text style={{textAlign: "center",fontSize:20}} >Trocar perfil:</Text>
			<View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
				<View style={{flexDirection:'column',justifyContent:'center'}}>

					<TouchableHighlight style={{borderRadius:45}} onPress={() => this.confirmaMudanca(1, userContainer.state.user.tipo)}>
						<Image 
							style={[this.getEstilo(userContainer.state.user.tipo==1),styles.fotoPerfil]}
							source={userContainer.state.user.tipo == 1 ? require('../assets/passageiro.png') : require('../assets/passageiro_desabilitado.png')}
						/>
					</TouchableHighlight> 

					<Text style={{fontSize:14,fontWeight:'bold',textAlign:'center',marginTop:5}}>Passageiro</Text>
				</View>
				<View>

					<TouchableHighlight style={{borderRadius:45}} onPress={() => this.confirmaMudanca(2, userContainer.state.user.tipo)}>
						<Image 
							style={[this.getEstilo(userContainer.state.user.tipo==2),styles.fotoPerfil]}
							source={userContainer.state.user.tipo == 2 ? require('../assets/motorista.png') : require('../assets/motorista_desabilitado.png')}
						/>
					</TouchableHighlight> 

					<Text style={{fontSize:14,fontWeight:'bold',textAlign:'center',marginTop:5}}>Motorista</Text>
				</View>
			</View>
      </View>
			
			<ModalConfirmacao
				visibility={this.state.modalVisible}
				dismiss={() => this.setState({modalVisible:false})}
				confirm={() => this.mudarTipo(userContainer.updateTipo, userContainer.state.user.tipo)}
			>
				Você deseja mudar de perfil?
			</ModalConfirmacao>

		</Container>
		)}
		</Subscribe>
    );
	}
	
  mudarTipo = async (updateTipo, tipo) => {
		this.setState({modalVisible:false,loading:true});

		if(tipo == 1) {
			const response = await mudarPerfil(this.state.token, {tipo:2});

			if(response.status == 'success') {
				updateTipo(2);
				if(response.primeiro) {
					this.props.navigation.navigate('InserirInfos');
				} else {
					this.props.navigation.navigate('MotoristaApp');
					return;
				}

			} else {
				alert('Não foi possível mudar seu perfil');
			}


			this.setState({loading:false});
			return;
		}

		if(tipo == 2) {
			const response = await mudarPerfil(this.state.token, {tipo:1});

			if(response.status == 'success') {
				updateTipo(1)
				this.props.navigation.navigate('PassageiroApp');
				return;
			} else {
				alert('Não foi possível mudar seu perfil');
			}


			this.setState({loading:false});
		}	
	}

	confirmaMudanca = (tipoNovo,tipoAntigo) => {
		if(tipoNovo == tipoAntigo)
			return

		this.setState({modalVisible:true});
	}
	
  getEstilo(estado){
	  if(estado){
		  return {borderColor:'#ffca28',borderWidth:3}
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
		InserirInfos: InfoMotoristaScreen,
    },
    {
        initialRouteName: 'Perfil',
    }
)