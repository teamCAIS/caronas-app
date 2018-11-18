import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Content, Text,  View, Button } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default class CaronaAtualMotorista extends React.Component {

  constructor(props) {
    super(props);
  }
  //url_foto = para a foto do motorista

  render() {

    return (
      <Container style={{margin:0,backgroundColor:'#f5f5f6'}}>
        <Content>
          <View style={styles.header}>

            <View style={styles.fotoMotoristaContainer}>
                <Image
                    style={ styles.fotoMotorista }
                    source={{
                        uri: "https://static1.squarespace.com/static/51435924e4b02285c8b9c92d/t/558c96c3e4b03457461d0f2e/1508845725260/caiobraga-perfil.jpg"
                    }}
                />
                <View style={{flexDirection:"row", alignItems:"center",top:13}}>
                    <Text>{this.props.corrida.nota} </Text><MaterialIcons size={18} name="star" />
                </View>
            </View>
            
            <Text style={styles.label}>Motorista:</Text>
            <Text style={styles.listItem} >{this.props.corrida.nome}</Text>
            <Text style={styles.label}>Carro e placa:</Text>
            <Text style={[styles.listItem]} >{this.props.corrida.modelo}, {this.props.corrida.corCarro}</Text>
            <Text style={[styles.listItem, {marginTop: -4}]}>{this.props.corrida.placa}</Text>
            <Text style={styles.label}>Horário:</Text>
            <Text style={styles.listItem} >{this.props.corrida.hora}</Text>
            <Text style={styles.label}>Destino:</Text>
            <Text style={styles.listItem} >{this.props.corrida.saida}</Text>
            <Text style={styles.label}>Ponto de encontro:</Text>
            <Text style={styles.listItem} >{this.props.corrida.pontoEncontro}</Text>
          </View>

          <View style={{top:16.5,marginBottom:40}}>
            <Text style={{textAlign: "center",fontSize:14,fontWeight:'bold',marginRight:5}} >Vagas disponíveis:</Text>
            <View style={styles.vagasContainer}>
                {this._createVagas()}
            </View>
          </View>

          <View style={{flexDirection: "row", marginRight:17,marginLeft:17, justifyContent: "space-evenly"}}>
              <Button style={{borderColor:'#000',width:158,height:40,marginRight:5}} bordered onPress={() => this.props.excluiCarona()}>
                  <Text uppercase={false} style={{color:'black',width:170,marginLeft:5,height:27,fontSize:18}}>Excluir carona</Text>
              </Button>
              <Button style={{backgroundColor:'#ffca28',width:158,height:40,marginLeft:5,elevation:0}} onPress={() => this.props.concluiCarona()}>
                  <Text uppercase={false} style={{color:'black',fontWeight:'bold',width:168,height:27,fontSize:18}}>Concluir carona</Text>
              </Button>
          </View>
          <Text style={{fontSize:12, textAlign: "center", marginTop:25}}>
            Para editar alguma informação da carona 
                <Text style={{color: '#000', fontWeight: 'bold',fontSize:13}}> clique aqui</Text>
            </Text>
        </Content>
      </Container>
    );
  }

  _createVagas = () => {
      let vagas = []
      let passageiros = this.props.corrida.passageiros;
      let limite = Number(this.props.corrida.vagas) + passageiros.length;
      for(let i = 0; i < limite; i++) {
          vagas.push( <Vaga 
                    key={i}
                    nome={i < passageiros.length ? passageiros[i].nome : `Vaga Disponível`}
                    foto={i < passageiros.length ? passageiros[i].url_foto : require('../assets/perfil.png')}
                /> 
            );
      }
      return vagas;
  }
}

const Vaga = (props) => (
    <View style={{alignItems: "center"}}>
        <Image
            style={ styles.fotoPassageiro }
            source={props.foto}
        />
        <Text style={{width:65,height:30,fontSize:13,textAlign:'center',lineHeight:15}}>
            {props.nome}
        </Text>
    </View>
);

const styles = StyleSheet.create({
  listItem: {
      marginTop: -4,
	  marginBottom:-5,
  },
  item: {
  },
  header: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
	marginLeft: 18,
	marginRight:18,
	paddingBottom:16,
  },
  icons: {
    margin: 0,
    marginRight: 16
  },
  fotoMotorista: {
    height: 125,
	width: 125,
    borderRadius: 80,
  },
  fotoMotoristaContainer: {
      position: "absolute",
	  right:0,
	  top:18,
      alignItems: "center",
  },
  label: {
    marginTop: 16,
    fontSize: 12,
    fontWeight: "bold",
  },
  vagasContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 16,
	  height:95,
  },
  fotoPassageiro: {
      height: 60,
      width: 60,
      borderRadius: 30,
      backgroundColor: '#050505'
  }
})