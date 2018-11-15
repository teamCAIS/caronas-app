import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { login, getUserInfo } from '../services/ApiService';
import { Container, Text, Content, Button, Input, Form, Item, Label } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''}
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input textContentType="emailAddress" keyboardType="email-address" value={this.state.email} onChangeText={text => this.setState({email: text})} />
            </Item>
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />
            </Item>
            <Button
              onPress={this._handleLoginPress}
            >
              <Text>Login</Text>
            </Button>
          </Form>
          
          <Text
            style={{color: '#0033dd'}}
            onPress={this._handleCadastroPress}
          >
          Cadastro
          </Text>
        </Content>
      </Container>
    );
  }

  _handleLoginPress = async () => {
    /* payload = {
      email: this.state.email,
			password: this.state.password
    } */
    payload = {
      email: 'ela@eu.br',
      password: '1234'
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#000'
  },
});