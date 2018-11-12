import React from "react";
import { Image, AsyncStorage, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text,  View,  } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
const routes = ["Caronas", "Historico", "Perfil"];

export default class MenuMotorista extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: { nome: 'não foi', email: '', genero: 2} }
  }

  async componentDidMount() {
    let user = await AsyncStorage.getItem('user');
    userObj = JSON.parse(user);
    this.setState({user: userObj});
  }

  render() {

    let letra = 'x';
    if(this.state.user.genero == 0)
      letra = 'o';
    if(this.state.user.genero == 1)
      letra = 'a';

    return (
      <Container>
        <Content style={{ marginLeft: 16 }}>
          <View style={styles.menuHeader}>
            <Text style={{fontSize: 24}}>Menu</Text>
            <Image
              style={{ height: 100, width: 100, marginTop:32, marginBottom:16, borderRadius: 50}}
              source={{
                uri: "https://static1.squarespace.com/static/51435924e4b02285c8b9c92d/t/558c96c3e4b03457461d0f2e/1508845725260/caiobraga-perfil.jpg"
              }}
            />
            <Text>Bem vind{letra}, {this.state.user.nome}</Text>
            <Text style={{fontSize: 14}}>{this.state.user.email}</Text>
          </View>

          <View style={[styles.listItem, {borderTopColor: '#aaa', borderTopWidth: 1, paddingTop: 12}]}>
            <MaterialIcons style={styles.icons} name="directions-car" size={32} />
            <Text onPress={() => this.props.navigation.navigate('Inicio')} style={[styles.item]}>
              Início
            </Text>
          </View>

          <View style={styles.listItem}>
            <MaterialIcons style={styles.icons} name="access-time" size={32} />
            <Text onPress={() => this.props.navigation.navigate('Historico')} style={styles.item}>Ver histórico</Text>
          </View>

          <View style={styles.listItem}>
            <MaterialIcons style={styles.icons} name="person" size={32} />
            <Text onPress={() => this.props.navigation.navigate('Perfil')} >Seu perfil</Text>
          </View>

          <View style={[styles.listItem, {borderBottomColor: '#aaa', borderBottomWidth: 1, paddingBottom: 12}]}>
            <MaterialIcons style={styles.icons} name="report-problem" size={32} />
            <Text onPress={() => this.props.navigation.navigate('Denuncia')} style={[styles.item]}>
              Fazer denúcia
            </Text>
          </View>

          <View style={[styles.listItem, {paddingTop: 12}]}>
            <MaterialIcons style={styles.icons} name="info" size={32} />
            <Text onPress={() => this.props.navigation.navigate('Sobre')} style={[styles.item]}>Sobre o app</Text>
          </View>

          <View  style={[styles.listItem]}>
            <MaterialIcons style={styles.icons} name="exit-to-app" size={32} />
            <Text onPress={this._deslogar} style={styles.item}>
              Deslogar
            </Text>
          </View>
        </Content>
      </Container>
    );
  }

  _deslogar = () => {
    AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 6,
  },
  item: {
  },
  menuHeader: {
    marginTop: 32,
    marginBottom: 16,
  },
  icons: {
    margin: 0,
    marginRight: 16
  }
})