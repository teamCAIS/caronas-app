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
              <ListItem>
              <Left>
                <Text>Todos</Text>
              </Left>
              <Right>
                <Radio selected={true} />
              </Right>
              </ListItem>
              <ListItem>
              <Left>
                <Text>Apenas Mulheres</Text>
              </Left>
              <Right>
                <Radio selected={false} />
              </Right>
              </ListItem>
              <ListItem>
              <Left>
                <Text>Apenas Homens</Text>
              </Left>
              <Right>
                <Radio selected={false} />
              </Right>
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
  },
})