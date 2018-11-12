import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Form, Button, Picker, Text } from 'native-base';
import { criarCorrida } from '../services/ApiService';

export default class AdicionarCaronaScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {saida: '', pontoEncontro: '', horario: '', vagas: ''}
      }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Criar carona',
      headerTitle: 'Criar carona',
    }
  }

  render() {

    let isDisabled = !(this.state.saida && this.state.horario && this.state.pontoEncontro && this.state.vagas);

    return (
      <Container style={styles.container}>
        <Content padder>
          <Form>
            <Picker
              placeholder="Destino"
              mode="dropdown"
              style={styles.picker}
              selectedValue={this.state.saida}
              onValueChange={(value) => this.setState({saida: value})}
            >
              <Picker.Item enabled={false} label="Destino" value={null}/>
              <Picker.Item label="Humberto Monte" value="Humberto Monte" />
              <Picker.Item label="Educação Física" value="Educação Física" />
              <Picker.Item label="Mister Hull" value="Mister Hull" />
            </Picker>

            <Picker
              mode="dropdown"
              style={styles.picker}
              selectedValue={this.state.pontoEncontro}
              onValueChange={(value) => this.setState({pontoEncontro: value})}
            >
              <Picker.Item enabled={false} label="Ponto de encontro" value={null}/>
              <Picker.Item label="Saída do bloco" value="Saída do bloco" />
              <Picker.Item label="CA" value="CA" />
              <Picker.Item label="Escada" value="Escada" />
            </Picker>

            <Picker
              mode="dropdown"
              style={styles.picker}
              selectedValue={this.state.horario}
              onValueChange={(value) => this.setState({horario: value})}
            >
              <Picker.Item enabled={false} label="Horário de saída" value={null}/>
              <Picker.Item label="19:00" value="19:00:00" />
              <Picker.Item label="19:30" value="19:30:00" />
              <Picker.Item label="20:00" value="20:00:00" />
              <Picker.Item label="20:30" value="20:30:00" />
              <Picker.Item label="21:30" value="21:30:00" />
              <Picker.Item label="22:00" value="22:00:00" />
            </Picker>

            <Picker
              mode="dropdown"
              style={styles.picker}
              selectedValue={this.state.vagas}
              onValueChange={(value) => this.setState({vagas: value})}
            >
              <Picker.Item enabled={false} label="Quantidade de vagas" value={null}/>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker>
            
            <Button
              disabled={isDisabled}
              style={{alignSelf: "center"}}
              onPress={this._handleSubmit}
            >
              <Text>Publicar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  _handleSubmit = async () => {

    const payload = this.state;
    const token = await AsyncStorage.getItem('userToken');

    const result = await criarCorrida(token, payload);
    
    if(result == "success")
      this.props.navigation.navigate('MotoristaHome', {novaCarona: true});
    else
      alert("Não foi possível publicar uma nova carona");

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 300,
    marginBottom: 12,
  }
});