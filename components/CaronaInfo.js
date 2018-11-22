import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Content, Text,  View, Button } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default class CaronaInfo extends React.Component {

  constructor(props) {
    super(props);
  }
  //url_foto = para a foto do motorista

  render() {

    return (
      <View style={{backgroundColor:'#f5f5f6'}}>
          <View style={styles.header}>

            <View style={styles.fotoMotoristaContainer}>
                <Image
                    style={ styles.fotoMotorista }
                    source={this.props.corrida.url_foto ? {uri: this.props.corrida.url_foto} : require('../assets/motorista.png')}
                />
                {this._showNota()}
            </View>
            
            <Text style={styles.label}>Motorista:</Text>
            <Text style={styles.listItem} >{this.props.corrida.nome}</Text>
            <Text style={styles.label}>Carro e placa:</Text>
            <Text style={[styles.listItem]} >{this.props.corrida.modelo}, {this.props.corrida.corCarro}</Text>
            <Text style={[styles.listItem, {marginTop: 2}]}>{this.props.corrida.placa}</Text>
            <Text style={styles.label}>Horário:</Text>
            <Text style={styles.listItem} >{this.props.corrida.hora}</Text>
            <Text style={styles.label}>Destino:</Text>
            <Text style={styles.listItem} >{this.props.corrida.saida}</Text>
            <Text style={styles.label}>Ponto de encontro:</Text>
            <Text style={styles.listItem} >{this.props.corrida.pontoEncontro}</Text>
          </View>

          <View style={{top:16.5,marginBottom:40,marginRight:18,marginLeft:18}}>
            <Text style={{textAlign: "center",fontSize:14,fontWeight:'bold',marginRight:3}} >Vagas:</Text>
            <View style={styles.vagasContainer}>
                {this._createVagas()}
            </View>
          </View>

        </View>
    );
  }

  _showNota = () => {
    if(this.props.corrida.nota > 0)
        return (
            <View style={{flexDirection:"row", alignItems:"center",top:13}}>
                <Text>{this.props.corrida.nota} </Text><MaterialIcons size={18} name="star" />
            </View>
        )
  }

  _createVagas = () => {
    let vagas = []
    let passageiros = this.props.corrida.passageiros;
    let limite = Number(this.props.corrida.vagas) + passageiros.length;
    for(let i = 0; i < limite; i++) {
        vagas.push( <Vaga 
                  key={i}
                  nome={i < passageiros.length ? passageiros[i].nome : `Vaga Disponível`}
                  foto={i < passageiros.length ? passageiros[i].url_foto : ''}
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
          source={props.foto ? {uri:props.foto} : require('../assets/passageiro.png')}
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
      borderBottomWidth: 1.5,
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
        justifyContent: "space-around",
        marginTop: 16,
        height:95,
    },
    fotoPassageiro: {
        height: 60,
        width: 60,
        borderRadius: 30,
    }
  })