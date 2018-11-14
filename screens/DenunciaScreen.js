import React from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { Container, Content, Form, Button, Picker, Text, Input, Item, Label, Header, Left, Body, Title, Icon, Right, List, ListItem, Thumbnail } from 'native-base';
import { postBuscaUsuario } from '../services/ApiService';

class DenunciaScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      tipo: '', 
      comentario: '',
      busca: '',
      timeId: null,
      usuariosBuscados: [], 
      usuarios: [], 
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    this.setState({token});
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Fazer denúncia',
      headerTitle: 'Fazer denúncia',
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

  let lista = null;
  if(this.state.usuariosBuscados.length)
    lista = (
      <List style={styles.listaBuscados}>
        {this.state.usuariosBuscados.map((usuario, i) => <UsuarioBuscado key={i} usuario={usuario} handleClick={this._clickBuscado} />)}
      </List>
    );

  let isDisabled = !(this.state.usuarios.length && this.state.tipo && this.state.comentario);

  return (
    <Container style={styles.container}>
      <Content>
        <Form >
          <Item picker style={styles.form}>
            <Picker
              mode="dropdown"
              style={styles.picker}
              selectedValue={this.state.tipo}
              onValueChange={(value) => this.setState({tipo: value})}
            >
              <Picker.Item label="Tipo de denúncia" value={null}/>
              <Picker.Item label="Comportamento" value="Comportamento" />
              <Picker.Item label="Direção" value="Direção" />
              <Picker.Item label="Criminal" value="Criminal" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </Item>

          

            <Item floatingLabel style={styles.form}>
              <Label>Nome do usuário</Label>
              <Input value={this.state.busca} onChangeText={text => {this._buscarUsuarios(text)}} />
              <Icon size={32} name="search" />
            </Item>
          <View>

            {lista}

          </View>

          <View style={[styles.form, styles.denunciadosSection]}>

          <Text>Usuários denunciados:</Text>
            <View style={[styles.denunciadosContainer]}>
              {this.state.usuarios.map((usuario,i) => <UsuarioDenunciado key={i} usuario={usuario}/>)}
            </View>
          </View>

          <Item floatingLabel style={styles.form}>
            <Label>Relato do ocorrido</Label>
            <Input multiline={true} value={this.state.comentario} onChangeText={text => this.setState({comentario: text})} />
          </Item>

          
          <Button
            disabled={isDisabled}
            style={[styles.form, {alignSelf: "center"}]}
            onPress={this._handleSubmit}
          >
            <Text>Enviar denúncia</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

_buscarUsuarios = (text) => {
  clearTimeout(this.state.timeId);

  if(!text)
    this.setState({usuariosBuscados: []});
  
  let timeId = setTimeout(async () => {
    if(text) {
      const buscados = await postBuscaUsuario(this.state.token, {nome: 'e'});
      this.setState({usuariosBuscados: buscados});
    }
  }, 700);

  this.setState({busca:text, timeId});

}

_clickBuscado = (usuario) => {
  this.setState((prevState) => {
    if(prevState.usuarios.length >= 4)
      return;
    if(prevState.usuarios.includes(usuario))
      return;

    return {
      usuarios: [...prevState.usuarios, usuario],
      usuariosBuscados: [],
      busca: ''
    }
    
  });
}

  _handleSubmit = async () => {

    //const payload = this.state;
    //const token = await AsyncStorage.getItem('userToken');

    //const result = await criarCorrida(token, payload);

  }

}

const UsuarioBuscado = (props) => (
  <ListItem avatar onPress={() => {
    props.handleClick(props.usuario)
  }}>
    <Left>
    <Thumbnail style={{backgroundColor: '#222'}}  source={{uri: props.usuario.foto}} />
    </Left>
    <Body>
      <Text>{props.usuario.nome}</Text>
    </Body>
  </ListItem>
);

const UsuarioDenunciado = (props) => (
  <View style={{alignItems: "center", marginRight:12}}>
      <Image
          style={ styles.foto }
          /* source={{
              uri: "https://static1.squarespace.com/static/51435924e4b02285c8b9c92d/t/558c96c3e4b03457461d0f2e/1508845725260/caiobraga-perfil.jpg"
          }} */
      />
      <Text>{props.usuario.nome}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },
  picker: {
  width: 300,
  marginBottom: 12,
  },
  foto: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#050505'
  },
  denunciadosSection: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 6,
    minHeight: 96,
  },
  denunciadosContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 6,
  },
  form: {
    marginTop: 16,
    marginLeft: 0,
  },
  listaBuscados: {
    backgroundColor:'#e9e9e9',
    position:'absolute',
    zIndex:99,
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    width:296,
    paddingBottom: 12,
  }
});

export default DenunciaNav = createStackNavigator({
  Denuncia: DenunciaScreen,
})
