import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Input, Container, Content, Form, Item, Label, Button, Text } from 'native-base';
import { checarCodigo } from '../services/ApiService';

export default class CadastroFinalScreen extends React.Component {

  constructor(props) {
    super(props);
    const codigoValidacao = this.props.navigation.getParam('codigoValidacao', '');
    this.state = { 
        codigoValidacao,
        tipoUsuario: '',
    }
  }

  static navigationOptions = {
    title: 'Cadastro',
  }

  render() {
    return (
      <Container>
          <Content>
              <Form>
                  <Item floatingLabel>
                      <Label>Você é motorista ou passageiro?</Label>
                      <Input value={this.state.tipoUsuario} onChangeText={text => this.setState({tipoUsuario: text})}/>
                  </Item>
                  <Button onPress={this._enviaCodigo}><Text>Confirmar</Text></Button>
              </Form>
          </Content>
      </Container>
    );
  }

  _enviaCodigo = () => {
    alert(this.state.codigoValidacao);
    /* const token = await AsyncStorage.getItem('userToken');
    const payload = {codigo_usuario: this.state.codigoDigitado}
    checarCodigo(token, payload, (res) => {alert(res.message);}); */
      
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