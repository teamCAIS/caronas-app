import React from 'react';
import { StyleSheet, View,Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Text,Item } from 'native-base';
import { createStackNavigator } from 'react-navigation';

class SobreScreen extends React.Component {

   static navigationOptions = ({ navigation }) => {
    return {
      title: 'Sobre',
      headerTitle: 'Sobre',
      headerLeft: (
        <MaterialIcons
          style={{marginLeft: 12}}
          name="menu"
          size={32}
          onPress={() => navigation.openDrawer()}
          color="#fff"
        />
      ),
	  headerStyle: {backgroundColor: '#263238', height:47.5,paddingBottom:20},
	  headerTintColor: '#fff',
    }
  }

  render() {
    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
          <View style={styles.container}>
			<Item style={{borderColor:'transparent'}}>
				<Image
                    style={ styles.logo }
                    source={require('../assets/logo.png')}
                />
			</Item>
			<View style={{width:325,marginTop:18,borderColor:'transparent'}}>
				<Text style={{fontWeight:'bold',fontSize:12}}>Sobre a aplicação:</Text>
				<Text style={{fontSize:15}}>A aplicação <Text style={{fontSize:15,fontWeight:'bold'}}>SMD Carpool</Text> foi desenvolvida por</Text>
				<Text style={{fontSize:15}}>alunos do curso <Text style={{fontSize:15,fontWeight:'bold'}}>Sistemas e Mídias Digitais</Text> com</Text>
				<Text style={{fontSize:15}}>o propósito de intermediar o contato entre</Text>
				<Text style={{fontSize:15}}>pessoas da comunidade do curso que podem</Text>
				<Text style={{fontSize:15}}>oferecer caronas para pessoas que não dispõem</Text>
				<Text style={{fontSize:15}}>de veículo próprio.</Text>
				<Text style={{fontSize:15}}>A proposta do recurso veio de uma parceria com</Text>
				<Text style={{fontSize:15}}>a professora <Text style={{fontSize:15,fontWeight:'bold'}}>Mara Bonates</Text> que se viu</Text>
				<Text style={{fontSize:15}}>preocupada com a segurança e o bem-estar dos</Text>
				<Text style={{fontSize:15}}>alunos do turno da noite.</Text>
				<Text style={{fontSize:15}}>{'\n'}</Text>
				<Text style={{fontWeight:'bold',fontSize:12}}>Desenvolvido por:</Text>
				<Text style={{fontSize:15}}>Caio Nunes</Text>
				<Text style={{fontSize:15}}>Lucas Lopes</Text>
				<Text style={{fontSize:15}}>Samuel Martins</Text>
				<Text style={{fontSize:15}}>Ulisses Lopes</Text>
			</View>
			<Item>
			</Item>
		  </View>
		</Content>
	  </Container>
    );
  }
}

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
  logo: {
	width:122.5,
	height:122.5,
	
  },
});

export default SobreNav = createStackNavigator({
  Sobre: SobreScreen,
})