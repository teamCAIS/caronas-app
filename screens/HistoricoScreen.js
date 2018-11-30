import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableHighlight,TouchableNativeFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Card, CardItem, Body, Text, Right, Button, Spinner } from 'native-base';
import CardCarona from '../components/CardCarona';
import { getHistoricoMotorista, getHistoricoPassageiro } from '../services/ApiService'
import { createStackNavigator } from 'react-navigation';
import CaronaDetailsScreen from '../screens/CaronaDetailsScreen';
import { Subscribe } from 'unstated';
import UserContainer from '../stores/UserContainer';

class HistoricoView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {lista: [], token:'', loading: true, mensagem:''};
  }

  async componentDidMount() {
    
    const token = await AsyncStorage.getItem('userToken');

    const tipo = this.props.userContainer.state.user.tipo;
    let res;
    if(tipo == 1) {
      res = await getHistoricoPassageiro(token);
    }
    if(tipo == 2)
      res = await getHistoricoMotorista(token);

    if(res.status == 'error') {
      this.setState({mensagem:res.message, loading:false, token});
      return
    }
    if(res != 'Falha na conexão') {
      this.setState({token, lista: res, loading:false});
      return;
    }
    
    this.setState({token, loading:false});
    alert('Houve um problema com a conexão');
    
      
  }

  render() {

    if(this.state.loading)
      return (
        <Spinner color='#ffca28'/>
      );


    if(this.state.mensagem)
      return (
        <Content style={{paddingRight:8,paddingLeft:8,marginTop:18,marginBottom:18}}>
            <Text>{this.state.mensagem}</Text>
        </Content>
      );

    let dias = [];

    return (
      <Content style={{paddingRight:8,paddingLeft:8}}>
	  <View style={{paddingBottom:24}}>
        {this.state.lista.map((corrida, i) => {

          let dataText = null;
          const data = this._convertData(corrida.data);
          if(!dias.includes(data)) {
            dias.push(data);
            dataText = (<Text style={{textAlign:'center',top:18}}>Dia {data}</Text>);
          }
          
          return (
            <View key={i} >
              {dataText}
              <TouchableHighlight 
                underlayColor='#eee9' 
                onPress={() => this.props.navigation.navigate('Details', {corrida, historico:true})}
              >
                <CardCarona 
                  corrida={corrida}
                />
              </TouchableHighlight>
            </View>
          )})}
		  </View>
      </Content>
    );
  }

  _convertData = (data) => {
    let arrayData = data.split('-');
    arrayData.reverse();
    let string = arrayData.join('/');
    return string;
  }
}


class HistoricoScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Histórico',
      headerTitle: 'Histórico',
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
      headerTintColor: '#fff'
    }
  }

  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {userContainer => 
          (<HistoricoView 
            userContainer={userContainer} 
            navigation={this.props.navigation}
          />)}
      </Subscribe>
    );
  }


}


const styles = StyleSheet.create({
  
});

export default HistoricoNav = createStackNavigator({
  Historico: HistoricoScreen,
  Details: CaronaDetailsScreen,
})