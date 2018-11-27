import React from "react";
import { Image, AsyncStorage, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Container, Content, Text,  View, ListItem,Left,Right,Radio  } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/styles';

export default class Filtro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { }
  }

  async componentDidMount() {
    /*let user = await AsyncStorage.getItem('user');
    userObj = JSON.parse(user);
    this.setState({user: userObj});*/
  }

  render() {
    return (
      <Container style={{backgroundColor:colors.primary}}>
        <Content style={{ marginLeft: 16 }}>
            <View >
              <ListItem style={styles.listItem}>
              <Left>
                <Radio selected={true} />
              </Left>
              <Text style={styles.labels}>Todos</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
              <Left>
                <Radio selected={false} />
              </Left>
              <Text style={styles.labels}>Apenas Mulheres</Text>
              </ListItem>
              <ListItem style={styles.listItem}>
              <Left>
                <Radio selected={false} />
              </Left>
              <Text style={styles.labels}>Apenas Homens</Text>
              </ListItem>
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
  },
  labels:{
	  color:'white',
	  fontSize:14,
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
  },
})