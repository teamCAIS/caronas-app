import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';

class HistoricoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Histórico',
      headerTitle: 'Histórico',
      headerLeft: (
        <MaterialIcons
          style={{marginLeft: 12}}
          name="menu"
          size={32}
          onPress={() => navigation.openDrawer()}
          color="#fff"
        />
      ),
	  headerStyle: {backgroundColor: '#263238', height:57.5},
	  headerTintColor: '#fff',
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

export default HistoricoNav = createStackNavigator({
  Historico: HistoricoScreen,
})