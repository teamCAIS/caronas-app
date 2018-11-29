import React from 'react';
import { StyleSheet, View, Image, TouchableNativeFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Text,Item,Card, CardItem } from 'native-base';
import { createStackNavigator } from 'react-navigation';

class SobreScreen extends React.Component {

   static navigationOptions = ({ navigation }) => {
    return {
      title: 'Sobre',
      headerTitle: 'Sobre',
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
    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content style={{margin:0,marginTop:18}}>
          <View style={styles.container}>
			<Card>
            <CardItem>
				<View style={{flexDirection:'row',width:300}}>
					<Image
                    style={ styles.logo }
                    source={require('../assets/logo.png')}
					/>
					<View style={{flexDirection:'column',marginLeft:10,marginTop:20}}>
					<Text style={{color:'black',fontWeight:'bold',fontSize:24}}>SMDcarpool</Text>
					<Text style={{color:'black',marginTop:5}}>v 1.0</Text>
					</View>
                </View>
            </CardItem>
          </Card>
			<View style={{width:325,marginTop:12,marginBottom:12,borderColor:'transparent'}}>
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
			</View>
			<Card>
            <CardItem>
				<View style={{flexDirection:'row',width:300}}>
					<Image
					style={ styles.logo }
					source={require('../assets/logo-cais.png')}
					/>
					<View style={{flexDirection:'column',marginLeft:20,marginTop:10}}>
						<Text style={{fontSize:15}}>Caio Nunes</Text>
						<Text style={{fontSize:15}}>Lucas Lopes</Text>
						<Text style={{fontSize:15}}>Samuel Martins</Text>
						<Text style={{fontSize:15}}>Ulisses Lopes</Text>
					</View>
                </View>
            </CardItem>
          </Card>
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
	width:105,
	height:105,
	
  },
});

export default SobreNav = createStackNavigator({
  Sobre: SobreScreen,
})