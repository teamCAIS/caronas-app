import React from 'react';
import { StyleSheet, AsyncStorage, Image, View } from 'react-native';
import { login, getUserInfo } from '../services/ApiService';
import { Container, Text, Content, Button, Input, Item, Label, Spinner } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: '', loading: false}
  }

  static navigationOptions = {
    header: null,
  };

  render() {

    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:100}}>
          <View style={styles.container}>
			<Item style={{borderColor:'transparent'}}>
				<Image
				  style={{width:120, height:120,marginTop:0,marginRight:10}}
				  source={require('../assets/logo.png')}
				/>
			</Item>
            <Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>   
			  <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>E-mail </Label>			
              <Input textContentType="emailAddress" keyboardType="email-address" value={this.state.email} onChangeText={text => this.setState({email: text})} />
            </Item>
            <Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
              <Label style={{position:'relative',left:10,top:10,fontSize:14,color:'#727272'}}>Senha </Label>
              <Input textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />
            </Item>
			<Item style={{marginTop:25,width:157.5,height:40}}>
				<Button style={{backgroundColor:'#ffca28',width:157.5,height:40,elevation:0, justifyContent:'space-evenly'}} onPress={this._handleLoginPress}>
					<Text uppercase={false} style={{color:'black',fontSize:18,textAlign:'center',width:150,height:25}}>Entrar</Text>
				</Button>
			</Item>
			<Item style={{marginTop:16,borderColor:'transparent'}}>
				<Text uppercase={false} style={{color: '#000',fontSize:14,fontWeight:'bold'}}>
					Esqueceu a senha?
				</Text>
			</Item>
			<Item style={{marginTop:80,width:130,borderColor:'transparent'}}>
				<Text uppercase={false} style={{color: '#000',fontSize:14,width:130,textAlign:'center'}}>
					Ainda não é usuario?{"\n"}
					<Text uppercase={false} style={{color: '#000',fontSize:14,fontWeight:'bold'}} onPress={this._handleCadastroPress}>
						Cadastre-se
					</Text>
				</Text>
			</Item>
          </View>
        </Content>
      </Container>
    );
  }

  _handleLoginPress = async () => {
    this.setState({loading:true});
    /* payload = {
      email: this.state.email,
			password: this.state.password
    } */
    payload = {
<<<<<<< HEAD
      email: 'ela@eu.br',
      password: '1234'
=======
      email: 'ela@eu.br',
      password: '1234'
>>>>>>> cbf1182d317096390f921b64ab4408aedbfe8545
    }

    const token = await login(payload);

    //salvar o token na AsyncStorage
    this._storeToken(token);

    const info = await getUserInfo(token);

    const tipo = info[0].tipo;

    this._storeUser(info[0]);
    //ir para a tela do tipo certo
    if(tipo == 0)
      this.props.navigation.navigate('Codigo');
    else if(tipo == 1)
      this.props.navigation.navigate('PassageiroApp');
    else if(tipo == 2)
      this.props.navigation.navigate('MotoristaApp');
    else
      alert("Erro ao logar");

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
  _storeUser = async (userObj) => {
    try {
      const user = JSON.stringify(userObj);
      await AsyncStorage.setItem('user', user);
    } catch (error) {
      console.log(error);
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
});