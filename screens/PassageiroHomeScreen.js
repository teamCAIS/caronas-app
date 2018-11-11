import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class PassageiroHomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Caronas',
      headerTitle: 'Caronas',
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
        <Text>Tela dos passageiros</Text>
        <Text>Imagine uma lista de caronas</Text>
        <Button
          title="Ver detalhes"
          onPress={() => this.props.navigation.navigate('Details')}
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