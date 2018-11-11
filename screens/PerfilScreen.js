import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import EditarPerfilScreen from './EditarPerfilScreen';

class PerfilScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Seu perfil',
      headerTitle: 'Perfil',
      drawerLabel: 'Seu perfil',
      headerLeft: (
        <MaterialIcons
          style={{marginLeft: 12}}
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
        <Text>Tela de perfil</Text>
        <Button
          title="Editar perfil"
          onPress={() => {this.props.navigation.navigate('Editar')}}
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

export default createStackNavigator(
    {
        Perfil: PerfilScreen,
        Editar: EditarPerfilScreen,
    },
    {
        initialRouteName: 'Perfil',
    }
)