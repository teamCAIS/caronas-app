import React from "react";
import { Image, AsyncStorage, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Container, Content, Text,  View, ListItem,Radio, Item, Picker, Button  } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/styles';

export default class Filtro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {saida:null}
  }

  async componentDidMount() {
    /*let user = await AsyncStorage.getItem('user');
    userObj = JSON.parse(user);
    this.setState({user: userObj});*/
  }

  render() {
    return (
      <Container style={{backgroundColor:colors.primary}}>
        <Content style={{ marginLeft: 18 }}>
			<Text style={{fontSize:20,color:'white',fontWeight:'bold',marginTop:21}}>Filtros</Text>
            <View style={{marginTop:35,right:16}}>
			  <ListItem style={styles.listItem}>
              <Text style={[styles.labels,{position:'relative',right:10}]}>Gênero do(a) motorista</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
              <Radio color='white' selectedColor='white' selected={true} />
              <Text style={styles.labels}>Todos</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
              <Radio color='white' selectedColor='white' selected={false} />
              <Text style={styles.labels}>Apenas masculino</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
              <Radio color='white' selectedColor='white' selected={false} />
              <Text style={styles.labels}>Apenas feminino</Text>
              </ListItem>
            </View>
			<Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>Filtrar por</Text>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',width:228,height:55,marginTop:18}}>
				<Picker
				  placeholder="Destino"
				  mode="dropdown"
				  style={styles.picker}
				  selectedValue={this.state.saida}
				  onValueChange={(value) => this.setState({saida: value})}
				>
				  <Picker.Item enabled={false} label="Destino" value={null}/>
				  <Picker.Item label="Humberto Monte" value="Humberto Monte" />
				  <Picker.Item label="Educação Física" value="Educação Física" />
				  <Picker.Item label="Mister Hull" value="Mister Hull" />
				</Picker>
			</Item>
			<Item style={{borderColor:'#727272',backgroundColor:'#fff',marginTop:18,width:228,height:55,marginTop:18}}>
				<Picker
				  mode="dropdown"
				  style={styles.picker}
				  selectedValue={this.state.horario}
				  onValueChange={(value) => this.setState({horario: value})}
				>
				  <Picker.Item enabled={false} label="Horário de saída" value={null}/>
				  <Picker.Item label="18:30" value="18:30:00" />
				  <Picker.Item label="19:00" value="19:00:00" />
				  <Picker.Item label="19:30" value="19:30:00" />
				  <Picker.Item label="20:00" value="20:00:00" />
				  <Picker.Item label="20:30" value="20:30:00" />
				  <Picker.Item label="21:00" value="21:00:00" />
				  <Picker.Item label="21:30" value="21:30:00" />
				  <Picker.Item label="22:00" value="22:00:00" />
				  <Picker.Item label="22:30" value="22:30:00" />
				</Picker>
			</Item>
			<View style={{flexDirection: "column", justifyContent: "center",marginTop:25,left:35}}>
              <Button style={{borderColor:'#fff',width:158,height:40}} bordered onPress={() => {}}>
                  <Text uppercase={false} style={{color:'white',width:170,height:27,fontSize:18}}>Remover filtros</Text>
              </Button>
              <Button style={{backgroundColor:'#ffca28',width:158,height:40,elevation:0,marginTop:12.5}} onPress={() => {}}>
                  <Text uppercase={false} style={{color:'black',fontWeight:'bold',width:168,left:7,height:27,fontSize:18}}>Aplicar filtros</Text>
              </Button>
          </View>
        </Content>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
	borderColor:'transparent',
	marginTop:-20,
  },
  labels:{
	  color:'white',
	  fontSize:16,
	  marginLeft:10,
	  fontWeight:'bold'
  },
  item: {
    color:colors.white,
  },
  picker: {
    marginBottom: 16,
	right:12,
	top:8,
	width: 260,
	height:55, 
	transform: [{ scaleX: 0.87 },{ scaleY: 0.87 }],
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
  },
})