import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Content, Text,  View, Button } from "native-base";
import Modal from "react-native-modal";

export default class ModalConfirmacao extends React.Component {

  render() {

    return (
      <Modal
        isVisible={this.props.visibility}
      >
        <View style={styles.modalContent}>
		  <Text style={{fontWeight: "bold",fontSize: 20}}>Hey, calma aí!</Text>
          <Text style={{marginTop:10}}>{this.props.children}</Text>
          <View style={styles.buttonContainer}>
            <Button style={{borderColor:'#000', marginRight:5,width:120}} bordered onPress={this.props.dismiss}>
              <Text uppercase={false} style={{fontSize:18,textAlign:'center',width:117,height:25,color:'#000'}}>Não</Text>
            </Button>
            <Button style={{alignSelf:'center',backgroundColor:'#ffca28',elevation:0,marginLeft:5,width:120}} onPress={this.props.confirm}>
              <Text uppercase={false} style={{fontSize:18,textAlign:'center',width:117,height:25,color:'#000'}}>Sim</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor:'#f5f5f6',
    padding:16,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row", 
	marginRight:18,
	marginLeft:18, 
	marginTop:20,
	justifyContent: "space-around"
  },
})