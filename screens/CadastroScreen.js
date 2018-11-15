import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Text, Content, Button, Input, Item, Label, Icon, DatePicker, Picker} from 'native-base';
export default class CadastroScreen extends React.Component {

  static navigationOptions = {
    title: 'Pré-cadastro',
    headerStyle: {backgroundColor: '#263238', height:57.5},
    headerTintColor: '#fff'
  }
	constructor(props) {
		super(props);
		this.state = {nome:'',email: '',password: '',cpassword:'',dataNasc: new Date(),genero: '3',doc:''}
		this.setDate = this.setDate.bind(this);
	}
	setDate(newDate) {
		this.setState({ dataNasc: newDate });
	}
	onValueChange(value: string) {
		this.setState({
		  genero: value
		});
	  }
  render() {
    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
          <View style={styles.container}>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',width:328,height:55}}>   
			  <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Nome </Label>			
              <Input value={this.state.nome} onChangeText={text => this.setState({nome: text})} />
            </Item>
            <Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>   
			  <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>E-mail </Label>			
              <Input textContentType="emailAddress" keyboardType="email-address" value={this.state.email} onChangeText={text => this.setState({email: text})} />
            </Item>
            <Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
              <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Senha </Label>
              <Input textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />
            </Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
              <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Confirmar Senha </Label>
              <Input textContentType="password" secureTextEntry={true} value={this.state.cpassword} onChangeText={text => this.setState({cpassword: text})} />
            </Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:328,height:55}}>
				 <Label style={{position:'relative',left:10,fontSize:14,color:'#727272'}}>Data de Nascimento </Label>
				 <DatePicker
					defaultDate={new Date(2002, 12, 31)}
					minimumDate={new Date(1950, 1, 1)}
					maximumDate={new Date(2002, 12, 31)}
					locale={"br"}
					timeZoneOffsetInMinutes={undefined}
					modalTransparent={false}
					animationType={"fade"}
					androidMode={"default"}
					placeHolderText={this.state.dataNasc.toString().substr(4, 12)}
					textStyle={{ color: "black" }}
					placeHolderTextStyle={{ color:'black'}}
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
				  selectedValue={this.state.selected}
				  onValueChange={this.onValueChange.bind(this)}
				>
				  <Picker.Item label="Gênero" value="3" />
				  <Picker.Item label="Masculino" value="0" />
				  <Picker.Item label="Feminino" value="1" />
				  <Picker.Item label="Prefiro não especificar" value="2" />
				</Picker>
			</Item>
			<Item style={{borderColor:'#727272',marginTop:18}}>
				<Button iconRight style={{backgroundColor:'#ffca28',width:328,height:57.5}}>
					<Text style={{color:'black'}}>Adicionar atestado de matrícula</Text>
					<Icon name='wine' />
				</Button>
			</Item>
			<Item style={{marginTop:18,marginBottom:18}}>
				<Button style={{backgroundColor:'#ffca28',width:157.5,height:40}}>
					<Text uppercase={false} style={{color:'black',fontSize:18,textAlign:'center',width:150,height:25}}>Avançar</Text>
				</Button>
			</Item>
		  </View>
		</Content>
	  </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight:16,
	marginLeft:16,
	padding:0,
	flexDirection: 'column',
    backgroundColor: '#f5f5f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
});