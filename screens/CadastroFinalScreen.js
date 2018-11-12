import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Input, Container, Content, Form, Item, Label, Button, Text } from 'native-base';
import { cadastroFinal } from '../services/ApiService';

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

  _enviaCodigo = async () => {
    const payload = {
      tipo: 1,
      codigo_validacao: this.state.codigoValidacao,
      url_foto: ''
    }
    const token = await AsyncStorage.getItem('userToken');
    const result = await cadastroFinal(token, payload);

    if(result == "success") {
      if(payload.tipo == 1)
        this.props.navigation.navigate('PassageirosApp');
      if(payload.tipo == 2)
        this.props.navigation.navigate('MotoristaApp');
    }
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