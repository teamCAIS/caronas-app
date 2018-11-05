import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
    this.props.navigation.navigate('App');
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