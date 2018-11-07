import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class EditarPerfilScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Editar perfil',
      headerTitle: 'Editar Perfil',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Edite seu perfil</Text>
        <Button
          title="Salvar alterações"
          onPress={() => {}}
        />
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