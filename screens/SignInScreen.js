import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { login } from '../services/ApiService';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { user: [{nome: 'faça o login'}]}
  }

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
        <Text>{this.state.user[0].nome}</Text>
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
    login(payload, (result) => {
      this.setState({ user: result })
    });
    //this.props.navigation.navigate('App');
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