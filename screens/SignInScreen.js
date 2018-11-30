import React from 'react';
import { StyleSheet, AsyncStorage, Image, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { login, getUserInfo } from '../services/ApiService';
import { Container, Text, Content, Button, Input, Item, Label, Spinner,Right } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Subscribe } from 'unstated';
import UserContainer from '../stores/UserContainer'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: '', ver:true, loading: false,nomeIcone:"eye"}
  }

  static navigationOptions = {
    header: null,
  };
	onValueChange(value) {
		if(value==true)
			this.setState({
			  ver: false,
			  nomeIcone:"eye-off"
			});
		else
			this.setState({
			  ver: true,
			  nomeIcone:"eye"
			});
	  }
  render() {

    if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content keyboardDismissMode={'on-drag'} style={{margin:0}}>
          <View style={styles.container}>
			<Item style={{borderColor:'transparent'}}>
				<Image
				  style={{width:120, height:120,marginTop:0,marginRight:10}}
				  source={require('../assets/logo.png')}
				/>
			</Item>
            <Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>   
			  <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>E-mail </Label>			
              <Input textContentType="emailAddress" keyboardType="email-address" value={this.state.email} onChangeText={text => this.setState({email: text})} />
            </Item>
            <Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
              <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Senha </Label>
              <Input textContentType="password" secureTextEntry={this.state.ver} value={this.state.password} onChangeText={text => this.setState({password: text})} />
            </Item>
			<Item style={{position:'absolute',borderColor:'transparent',marginTop:-12,left:280,width:35,height:55}}>
				<MaterialCommunityIcons name={this.state.nomeIcone}  size={32} onPress={() => this.onValueChange(this.state.ver)} style={{position:'absolute'}} color="#000"  />
			</Item>
			<Item style={{marginTop:25,width:157.5,height:40}}>
        <Subscribe to={[UserContainer]}>
        {UserContainer => (
          <Button 
            style={{backgroundColor:'#ffca28',width:157.5,height:40,elevation:0, justifyContent:'space-evenly'}} 
            onPress={() => this._handleLoginPress(UserContainer.updateUser)}
          >
            <Text uppercase={false} style={{color:'black',fontSize:20,textAlign:'center',width:150,height:27,top:-1,right:3}}>Entrar</Text>
          </Button>
        )}
        </Subscribe>
			</Item>
			<Item style={{marginTop:16,borderColor:'transparent'}}>
				<Text uppercase={false} style={{color: '#000',fontSize:14,fontWeight:'bold'}}>
					Esqueceu a senha?
				</Text>
			</Item>
			<View style={{marginTop:65,width:130,borderColor:'transparent'}}>
				<Text  style={{color: '#000',fontSize:14,width:130,textAlign:'center'}}>
          Ainda não é usuario?
        </Text>
        <TouchableOpacity activeOpacity={0.5} style={{paddingBottom:6,}} onPress={() => this._handleCadastroPress()}>
          <Text style={{color: '#000',fontSize:14,fontWeight:'bold', alignSelf:'center'}} >
            Cadastre-se
          </Text>
        </TouchableOpacity>
				
			</View>
          </View>
        </Content>
      </Container>
    );
  }

  _handleLoginPress = async (updateUser) => {
    this.setState({loading:true});
    payload = {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    }
    
    const token = await login(payload);

    if(token.status == 'error') {
      alert(token.message);
      this.setState({loading:false});
      return;
    }

    //salvar o token na AsyncStorage
    await this._storeToken(token);

    const info = await getUserInfo(token);

    const tipo = info[0].tipo;

    updateUser(info[0]);
    //ir para a tela do tipo certo
    if(tipo == 0) {
      this.props.navigation.navigate('Codigo');
      return;
    }
    else if(tipo == 1) {
      this.props.navigation.navigate('PassageiroApp');
      return;
    }
    else if(tipo == 2) {
      this.props.navigation.navigate('MotoristaApp');
      return;
    }
    else {
      alert("Erro ao logar");
    }
    this.setState({loading:false})
      
  }
  
  _handleCadastroPress = () => {
    this.props.navigation.navigate('Cadastro');
  }

  _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.log("erro ao salvar o token");
    }
  }
}

const styles = StyleSheet.create({
  container: {
	flex:1,
	marginTop:80,
	marginRight:17,
	marginLeft:16.5,
	padding:0,
	paddingBottom:5,
	flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
});