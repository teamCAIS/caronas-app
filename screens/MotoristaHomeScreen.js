import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class MotoristaHomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Início',
      headerTitle: 'Início',
      headerLeft: (
        <MaterialIcons
          name="menu"
          size={32}
          onPress={() => navigation.openDrawer()}
          color="#000"
        />
      ),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Tela dos motoristas</Text>
        <Button
          title="Criar carona"
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