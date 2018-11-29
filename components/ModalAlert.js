import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Content, Text,  View, Button } from "native-base";
import Modal from "react-native-modal";

export default class ModalAlert extends React.Component {

  render() {

    return (
      <Modal
        isVisible={this.props.visibility}
      >
        <View style={styles.modalContent}>
		  <Text style={styles.modalTitle}>Hey, Link</Text>
          <Text style={{marginTop:10}}>{this.props.children}</Text>
          <View style={styles.buttonContainer}>
            <Button style={{alignSelf:'center',backgroundColor:'#ffca28',width:130,height:40,elevation:0}} onPress={this.props.dismiss}>
              <Text style={{fontSize:18,textAlign:'center',width:127,height:25,color:'#000'}}>OK</Text>
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
	marginTop:20,
	justifyContent:'center',
  },
    modalTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
})