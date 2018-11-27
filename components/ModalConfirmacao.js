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
          <Text>{this.props.children}</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={this.props.dismiss}>
              <Text>Não</Text>
            </Button>
            <Button onPress={this.props.confirm}>
              <Text>Sim</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  modalContent: {
    height:150,
    backgroundColor:'#fff',
    padding:16,
    borderRadius: 5,
    justifyContent:'space-evenly',
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
})