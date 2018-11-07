import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { login } from '../services/ApiService';

export default class App extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
        <Button
          title='Login'
          onPress={this._handleLoginPress}
        />
        <Text
          style={{color: '#0033dd'}}
          onPress={this._handleCadastroPress}
        >
        Cadastro
        </Text>
      </View>
    );
  }

  _handleLoginPress = () => {
    payload = {
      email: 'eu@eu.com',
			password: 1234
    }
    login(payload, (userArray, token) => {

      //salvar o token na AsyncStorage

      const tipo = userArray[0].tipo;
      //ir para o drawer do tipo certo
      if(tipo == 1)
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