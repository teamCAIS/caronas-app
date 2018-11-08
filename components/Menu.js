import React from "react";
import { Image, AsyncStorage } from "react-native";
import { Container, Content, Text, List, ListItem, View, Button } from "native-base";
const routes = ["Caronas", "Historico", "Perfil"];

export default class Menu extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={{ margin: 32 }}>
            <Image
              style={{ height: 80, width: 70}}
              source={{
                uri: "https://cdn.icon-icons.com/icons2/67/PNG/512/user_13230.png"
              }}
            />
            <Text>Olá, seu arrombado</Text>
          </View>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
          <Button onPress={this._deslogar}>
            <Text>Deslogar</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _deslogar = () => {
    AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
}
