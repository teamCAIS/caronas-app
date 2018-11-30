import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Input, Container, Content, Item, Label, Button, Text } from 'native-base';
import { checarCodigo } from '../services/ApiService';

export default class CodigoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { codigoDigitado: '', loading:false }
  }

  static navigationOptions = {
    title: 'Código de acesso',
	  headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
    headerTintColor: '#fff',
	  headerLeft:null
  }

  render() {
    return (
	<Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:182.5}}>
          <View style={styles.container}>
			<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',width:328,height:55}}>   
			  <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Código de acesso </Label>			
              <Input value={this.state.codigoDigitado} onChangeText={text => this.setState({codigoDigitado: text})}/>
            </Item>
			<Item style={{marginTop:27.5}}>
				<Button onPress={this._enviaCodigo} style={{backgroundColor:'#ffca28',width:157.5,height:40}}>
					<Text uppercase={false} style={{color:'black',fontSize:18,textAlign:'center',width:153,height:27,elevation:0}}>Confirmar</Text>
				</Button>
			</Item>
		  </View>
		</Content>
	</Container>
   );
  }

  _enviaCodigo = async () => {
    this.setState({loading:true});
    const token = await AsyncStorage.getItem('userToken');
    const payload = {codigo_validacao: this.state.codigoDigitado}
    const result = await checarCodigo(token, payload);

    if(result == "success") {
      this.props.navigation.navigate('CadastroFinal', { codigoValidacao: this.state.codigoDigitado });
      return
    }
    else {
      this.setState({loading:false});
      alert(result);
    }
      
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight:17,
    marginLeft:17,
    padding:0,
    flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
});