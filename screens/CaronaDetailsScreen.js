import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CaronaInfo from '../components/CaronaInfo';
import { Button, Text, Container } from 'native-base';

export default class CaronaDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Detalhes da carona',
      headerTitle: 'Detalhes da carona',
    }
  }

  render() {
    return (
      <Container>
        <CaronaInfo corrida={this.props.navigation.getParam('corrida')}/>
        <Button style={styles.button} onPress={() => this._entrarCarona}>
          <Text>Aceitar</Text>
        </Button>
      </Container>
      
    );
  }
  _entrarCarona = async () => {

  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    marginTop: 16,
  }
});