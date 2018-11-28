import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { Container, Content, Form, Button, Picker, Text, Input, Item, Label, Left, Body, Icon, List, ListItem, Thumbnail, Spinner } from 'native-base';
import { postBuscaUsuario, denuncia } from '../services/ApiService';

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
      usuariosIds: [],
      height:55,
      loading: false,
      clickedUsuario: false,
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
        <TouchableNativeFeedback onPress={() => navigation.openDrawer()}>
          <View style={{padding:12}}>
            <MaterialIcons
              name="menu"
              size={32}
              color="#fff"
            />
          </View>
        </TouchableNativeFeedback>
      ),
	  headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
	  headerTintColor: '#fff',
    }
  }

  render() {

    if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );

    let lista = null;
    if(this.state.usuariosBuscados.length)
      lista = (
        <List style={styles.listaBuscados}>
          {this.state.usuariosBuscados.map((usuario, i) => <UsuarioBuscado key={i} usuario={usuario} handleClick={this._clickBuscado} />)}
        </List>
      );

    let isDisabled = !(this.state.usuarios.length && this.state.tipo && this.state.comentario);

    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
          <View style={styles.container}>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',width:328,height:55}}>
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

            

            <Item style={{borderColor:'#727272',backgroundColor:'#fff',width:328,height:55,marginTop:16}}>
              <Label style={{position:'relative',left:18,fontSize:14,color:'#000'}}>Nome do usuário      </Label>
              <Input value={this.state.busca} onChangeText={text => {this._buscarUsuarios(text)}} />
              <Icon size={14} style={{marginRight:6,color:'#727272',transform:[{ scaleX: 0.65 },{ scaleY: 0.65 }],}} name="search" />
            </Item>
            <View>

              {lista}

            </View>

            <View style={[styles.denunciadosSection]}>

            <Text style={{position:'relative',left:62,fontSize:14,color:'#000'}}>Usuários a serem denunciados</Text>
              <View style={[styles.denunciadosContainer]}>
                {this.state.usuarios.map((usuario,i) => <UsuarioDenunciado 
                  handleClick={() => this._removeDenunciado(usuario)} 
                  key={i} 
                  usuario={usuario}
                />)}
              </View>
            </View>

            <Item floatingLabel style={{borderColor:'#727272',backgroundColor:'#fff',width:328,height:55,marginTop:16,height: Math.max(55, this.state.height)}}>
              <Label style={{position:'relative',left:18,top:10,fontSize:14,color:'#000'}}>Relato do ocorrido      </Label>
              <Input onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height })
			}} style={{height: Math.max(55, this.state.height),paddingTop:10,paddingBottom:10}} multiline={true} value={this.state.comentario} onChangeText={text => this.setState({comentario: text})} />
            </Item>

            
            <Button
              disabled={isDisabled}
			        style={this.getEstadoBotao(isDisabled)}
              onPress={this._handleSubmit}
            >
              <Text uppercase={false} style={this.getEstadoLabelBotao(isDisabled)}>Enviar denúncia</Text>
            </Button>
          </View>
        </Content>
    </Container>
  );
}
getEstadoBotao(estado){
	if(estado==true){
		return {alignSelf: "center",marginTop:16,width:158,height:40,elevation:0}
	}else{
		return {alignSelf: "center",marginTop:16,backgroundColor:'#ffca28',width:158,height:40,elevation:0}
	}
}
getEstadoLabelBotao(estado){
	if(estado==true){
		  return {
			  fontSize:16,textAlign:'center',width:157,height:25
		  }
	  }else{
		  return {
			  fontSize:16,textAlign:'center',width:157,height:25,color:'#000'
		  }
	  }
}

_removeDenunciado = (usuario) => {
  let usuarios = this.state.usuarios;
  let usuariosIds = this.state.usuariosIds;
  usuarios = usuarios.filter((atual) => atual.id != usuario.id);
  usuariosIds = usuariosIds.filter((atual) => atual != usuario.id);
  this.setState({usuarios, usuariosIds});
}

_buscarUsuarios = (text) => {
  clearTimeout(this.state.timeId);
  this.setState({clickedUsuario: false});

  if(!text.length) {
    this.setState({busca: text,usuariosBuscados: []});
    return;
  }

  let timeId = setTimeout(async () => {
    if(text) {
      const buscados = await postBuscaUsuario(this.state.token, {nome: text});
      if(buscados === undefined || this.state.clickedUsuario)
        return;
      this.setState({usuariosBuscados: buscados});
    }
  }, 300);

  this.setState({busca:text, timeId});

}

_clickBuscado = (usuario) => {
  clearTimeout(this.state.timeId);
  this.setState((prevState) => {
    if(prevState.usuarios.length >= 4)
      return;
    
    if(prevState.usuariosIds.includes(usuario.id))
      return {
        usuariosBuscados: [],
        busca: '',
    };

    return {
      usuarios: [...prevState.usuarios, usuario],
      usuariosIds: [...prevState.usuariosIds, usuario.id],
      usuariosBuscados: [],
      busca: '',
      clickedUsuario: true,
    }
    
  });
}

  _handleSubmit = async () => {
    this.setState({loading:true});

    const payload = {
      comentario: this.state.comentario,
      tipo: this.state.tipo,
      id_denunciado: this.state.usuariosIds
    }

    const result = await denuncia(this.state.token, payload);
    if(result == 'success') {
      alert("Sua denúncia foi encaminhada para análise");
      this.setState({tipo:'',usuarios:[],comentario:'',loading:false, usuariosIds:[]});
    }
    else {
      this.setState({loading:false});
      alert(result);
    }
      

  }

}

const UsuarioBuscado = (props) => (
  <ListItem avatar onPress={() => {props.handleClick(props.usuario)}}>
    <Left>
    <Thumbnail
      source={props.usuario.url_foto ? {uri: props.usuario.url_foto} : require('../assets/passageiro.png')}
    />
    </Left>
    <Body>
      <Text>{props.usuario.nome}</Text>
    </Body>
  </ListItem>
);

const UsuarioDenunciado = (props) => (
  <TouchableHighlight onPress={() => props.handleClick()} underlayColor='#eee9' >
  <View style={{alignItems: "center", marginRight:6,marginLeft:6, marginTop:12}}>
      <Image
          style={ styles.foto }
          source={props.usuario.url_foto ? {uri: props.usuario.url_foto} : require('../assets/passageiro.png')}
      />
      <Text style={{width:65,height:30,fontSize:13,textAlign:'center',lineHeight:15}}>{props.usuario.nome}</Text>
      <MaterialIcons name='close' size={24} style={{position:'absolute', right:-12, top: -12}} />
  </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
	flex:1,
    marginRight:17,
	marginLeft:17,
	padding:0,
	flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  picker: {
	marginBottom: 16,
	right:12,
	top:8,
	width: 360,
	height:55, 
	transform: [{ scaleX: 0.87 },{ scaleY: 0.87 }],
  },
  foto: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  denunciadosSection: {
    borderColor: 'transparent',
	backgroundColor:'#fff',
	width:328,
    padding: 6,
	marginTop:16,
    minHeight: 120,
  },
  denunciadosContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 6,
  },
  listaBuscados: {
    backgroundColor:'#fff',
    position:'absolute',
    zIndex:99,
	right:-135,
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
	borderColor:'#727272',
    width:296,
    paddingBottom: 12,
  }
});

export default DenunciaNav = createStackNavigator({
  Denuncia: DenunciaScreen,
})
