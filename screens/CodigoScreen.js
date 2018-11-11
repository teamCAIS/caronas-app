import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Input, Container, Content, Form, Item, Label, Button, Text } from 'native-base';
import { checarCodigo } from '../services/ApiService';

export default class CodigoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { codigoDigitado: '' }
  }

  static navigationOptions = {
    title: 'Código',
  }

  render() {
    return (
      <Container>
          <Content>
              <Form>
                  <Item floatingLabel>
                      <Label>Código de acesso</Label>
                      <Input value={this.state.codigoDigitado} onChangeText={text => this.setState({codigoDigitado: text})}/>
                  </Item>
                  <Button onPress={this._enviaCodigo}><Text>Confirmar</Text></Button>
              </Form>
          </Content>
      </Container>
    );
  }

  _enviaCodigo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const payload = {codigo_validacao: 'FADCAC06'}
    const result = await checarCodigo(token, payload);

    if(result == "success")
      this.props.navigation.navigate('CadastroFinal', { codigoValidacao: this.state.codigoDigitado });
    else
      alert(result);
      
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