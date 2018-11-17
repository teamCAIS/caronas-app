import React from "react";
import { Image, AsyncStorage, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Container, Content, Text,  View,  } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/styles';

export default class Menu extends React.Component {

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
      <Container style={{backgroundColor:colors.primary}}>
        <Content style={{ marginLeft: 16 }}>
          <View style={styles.menuHeader}>
            <Text style={{fontSize: 24,color:colors.white}}>Menu</Text>
            <Image
              style={{ height: 100, width: 100, marginTop:32, marginBottom:16, borderRadius: 50,backgroundColor:'#222'}}
              source={{
                uri: this.state.user.url_foto
              }}
            />
            <Text style={{color:colors.white}}>Bem vind{letra}, {this.state.user.nome}</Text>
            <Text style={{fontSize: 14,color:colors.white}}>{this.state.user.email}</Text>
          </View>

          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Caronas')}>
            <View style={[styles.listItem, {borderTopColor: colors.white, borderTopWidth: 1, paddingTop: 12}]}>
              <MaterialIcons style={styles.icons} name="directions-car" size={32} />
              <Text  style={[styles.item]}>
                Ver caronas
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Historico')}>
            <View style={styles.listItem}>
              <MaterialIcons style={styles.icons} name="access-time" size={32} />
              <Text style={styles.item}>Ver histórico</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Perfil')}>
          <View style={styles.listItem}>
            <MaterialIcons style={styles.icons} name="person" size={32} />
            <Text style={[styles.item]} >Seu perfil</Text>
          </View>
          </TouchableNativeFeedback>
          
          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Denuncia')}>
            <View style={[styles.listItem, {borderBottomColor: colors.gray, borderBottomWidth: 1, paddingBottom: 12}]}>
              <MaterialIcons style={styles.icons} name="report-problem" size={32} />
              <Text style={[styles.item]}>
                Fazer denúcia
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Sobre')}>
            <View style={[styles.listItem, {paddingTop: 12}]}>
              <MaterialIcons style={styles.icons} name="info" size={32} />
              <Text style={[styles.item]}>Sobre o app</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={this._deslogar} >
            <View  style={[styles.listItem]}>
              <MaterialIcons style={styles.icons} name="exit-to-app" size={32} />
              <Text style={styles.item}>
                Deslogar
              </Text>
            </View>
          </TouchableNativeFeedback>
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
    color:colors.white,
  },
  menuHeader: {
    marginTop: 32,
    marginBottom: 16,
  },
  icons: {
    margin: 0,
    marginRight: 16,
    color:colors.white,
  }
})