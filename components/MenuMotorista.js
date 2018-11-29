import React from "react";
import { Image, AsyncStorage, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Container, Content, Text,  View,  } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/styles'
import { Subscribe } from "unstated";
import UserContainer from "../stores/UserContainer";

export default class MenuMotorista extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
  }

  render() {

    return (
      <Container style={{backgroundColor: colors.primary}}>

      <Subscribe to={[UserContainer]}>
        {container => (
          <Content style={{ marginLeft: 16 }}>
        
          <View style={styles.menuHeader}>
            <Text style={{fontSize: 24,color:colors.white}}>Menu</Text>
            <Image
              style={styles.avatar}
              source={container.state.user.url_foto ? {uri:container.state.user.url_foto} : require('../assets/perfil.png')}
            />
            <Text style={{color:colors.white}}>Bem vind{this.letraGenero(container.state.user.genero)}, {container.state.user.nome}</Text>
            <Text style={{fontSize: 14,color:colors.white}}>{container.state.user.email}</Text>
          </View>

          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Inicio')}>
            <View style={[styles.listItem, {borderTopColor: colors.white, borderTopWidth: 1, paddingTop: 12}]}>
              <MaterialIcons style={styles.icons} name="directions-car" size={32} />
              <Text  style={[styles.item]}>
                Início
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
        )}
        </Subscribe>
      </Container>
    );
  }

  _deslogar = () => {
    AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }

  letraGenero = genero => {
    if(genero == 0)
      return 'o';
    if(genero == 1)
      return 'a';
    return 'x';
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
  },
  avatar: {
    height: 100, 
    width: 100, 
    marginTop:32,
    marginBottom:16, 
    borderRadius: 50, 
    backgroundColor:'#222',
    borderWidth:2,
    borderColor:colors.secondary,
  }
})