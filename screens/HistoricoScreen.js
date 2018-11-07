import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class HistoricoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Ver histórico',
      headerTitle: 'Histórico',
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
        <Text>Tela de histórico</Text>
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