import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CadastroScreen extends React.Component {

  static navigationOptions = {
    title: 'Cadastro',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Cadastro</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});