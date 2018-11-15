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
      <View>
          <View style={styles.header}>

            <View style={styles.fotoMotoristaContainer}>
                <Image
                    style={ styles.fotoMotorista }
                    source={{
                        uri: "https://static1.squarespace.com/static/51435924e4b02285c8b9c92d/t/558c96c3e4b03457461d0f2e/1508845725260/caiobraga-perfil.jpg"
                    }}
                />
                <Text style={styles.label} >Nota do motorista</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Text>{this.props.corrida.nota} </Text><MaterialIcons size={32} name="star" />
                </View>
            </View>
            
            <Text style={styles.label}>Motorista:</Text>
            <Text style={styles.listItem} >{this.props.corrida.nome}</Text>
            <Text style={styles.label}>Carro e placa:</Text>
            <Text style={[styles.listItem]} >{this.props.corrida.modelo}, {this.props.corrida.corCarro}</Text>
            <Text style={[styles.listItem, {marginTop: -8}]}>{this.props.corrida.placa}</Text>
            <Text style={styles.label}>Horário:</Text>
            <Text style={styles.listItem} >{this.props.corrida.hora}</Text>
            <Text style={styles.label}>Destino:</Text>
            <Text style={styles.listItem} >{this.props.corrida.saida}</Text>
            <Text style={styles.label}>Ponto de encontro:</Text>
            <Text style={styles.listItem} >{this.props.corrida.pontoEncontro}</Text>
          </View>

          <View >
            <Text style={{textAlign: "center"}} >Vagas disponíveis:</Text>
            <View style={styles.vagasContainer}>
                {this._createVagas()}
            </View>
          </View>

        </View>
    );
  }

  _createVagas = () => {
      let vagas = []
      for(let i = 0; i < this.props.corrida.vagas; i++) {
          vagas.push( <Vaga key={i} passageiros={this.props.corrida.passageiros} /> );
      }
      return vagas;
  }
}

const Vaga = (props) => (
    <View style={{alignItems: "center", marginRight:6}}>
        <Image
            style={ styles.fotoPassageiro }
            /* source={{
                uri: "https://static1.squarespace.com/static/51435924e4b02285c8b9c92d/t/558c96c3e4b03457461d0f2e/1508845725260/caiobraga-perfil.jpg"
            }} */
        />
        <Text>Vaga</Text>
        <Text>Disponível</Text>
    </View>
);

const styles = StyleSheet.create({
  listItem: {
      marginTop: -4,
  },
  item: {
  },
  header: {
    marginBottom: 8,
    borderBottomColor: '#aaa',
    borderBottomWidth: 2,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  icons: {
    margin: 0,
    marginRight: 16
  },
  fotoMotorista: {
    height: 100, 
    width: 100, 
    marginTop:16,
    borderRadius: 50,
  },
  fotoMotoristaContainer: {
      position: "absolute",
      right: 16,
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
      marginTop: 6,
  },
  fotoPassageiro: {
      height: 60,
      width: 60,
      borderRadius: 30,
      backgroundColor: '#050505'
  }
})