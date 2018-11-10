import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { login } from '../services/ApiService';
import { Container, Text, Content, Button } from 'native-base';

export default class App extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Sign In</Text>
          <Button
            onPress={this._handleLoginPress}
          >
            <Text>Login</Text>
          </Button>
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

  _handleLoginPress = () => {
    payload = {
      email: 'eu@eu.com',
			password: 1234
    }
    login(payload, (userArray, token) => {

      //salvar o token na AsyncStorage
      this._storeToken(token);

      const tipo = userArray[0].tipo;
      //ir para o drawer do tipo certo
      if(tipo == 0)
        this.props.navigation.navigate('Codigo');
      else if(tipo == 1)
        this.props.navigation.navigate('PassageiroApp');
      else if(tipo == 2)
        this.props.navigation.navigate('MotoristaApp');
      else
        alert("Erro ao logar");

    });
  }
  
  _handleCadastroPress = () => {
    this.props.navigation.navigate('Cadastro');
  }

  _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      alert("erro ao salvar o token");
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