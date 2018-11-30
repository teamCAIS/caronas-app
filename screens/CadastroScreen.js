import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Container, Text, Content, Button, Input, Item, Label, Picker, DatePicker} from 'native-base';
import { DocumentPicker } from 'expo';
import { preCadastrar } from '../services/ApiService';
import ModalAlert from '../components/ModalAlert';

export default class CadastroScreen extends React.Component {

  static navigationOptions = {
    title: 'Pré-cadastro',
    headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
    headerTintColor: '#fff'
  }
	constructor(props) {
		super(props);
		this.state = {
			nome:'',
			email: '',
			password: '',
			cpassword:'',
			dataNasc: new Date(),
			genero: '3',
			documentoURL:null,
			documentoNOME:null,
			documentoTIPO:null,
			concluirCadastro:false,
			senhaErrada:false,
			erroCadastro:false,
			documentoLabel:'Adicionar atestado de matrícula',
		}
		this.setDate = this.setDate.bind(this);
	}
	onValueChange(value) {
		this.setState({
		  genero: value
		});
	}

  setDate(newDate) {
		let date = newDate.toISOString();
		date = date.slice(0,10);
		this.setState({ dataNasc: date });
	}

  render() {

		let isDisabled = !(this.state.nome && this.state.email && this.state.password && this.state.documentoURL);

    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0}}>
          <View style={styles.container}>
			<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',width:328,height:55}}>   
			  <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Nome </Label>			
              <Input value={this.state.nome} onChangeText={text => this.setState({nome: text})} />
            </Item>
            <Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>   
			  <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>E-mail </Label>			
              <Input textContentType="emailAddress" keyboardType="email-address" value={this.state.email} onChangeText={text => this.setState({email: text})} />
            </Item>
            <Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
              <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Senha </Label>
              <Input textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />
            </Item>
			<Item stackedLabel style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
              <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Confirmar senha </Label>
              <Input textContentType="password" secureTextEntry={true} value={this.state.cpassword} onChangeText={text => this.setState({cpassword: text})} />
            </Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				 <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Data de aniversário    </Label>
				 <MaterialIcons name="date-range" style={{position:'absolute', left:288,color:'black'}} size={32} />
				 <DatePicker
					defaultDate={new Date(2005, 1, 30)}
					minimumDate={new Date(1950, 1, 1)}
					maximumDate={new Date(2005, 1, 1)}
					locale={"br"}
					timeZoneOffsetInMinutes={undefined}
					modalTransparent={false}
					animationType={"fade"}
					androidMode={"default"}
					placeHolderText={<MaterialIcons name="date-range" style={{color:'black'}} size={32} />}
					textStyle={{ color: "black", left:20}}
					placeHolderTextStyle={{ color: "#000", fontSize:12, left:140}}
					onDateChange={this.setDate}
					/>
			</Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				<Picker
				  note
				  mode="dropdown"
				  style={{ color:'#727272',right:15,width: 360,height:55, transform: [
					 { scaleX: 0.90 }, 
					 { scaleY: 0.90 },
				  ]}}
				  selectedValue={this.state.genero}
				  onValueChange={this.onValueChange.bind(this)}
				>
				  <Picker.Item label="Gênero" value="3" />
				  <Picker.Item label="Masculino" value="0" />
				  <Picker.Item label="Feminino" value="1" />
				  <Picker.Item label="Prefiro não especificar" value="2" />
				</Picker>
			</Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				<Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>{this.state.documentoLabel}</Label>
				<MaterialCommunityIcons size={32} style={{position:'absolute', left:290}} onPress={this._pickDocument} name="paperclip" />
			</Item>
			<Item style={{marginTop:18,marginBottom:18}}>
				<Button disabled={isDisabled} onPress={this._concluiCarona} style={this.getEstadoBotao(isDisabled)}>
					<Text uppercase={false} style={this.getEstadoTextoBotao(isDisabled)}>Concluir</Text>
				</Button>
			</Item>
		  </View>
		  <ModalAlert
            visibility={this.state.concluirCadastro}
            dismiss={() => this.setState({concluirCadastro:false})}
          >
            Seu cadastro foi recebido! Se estiver tudo certo com seu documento mandaremos um e-mail com seu código de entrada :)
          </ModalAlert>
		  <ModalAlert
            visibility={this.state.erroCadastro}
            dismiss={() => this.setState({erroCadastro:false})}
          >
            Aconteceu algum problema com seu cadastro :( Tente novamente.
          </ModalAlert>
		  <ModalAlert
            visibility={this.state.senhaErrada}
            dismiss={() => this.setState({senhaErrada:false})}
          >
            As senhas digitadas não são iguais. Verifique-as novamente :)
          </ModalAlert>
		</Content>
	  </Container>
    );
	}
	
	_concluiCarona = async () => {
		
		if(this.state.password != this.state.cpassword) {
			this.setState({
				senhaErrada:true
			});
			return;
		}

		const infos = this.state;
		const result = await preCadastrar(infos);
		if(result.status == 'success')
			this.setState({
				concluirCadastro:true
			});
		else
			this.setState({
				erroCadastro:true
			});
	}

  _pickDocument = async () => {
	  let result = await DocumentPicker.getDocumentAsync({type:"application/pdf"});
	  if (result.cancelled) {
			return;
	  }
	  this.setState({
		  documentoURL:result.uri,
		  documentoTIPO:"application/pdf"
	  });
		this.setState({
			documentoNOME:result.uri.split('/').pop(),
			documentoLabel:result.uri.split('/').pop().substring(0,30),
			});
	}
	getEstadoBotao(estado){
	  if(estado==true){
		  return {
			  alignSelf: "center",width:157.5,height:40
		  }
	  }else{
		  return {
			  alignSelf: "center",width:157.5,height:40,backgroundColor:'#ffca28',color:'#000'
		  }
	  }
  }
  getEstadoTextoBotao(estado){
	  if(estado==true){
		  return {
			  fontSize:18,textAlign:'center',width:153,height:25
		  }
	  }else{
		  return {
			  fontSize:18,textAlign:'center',width:153,height:25,color:'#000'
		  }
	  }
  }
}

const styles = StyleSheet.create({
  container: {
		flex:1,
    marginRight:16,
		marginLeft:16,
		padding:0,
		paddingTop:36,
		paddingBottom:20,
		flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
});